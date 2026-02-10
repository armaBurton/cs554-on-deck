using Supabase;

namespace backend.Services;

public interface ISupabaseService
{
    Client GetClient();
    Task<Client> GetClientAsync();
}
