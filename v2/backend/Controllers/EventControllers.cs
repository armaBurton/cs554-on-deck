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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized();
        var evt = await _eventsService.GetByIdAsync(id, userId.Value);
        return evt == null ? NotFound() : Ok(evt);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEventRequest req)
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized();
        var created = await _eventService.CreateAsync(req, userId.value);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
}
