// v2\backend\Services\EventServices.cs
using backend.Models.Events;
using backend.Models.Events.DTOs;
using Supabase;

namespace backend.Services;

public class EventsService
{
    private readonly Supabase.Client _supabase;

    public EventsService(Supabase.Client supabase)
    {
        _supabase = supabase;
    }

    // *** EVENTS ***

    public async Task<List<Event>> GetAllAsync(Guid userId)
    {
        var res = await _supabase.From<Event>().Where(e => e.UserId == userId).Get();
        return res.Models;
    }

    public async Task<Event?> GetByIdAsync(Guid id, Guid userId)
    {
        var res = await _supabase
            .From<Event>()
            .Where(e => e.Id == id && e.UserId == userId)
            .Single();

        return res;
    }

    public async Task<Event> CreateAsync(CreateEventRequest req, Guid userId)
    {
        var evt = new Event
        {
            UserId = userId,
            Venue = req.Venue,
            Street = req.Street,
            City = req.City,
            State = req.State,
            Zip = req.Zip,
            Date = req.Date,
            Signup = req.Signup,
            Start = req.Start,
            Finish = req.Finish,
        };

        var eventRes = await _supabase.From<Event>().Insert(evt);
        var created = eventRes.Models.First();

        if (req.Attendees.Any())
        {
            var attendees = req
                .Attendees.Select(a => new Attendee
                {
                    EventId = created.Id!.Value,
                    UserId = a.UserId, // null if creator is adding on behalf of someone
                    AttendeeName = a.AttendeeName,
                    Attendance = a.Attendance,
                    Email = a.Email,
                })
                .ToList();

            await _supabase.From<Attendee>().Insert(attendees);
        }

        return created;
    }

    public async Task<Event?> UpdateAsync(Guid id, CreateEventRequest req, Guid userId)
    {
        var existing = await GetByIdAsync(id, userId);
        if (existing == null)
            return null;

        existing.Venue = req.Venue;
        existing.Street = req.Street;
        existing.City = req.City;
        existing.State = req.State;
        existing.Zip = req.Zip;
        existing.Date = req.Date;
        existing.Signup = req.Signup;
        existing.Start = req.Start;
        existing.Finish = req.Finish;

        var res = await _supabase.From<Event>().Update(existing);

        return res.Models.FirstOrDefault();
    }

    public async Task DeleteAsync(Guid id, Guid userId)
    {
        await _supabase.From<Event>().Where(e => e.Id == id && e.UserId == userId).Delete();
    }

    // *** ATTENDEES ***

    public async Task<Attendee?> AddAttendeeAsync(Guid eventId, AttendeeRequest req, Guid userId)
    {
        var existing = await GetByIdAsync(eventId, userId);
        if (existing == null)
            return null;

        var attendee = new Attendee
        {
            EventId = eventId,
            UserId = req.UserId,
            AttendeeName = req.AttendeeName,
            Attendance = req.Attendance,
            Email = req.Email,
        };

        var res = await _supabase.From<Attendee>().Insert(attendee);
        return res.Models.FirstOrDefault();
    }

    public async Task<Attendee?> UpdateAttendeeAsync(
        Guid eventId,
        Guid attendeeId,
        AttendeeRequest req,
        Guid userId
    )
    {
        var evt = await GetByIdAsync(eventId, userId);
        if (evt == null)
            return null;

        var existing = await _supabase
            .From<Attendee>()
            .Where(a => a.Id == attendeeId && a.EventId == eventId)
            .Single();

        if (existing == null)
            return null;

        existing.AttendeeName = req.AttendeeName;
        existing.Attendance = req.Attendance;
        existing.Email = req.Email;

        var updated = await _supabase.From<Attendee>().Update(existing);
        return updated.Models.FirstOrDefault();
    }

    public async Task DeleteAttendeeAsync(Guid eventId, Guid attendeeId, Guid userId)
    {
        var evt = await GetByIdAsync(eventId, userId);
        if (evt == null)
            return;

        await _supabase
            .From<Attendee>()
            .Where(a => a.Id == attendeeId && a.EventId == eventId)
            .Delete();
    }
}
