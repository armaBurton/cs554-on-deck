// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using backend.Models.DTOs;
using backend.Services;
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
  public async Task<IActionResult> Register([FromBody], RegisterRequest request)
  {
    try
    {
      var client = await _supabaseService.GetClientAsync();

      var options = new SignUpOptions
      {
        Data = new Dictionary<string, object>
        {
          { "first_name", request.FirstName ?? string.Empty },
          { "last_name", request.LastName ?? string.Empty }
        }
      };

      var session = await client.Auth.SignUp(request.Email, request.Password, options);

      if (session?.User == null) {
        return BadRequest(new { message = "Registration failed." });
      }

      return Ok(new
      {
        user = session.User,
        session = new
        {
          access_token = session.AccessToken,
          refresh_token = session.RefreshToken
        }
      });
    } catch (Exception ex)
    {
      _logger.LogError(ex, "Registration Error");
      return BadRequest(new { message = ex.Message });
    }
  }

  [HttpPost("Login")]
  public async Task<IActionResult> Login([FromBody] LoginRequest request)
  {
    try
    {
      var client = await _supabaseService.GetClientAsync();
      var session = await client.Auth.SignIn(request.Email, request.Password);

      if (session?.User == null)
      {
        return Unauthorized(new { message = "Invalid credentials" });
      }

      return Ok(new
      {
        user = session.User,
        session = new
        {
          access_token = session.AccessToken,
          refresh_token = session.RefreshToken
        }
      });
    } catch (Exception ex)
    {
      _logger.LogError(ex, "Login error");
      return Unauthorized(new { message = "Invalid credentials" });
    }
  }

  [HttpPost("logout")]
  public async Task<IActionResult> Logout()
  {
    try
    {
      var client = await _supabaseService.GetClientAsync();
      await client.Auth.SignOut();
      return Ok(new { message = "Logged out successfully" });
    } catch (Exception ex)
    {
      _logger.LogError(ex, "Logout error");
      return BadRequest(new { message = ex.Message });
    }
  }

  [HttpGet("google")]
  public async Task<IActionResult> GoogleLogin()
  {
    try
    {
      var client = await _supabaseService.GetClientAsync();
      var url = client.Auth.SignIn(Supabase.Gotrue.Constance.Provider.Google);
      return Ok(new { url });
    } catch (Exception ex)
    {
      _logger.LogError(ex, "Google OAuth error");
      return BadRequest(new { message = ex.Message });
    }
  }

