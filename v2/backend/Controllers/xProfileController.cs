// // Controllers/ProfileController.cs
// using backend.Models;
// using backend.Models.DTOs;
// using backend.Services;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;

// namespace backend.Controllers;

// [ApiController]
// [Route("api/[controller]")]
// public class ProfileController : ControllerBase
// {
//     private readonly ISupabaseService _supabaseService;
//     private readonly ILogger<ProfileController> _logger;

//     public ProfileController(ISupabaseService supabaseService, ILogger<ProfileController> logger)
//     {
//         _supabaseService = supabaseService;
//         _logger = logger;
//     }

//     private string? GetUserIdFromToken()
//     {
//         var authHeader = Request.Headers["Authorization"].FirstOrDefault();
//         if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
//         {
//             return null;
//         }

//         var token = authHeader.Substring("Bearer ".Length).Trim();

//         try
//         {
//             var parts = token.Split('.');
//             if (parts.Length != 3)
//                 return null;

//             var payload = parts[1];
//             var paddedPayload = payload.PadRight(
//                 payload.Length + (4 - payload.Length % 4) % 4,
//                 '='
//             );

//             var payloadBytes = Convert.FromBase64String(paddedPayload);
//             var payloadJson = System.Text.Encoding.UTF8.GetString(payloadBytes);

//             var json = System.Text.Json.JsonDocument.Parse(payloadJson);
//             return json.RootElement.GetProperty("sub").GetString();
//         }
//         catch
//         {
//             return null;
//         }
//     }

//     [HttpGet]
//     public async Task<IActionResult> GetProfile()
//     {
//         try
//         {
//             var userId = GetUserIdFromToken();
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized();

//             var client = await _supabaseService.GetClientAsync();
//             // var client = client.Auth.CurrentUser;
//             var profile = await client
//                 .From<Profile>()
//                 .Where(p => p.Id == Guid.Parse(userId))
//                 .Single();

//             if (profile == null)
//                 return NotFound();

//             var socials = await client
//                 .From<Social>()
//                 .Where(s => s.ProfileId == Guid.Parse(userId))
//                 .Get();

//             return Ok(new { profile = socials.Models });
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Error fetching profile");
//             return BadRequest(new { message = ex.Message });
//         }
//     }

//     [HttpPut]
//     public async Task<IActionResult> UpdateProfile([FromBody] ProfileUpdateRequest request)
//     {
//         try
//         {
//             var userId = GetUserIdFromToken();
//             if (string.IsNullOrEmpty(userId))
//                 return Unauthorized();

//             var client = await _supabaseService.GetClientAsync();

//             var profile = new Profile
//             {
//                 Id = Guid.Parse(userId),
//                 FirstName = request.FirstName,
//                 LastName = request.LastName,
//                 StageName = request.StageName,
//             };

//             await client.From<Profile>().Update(profile);

//             return Ok(new { message = "Profile updated successfully" });
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Error updating profile");
//             return BadRequest(new { message = ex.Message });
//         }
//     }

//     // [HttpPost("socials")]
//     // public async Task<IActionResult> AddSocial([FromBody] SocialRequest request)
//     // {
//     //     try
//     //     {
//     //         var userId = GetUserIdFromToken();
//     //         if (string.IsNullOrEmpty(userId))
//     //             return Unauthorized();

//     //         var client = await _supabaseService.GetClientAsync();

//     //         var social = new Social
//     //         {
//     //             ProfileId = Guid.Parse(userId),
//     //             Platform = request.Platform,
//     //             Url = request.Url,
//     //         };

//     //         var result = await client.From<Social>().Insert(social);
//     //         return Ok(result.Models.FirstOrDefault());
//     //     }
//     //     catch (Exception ex)
//     //     {
//     //         _logger.LogError(ex, "Error adding social");
//     //         return BadRequest(new { message = ex.Message });
//     //     }
//     // }

//     // [HttpDelete("socials/{id}")]
//     // public async Task<IActionResult> DeleteSocial(Guid id)
//     // {
//     //     try
//     //     {
//     //         var userId = GetUserIdFromToken();
//     //         if (string.IsNullOrEmpty(userId))
//     //             return Unauthorized();

//     //         var client = await _supabaseService.GetClientAsync();
//     //         await client
//     //             .From<Social>()
//     //             .Where(s => s.Id == id && s.ProfileId == Guid.Parse(userId))
//     //             .Delete();

