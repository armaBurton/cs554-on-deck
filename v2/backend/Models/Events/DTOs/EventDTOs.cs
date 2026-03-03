// v2\backend\Models\Profile\DTOs\EventDTOs.cs
public class AttendeeRequest
{
    public string AttendeeName { get; set; } = string.Empty;
    public char Attendance { get; set; }
    public string? Email { get; set; }

    public Guid? UserId { get; set; }
}

public class CreateEventRequest
{
    public string Venue { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public int Zip { get; set; }
    public DateOnly Date { get; set; }
    public TimeOnly SignUp { get; set; }
    public TimeOnly Start { get; set; }
    public TimeOnly Finish { get; set; }
    public List<AttendeeRequest> Attendees { get; set; } = new();
}
