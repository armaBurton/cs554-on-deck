using Supabase;

namespace backend.Services;
public interface ISupabaseService
{
  Client GetClient();
  Test<Client> GetClientAsync();
}