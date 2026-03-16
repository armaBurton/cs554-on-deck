// v2\backend\Models\Events\DTOs\EventDTOs.cs

namespace backend.Models.Events.DTOs;

public class AttendeeRequest
{
    public Guid? Id { get; set; }
    public Guid EventId { get; set; }
    public Guid? UserId { get; set; }
    public string AttendeeName { get; set; } = string.Empty;
    public char Attendance { get; set; }
    public string? Email { get; set; }
}

public class CreateEventRequest
{
    public string Venue { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public int Zip { get; set; }
    public string Date { get; set; } = string.Empty;
    public string Signup { get; set; } = string.Empty;
    public string Start { get; set; } = string.Empty;
    public string Finish { get; set; } = string.Empty;
    public List<AttendeeRequest> Attendees { get; set; } = new();
}
