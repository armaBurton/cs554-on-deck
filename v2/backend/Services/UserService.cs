// v2\backend\Services\UserService.cs
using backend.Models.Profile;

namespace backend.Services;

public class UserService
{
    private readonly Supabase.Client _supabase;

    public UserService(ISupabaseService supabaseService)
    {
        _supabase = supabaseService.GetClient();
    }

    public async Task<List<Profile>> GetAllAsync()
    {
        var res = await _supabase.From<Profile>().Get();

        return res.Models;
    }
}
