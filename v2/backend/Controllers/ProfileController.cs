// Controllers/ProfileController.cs
using backend.Models
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

    [HttpPut("update")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileUpdateRequest request)
    {
        try
        {
            var client = await _supabaseService.GetClientAsync();
            var user = client.Auth.User;

            if (user == null)
            {
                return Unauthorized(new { message = "User not authenticated." });
            }

            var updates = new Dictionary<string, object>();

            if (!string.IsNullOrEmpty(request.FirstName))
                updates["first_name"] = request.FirstName;

            if (!string.IsNullOrEmpty(request.LastName))
                updates["last_name"] = request.LastName;

            if (!string.IsNullOrEmpty(request.StageName))
                updates["stage_name"] = request.StageName;

            if (updates.Count == 0)
            {
                return BadRequest(new { message = "No valid fields to update." });
            }

            var updatedUser = await client.Auth.Update(updates);

            return Ok(new { user = updatedUser });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating profile.");
            return StatusCode(500, new { message = "An error occurred while updating the profile." });
        }
    }
}