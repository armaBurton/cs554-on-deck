// v2\backend\Models\Events\DTOs\Attendees.cs
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using Column = Supabase.Postgrest.Attributes.ColumnAttribute;

namespace backend.Models.Events;

public class Attendee
{
    public Guid? Id { get; set; }
    public Guid EventId { get; set; }
    public Guid? UserId { get; set; }
    public string AttendeeName { get; set; }
    public char Attendance { get; set; }
    public string? Email { get; set; }
}
