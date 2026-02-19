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

    private string? GetUserIdFromToken()
    {
        var authHeader = Request.Headers["Authorization"].FirstOrDefault();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            return null;
        }

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
        catch
        {
            return null;
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        try
        {
            var userId = GetUserIdFromToken();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var client = await _supabaseService.GetClientAsync();
            // var client = client.Auth.CurrentUser;
            var profile = await client
                .From<Profile>()
                .Where(p => p.Id == Guid.Parse(userId))
                .Single();

            if (profile == null)
                return NotFound();

            var socials = await client
                .From<Social>()
                .Where(s => s.ProfileId == Guid.Parse(userId))
                .Get();

            return Ok(new { profile = socials.Models });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching profile");
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileUpdateRequest request)
    {
        try
        {
            var userId = GetUserIdFromToken();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var client = await _supabaseService.GetClientAsync();

            var profile = new Profile
            {
                Id = Guid.Parse(userId),
                FirstName = request.FirstName,
                LastName = request.LastName,
                StageName = request.StageName,
            };

            await client.From<Profile>().Update(profile);

            return Ok(new { message = "Profile updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating profile");
            return BadRequest(new { message = ex.Message });
        }
    }

    // [HttpPost("socials")]
    // public async Task<IActionResult> AddSocial([FromBody] SocialRequest request)
    // {
    //     try
    //     {
    //         var userId = GetUserIdFromToken();
    //         if (string.IsNullOrEmpty(userId))
    //             return Unauthorized();

    //         var client = await _supabaseService.GetClientAsync();

    //         var social = new Social
    //         {
    //             ProfileId = Guid.Parse(userId),
    //             Platform = request.Platform,
    //             Url = request.Url,
    //         };

    //         var result = await client.From<Social>().Insert(social);
    //         return Ok(result.Models.FirstOrDefault());
    //     }
    //     catch (Exception ex)
    //     {
    //         _logger.LogError(ex, "Error adding social");
    //         return BadRequest(new { message = ex.Message });
    //     }
    // }

    // [HttpDelete("socials/{id}")]
    // public async Task<IActionResult> DeleteSocial(Guid id)
    // {
    //     try
    //     {
    //         var userId = GetUserIdFromToken();
    //         if (string.IsNullOrEmpty(userId))
    //             return Unauthorized();

    //         var client = await _supabaseService.GetClientAsync();
    //         await client
    //             .From<Social>()
    //             .Where(s => s.Id == id && s.ProfileId == Guid.Parse(userId))
    //             .Delete();

    //         return Ok(new { message = "Social deleted successfully" });
    //     }
    //     catch (Exception ex)
    //     {
    //         _logger.LogError(ex, "Error deleting social");
    //         return BadRequest(new { message = ex.Message });
    //     }
    // }
}
