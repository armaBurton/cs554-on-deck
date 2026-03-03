// v2\backend\Models\Events\Events.cs
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using Column = Supabase.Postgrest.Attributes.ColumnAttribute;

public class Attendee
{
    public Guid? Id { get; set; }
    public Guid EventId { get; set; }
    public Guid? UserId { get; set; }
    public string AttendeeName { get; set; }
    public char Attendance { get; set; }
    public string? Email { get; set; }
}

public class Event
{
    public Guid? Id { get; set; }
    public Guid UserId { get; set; }
    public string Venue { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public int Zip { get; set; }
    public DateOnly Date { get; set; }
    public TimeOnly Signup { get; set; }
    public TimeOnly Start { get; set; }
    public TimeOnly Finish { get; set; }
    public List<Attendee> Attendees { get; set; } = new();
}
