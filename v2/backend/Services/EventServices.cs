// v2\backend\Services\EventServices.cs
using backend.Models.Events;
using backend.Models.Events.DTOs;
using backend.Models.Profile;
using backend.Models.Profile.DTOs;
using Supabase;

namespace backend.Services;

public class EventsService
{
    private readonly SupabaseService _supabase;

    public EventsService(SupabaseService supabase)
    {
        _supabase = supabase;
    }

    // *** EVENTS ***

    public async Task<List<Event>> GetAllAsync(Guid userId)
    {
        var client = await _supabase.GetClientAsync();

        var res = await client.From<Event>().Where(e => e.UserId == userId).Get();
        return res.Models;
    }

    // public async Task<Event?> GetByIdAsync(Guid id, Guid userId)
    // {
    //     var res = await _supabase
    //         .From<Event>("events")
    //         .Where(e => e.Id == id && e.userId == userId)
    //         .Single();

    //     return res;
    // }

    // public async Task<Event> CreateAsync(CreateEventRequest req, Guid userId)
    // {
    //     var evt = new Event
    //     {
    //         UserId = userId,
    //         Venue = request.Venue,
    //         Street = request.StreetAddress,
    //         City = request.City,
    //         State = request.State,
    //         Zip = request.Zipcode,
    //         Date = request.Date,
    //         Signup = request.Signup,
    //         Start = request.Start,
    //         Finish = request.Finish,
    //     };

    //     var eventRes = await _supabase.From<Event>("events").Insert(evt);
    //     var created = eventResponse.Models.First();

    //     if (req.Attendees.Any())
    //     {
    //         var attendees = req
    //             .Attendees.Select(a => new Attendee
    //             {
    //                 EventId = created.Id!.Value,
    //                 UserId = a.UserId, // null if creator is adding on behalf of someone
    //                 AttendeeName = a.AttendeeName,
    //                 Attendance = a.Attendance,
    //                 Email = a.Email,
    //             })
    //             .ToList();

    //         await _supabase.From<Attendee>("event_attendees").Insert(attendees);
    //     }

    //     return Created;
    // }

    // public async Task<Event?> UpdateAsync(Guid id, CreateEventRequest req, Guid userId)
    // {
    //     var existing = await GetByIdAsync(id, userId);
    //     if (existing == null)
    //         return null;

    //     existing.Venue = request.Venue;
    //     existing.Street = request.Street;
    //     existing.City = request.City;
    //     existing.State = request.State;
    //     existing.Zip = request.Zip;
    //     existing.Date = request.Date;
    //     existing.Signup = request.Signup;
    //     existing.Start = request.Start;
    //     existing.Finish = request.Finish;

    //     var res = await _supabase.From<Event>("events").Update(existing);

    //     return res.Models.FirstOrDefault();
    // }

    // public async Task DeleteAsync(Guid id, Guid userId)
    // {
    //     await _supabase.From<Event>("events").Where(e => e.Id == id && e.UserId == userId).Delete();
    // }

    // // *** ATTENDEES ***

    // public async Task<Attendee?> AddAttendeeAsync(Guid eventId, AttendeeRequest req, Guid userId)
    // {
    //     var existing = await GetByIdAsync(id, userId);
    //     if (existing == null)
    //         return null;

    //     var attendee = new Attendee
    //     {
    //         EventId = eventId,
    //         UserId = req.UserId,
    //         AttendeeName = req.AttendeeName,
    //         Email = req.Email,
    //     };

    //     var res = await _supabase.From<Attendee>("event_attendees").Insert(attendee);
    //     return req.Models.FirstOrDefault();
    // }

    // public async Task<Attendee?> UpdateAttendeeAsync(
    //     Guid eventID,
    //     Guid attendeeId,
    //     AttendeeRequest req,
    //     Guid userId
    // )
    // {
    //     var evt = await GetByIdAsync(eventId, userId);
    //     if (evt == null)
    //         return null;

    //     var existing = await _supabase
    //         .From<Attendee>("event_attendees")
    //         .Where(a => a.Id == attendeeId && a.EventId == eventId)
    //         .Single();

    //     if (existing == null)
    //         return null;

    //     existing.AttendeeName = req.AttendeeName;
    //     existing.Attendance = req.Attendance;
    //     existing.Email = req.Email;

    //     var updated = await _supabase.From<Attendee>("event_attendees").Update(existing);
    //     return updated.Models.FirstOrDefault();
    // }

    // public async Task DeleteAttendeeAsync(Guid eventId, Guid attendeeId, Guid userId)
    // {
    //     var evt = await GetByIdAsync(eventId, userId);
    //     if (evt == null)
    //         return null;

    //     await _supabase
    //         .From<Attendee>("event_attendees")
    //         .Where(a => a.Id == attendeeId && a.EventId == eventId)
    //         .Delete();
    // }
}
