// Controllers/AuthControllers.cs
using backend.Models.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Supabase.Gotrue;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ISupabaseService _supabaseService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(ISupabaseService supabaseService, ILogger<AuthController> logger)
    {
        _supabaseService = supabaseService;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var client = await _supabaseService.GetClientAsync();

            var options = new SignUpOptions
            {
                Data = new Dictionary<string, object>
                {
                    { "first_name", request.FirstName ?? string.Empty },
                    { "last_name", request.LastName ?? string.Empty },
                    { "stage_name", request.StageName ?? string.Empty },
                },
            };

            var session = await client.Auth.SignUp(request.Email, request.Password, options);

            if (session?.User == null)
            {
                return BadRequest(new { message = "Registration failed." });
            }

            return Ok(
                new
                {
                    user = session.User,
                    session = new
                    {
                        access_token = session.AccessToken,
                        refresh_token = session.RefreshToken,
                    },
                }
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Registration Error");
            return BadRequest(new { message = ex.Message });
        }
    }
}
