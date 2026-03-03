// v2\backend\Controllers\EventControllers.cs
using System.Security.Claims;
using backend.Models.Events;
using backend.Models.Events.DTOs;
using backend.Models.Profile.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Supabase.Gotrue;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly EventsService _eventsService;

    public EventsController(EventsService eventsService)
    {
        _eventsService = eventsService;
    }

    // *** EVENTS ***

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized();

        return Ok(await _eventsService.GetAllAsync(userId.Value));
    }

    // [HttpGet("{id}")]
    // public async Task<IActionResult> GetById(Guid id)
    // {
    //     var userId = GetUserId();
    //     if (userId == null)
    //         return Unauthorized();
    //     var evt = await _eventsService.GetByIdAsync(id, userId.Value);
    //     return evt == null ? NotFound() : Ok(evt);
    // }

    // [HttpPost]
    // public async Task<IActionResult> Create([FromBody] CreateEventRequest req)
    // {
    //     var userId = GetUserId();
    //     if (userId == null)
    //         return Unauthorized();
    //     var created = await _eventsService.CreateAsync(req, userId.value);
    //     return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    // }

    // [HttpPut("{id}")]
    // public async Task<IActionResult> Update(Guid id, [FromBody] CreateEventRequest req)
    // {
    //     var userId = GetUserId();
    //     if (userId == null)
    //         return Unauthorized();
    //     var updated = await _eventService.UpdateAsync(id, req, userId.Value);
    //     return updated == null ? NotFound() : Ok(updated);
    // }

    // [HttpDelete("{id}")]
    // public async Task<IActionResult> Delete(Guid ig)
    // {
    //     var userId = GetUserId();
    //     if (userId == null)
    //         return Unauthorized();
    //     await _eventService.DeleteAsync(id, userId.Value);
    //     return NoContent();
    // }

    // // *** ATTENDEES ***

    // [HttpPost("{id}/attendees")]
    // public async Task<IActionResult> AddAttendee(Guid id, [FromBody] AttendeeRequest req)
    // {
    //     var userId = GetUserId();
    //     if (userId == null)
    //         return Unauthorized();
    //     var attendee = await _eventsService.AddAttendeeAsync(id, req, userId.Value);
    //     return attendee == null ? NotFound() : Ok(attendee);
    // }

    // [HttpPut("{id}/attendees/{attendeeId}")]
    // public async Task<IActionResult> UpdateAttendee(
    //     Guid id,
    //     Guid attendeeId,
    //     [FromBody] AttendeeRequest req
    // )
    // {
    //     var userId = GetUserId();
    //     if (userId == null)
    //         return Unauthorized();
    //     var attendee = await _eventService.UpdateAttendeeAsync(id);
    //     return attendee == null ? NotFound() : OK(attendee);
    // }

    // [HttpDelete("{id}/attendees/{attendeeId}")]
    // public async Task<IActionResult> DeleteAttendee(Guid id, Guid attendeeId)
    // {
    //     var userId = GetUserId();
    //     if (userId == null)
    //         return Unauthorized();
    //     await _eventService.DeleteAttendeeAsync(id, attendeeId, userId.value);
    //     return NoContent();
    // }

    // *** HELPERS ***

    private Guid? GetUserId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Guid.TryParse(claim, out var id) ? id : null;
    }
}
