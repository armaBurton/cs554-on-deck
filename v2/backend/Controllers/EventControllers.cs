// v2\backend\Controllers\EventControllers.cs
using backend.Models.Events;
using backend.Models.Events.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Supabase.Gotrue;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
  private readonly ISupaBaseService _supabaseService;
  private readonly ILogger<ProfileController> _logger;

  public EventsController(ISupabaseService supabaseService, ILogger<EventsController> logger)
  {
    _supabaseService = supabaseService
    _logger = logger;
  }

  [Authorize]
  [HttpPost]
  public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request)
  {
    try 
    {
      var userId = User.FindFirst("sub")?.Value;
      if (string.IsNullOrEmpty(userId))
        return Unauthorized(new {message = "Invalid or missing token"});

      var client = await _supabaseService.GetClientAsync();

      var newEvent = new Event
      {
        Id = Guid.Parse(userId)
      };
    } 
    catch (Exception ex) 
    {
      _logger.LogError(ex, "");
      return BadRequest(new { message = ex.Message });
    }
  }

}
