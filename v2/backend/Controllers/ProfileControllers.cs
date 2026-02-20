// Controllers/ProfileController.cs
using backend.Models;
using backend.Models.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly ISupabaseService _supabaseService;
    private readonly ILogger<ProfileController> _logger;

    public ProfileController(ISupabaseService supabaseService, ILogger<ProfileController> logger)
    {
        _supabaseService = supabaseService;
        _logger = logger;
    }

    // Helper method to extract user ID from JWT token
    private string? GetUserIdFromToken()
    {
        var authHeader = Request.Headers["Authorization"].FirstOrDefault();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            return null;

        var token = authHeader.Substring("Bearer ".Length).Trim();

        try
        {
            var parts = token.Split('.');
            if (parts.Length != 3)
                return null;

            var payload = parts[1];
            var paddedPayload = payload.PadRight(
                payload.Length + (4 - payload.Length % 4) % 4,
                '='
            );
            var payloadBytes = Convert.FromBase64String(paddedPayload);
            var payloadJson = System.Text.Encoding.UTF8.GetString(payloadBytes);

            var json = System.Text.Json.JsonDocument.Parse(payloadJson);
            return json.RootElement.GetProperty("sub").GetString();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error parsing JWT token");
            return null;
        }
    }

    /// <summary>
    /// Get the current user's profile
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        try
        {
            var userId = GetUserIdFromToken();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Invalid or missing token" });

            var client = await _supabaseService.GetClientAsync();

            var profile = await client
                .From<Profile>()
                .Where(p => p.Id == Guid.Parse(userId))
                .Single();

            if (profile == null)
                return NotFound(new { message = "Profile not found" });

            return Ok(
                new
                {
                    profile = new
                    {
                        id = profile.Id,
                        first_name = profile.FirstName,
                        last_name = profile.LastName,
                        stage_name = profile.StageName,
                        email = profile.Email,
                        display_name = profile.StageName
                            ?? $"{profile.FirstName} {profile.LastName}".Trim()
                            ?? "User",
                        created_at = profile.CreatedAt,
                        updated_at = profile.UpdatedAt,
                    },
                }
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching profile for user");
            return StatusCode(500, new { message = "An error occurred while fetching profile" });
        }
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetProfileById(Guid userId)
    {
        try
        {
            var client = await _supabaseService.GetClientAsync();

            var profile = await client.From<Profile>().Where(p => p.Id == userId).Single();

            if (profile == null)
                return NotFound(new { message = "Profile not found" });

            // Return only public information
            return Ok(
                new
                {
                    profile = new
                    {
                        id = profile.Id,
                        first_name = profile.FirstName,
                        last_name = profile.LastName,
                        stage_name = profile.StageName,
                        display_name = profile.StageName
                            ?? $"{profile.FirstName} {profile.LastName}".Trim()
                            ?? "User",
                    },
                }
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching profile by ID: {UserId}", userId);
            return StatusCode(500, new { message = "An error occurred while fetching profile" });
        }
    }

    /// <summary>
    /// Update the current user's profile
    /// </summary>
    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileUpdateRequest request)
    {
        try
        {
            var userId = GetUserIdFromToken();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Invalid or missing token" });

            var client = await _supabaseService.GetClientAsync();

            // First, fetch the existing profile to get the email
            var existingProfile = await client
                .From<Profile>()
                .Where(p => p.Id == Guid.Parse(userId))
                .Single();

            if (existingProfile == null)
                return NotFound(new { message = "Profile not found" });

            var profile = new Profile
            {
                Id = Guid.Parse(userId),
                FirstName = request.FirstName,
                LastName = request.LastName,
                StageName = request.StageName,
                Email = existingProfile.Email, // Preserve email
            };

            await client.From<Profile>().Update(profile);

            _logger.LogInformation("Profile updated successfully for user: {UserId}", userId);

            return Ok(
                new
                {
                    message = "Profile updated successfully",
                    profile = new
                    {
                        id = profile.Id,
                        first_name = profile.FirstName,
                        last_name = profile.LastName,
                        stage_name = profile.StageName,
                        email = profile.Email,
                    },
                }
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating profile");
            return BadRequest(new { message = "Failed to update profile", error = ex.Message });
        }
    }
}