//     //         return Ok(new { message = "Social deleted successfully" });
//     //     }
//     //     catch (Exception ex)
//     //     {
//     //         _logger.LogError(ex, "Error deleting social");
//     //         return BadRequest(new { message = ex.Message });
//     //     }
//     // }
// }

// /// <summary>
// /// Partially update the current user's profile (PATCH)
// /// </summary>
// [HttpPatch]
// [ProducesResponseType(StatusCodes.Status200OK)]
// [ProducesResponseType(StatusCodes.Status400BadRequest)]
// [ProducesResponseType(StatusCodes.Status401Unauthorized)]
// public async Task<IActionResult> PatchProfile([FromBody] JsonElement updates)
// {
//     try
//     {
//         var userId = GetUserIdFromToken();
//         if (string.IsNullOrEmpty(userId))
//             return Unauthorized(new { message = "Invalid or missing token" });

//         var client = await _supabaseService.GetClientAsync();

//         var existingProfile = await client
//             .From<Profile>()
//             .Where(p => p.Id == Guid.Parse(userId))
//             .Single();

//         if (existingProfile == null)
//             return NotFound(new { message = "Profile not found" });

//         // Apply partial updates
//         if (updates.TryGetProperty("first_name", out var firstName))
//             existingProfile.FirstName = firstName.GetString();

//         if (updates.TryGetProperty("last_name", out var lastName))
//             existingProfile.LastName = lastName.GetString();

//         if (updates.TryGetProperty("nick_name", out var nickName))
//             existingProfile.NickName = nickName.GetString();

//         await client.From<Profile>().Update(existingProfile);

//         return Ok(new { message = "Profile updated successfully", profile = existingProfile });
//     }
//     catch (Exception ex)
//     {
//         _logger.LogError(ex, "Error patching profile");
//         return BadRequest(new { message = "Failed to update profile", error = ex.Message });
//     }
// }

// /// <summary>
// /// Delete the current user's profile
// /// </summary>
// [HttpDelete]
// [ProducesResponseType(StatusCodes.Status200OK)]
// [ProducesResponseType(StatusCodes.Status401Unauthorized)]
// public async Task<IActionResult> DeleteProfile()
// {
//     try
//     {
//         var userId = GetUserIdFromToken();
//         if (string.IsNullOrEmpty(userId))
//             return Unauthorized(new { message = "Invalid or missing token" });

//         var client = await _supabaseService.GetClientAsync();

//         // Delete profile
//         await client.From<Profile>().Where(p => p.Id == Guid.Parse(userId)).Delete();

//         _logger.LogInformation("Profile deleted for user: {UserId}", userId);

//         return Ok(new { message = "Profile deleted successfully" });
//     }
//     catch (Exception ex)
//     {
//         _logger.LogError(ex, "Error deleting profile");
//         return StatusCode(500, new { message = "Failed to delete profile" });
//     }
// }

// /// <summary>
// /// Search profiles by name or nickname
// /// </summary>
// [HttpGet("search")]
// [ProducesResponseType(StatusCodes.Status200OK)]
// public async Task<IActionResult> SearchProfiles(
//     [FromQuery] string query,
//     [FromQuery] int limit = 10
// )
// {
//     try
//     {
//         if (string.IsNullOrWhiteSpace(query))
//             return BadRequest(new { message = "Search query is required" });

//         var client = await _supabaseService.GetClientAsync();

//         // Note: This is a simplified search. For production, consider using full-text search
//         var profiles = await client.From<Profile>().Get();

//         var searchTerm = query.ToLower();
//         var filtered = profiles
//             .Models.Where(p =>
//                 (p.FirstName?.ToLower().Contains(searchTerm) ?? false)
//                 || (p.LastName?.ToLower().Contains(searchTerm) ?? false)
//                 || (p.NickName?.ToLower().Contains(searchTerm) ?? false)
//             )
//             .Take(limit)
//             .Select(p => new
//             {
//                 id = p.Id,
//                 first_name = p.FirstName,
//                 last_name = p.LastName,
//                 nick_name = p.NickName,
//                 display_name = p.NickName ?? p.FirstName ?? "User",
//             });

//         return Ok(filtered);
//     }
//     catch (Exception ex)
//     {
//         _logger.LogError(ex, "Error searching profiles");
//         return StatusCode(500, new { message = "Search failed" });
//     }
// }
