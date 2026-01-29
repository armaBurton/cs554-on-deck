
DotNetEnv.Env.Load();    

var url = Environment.GetEnvironmentVariable("SUPABASE_HOST");
var key = Environment.GetEnvironmentVariable("SUPABASE_PASSWORD");

var options = new Supabase.SupabaseOptions
{
    AutoRefreshToken = true,        
    AutoConnectRealtime = true,
};

var supabase = new Supabase.Client(url, key, options);
await supabase.InitializeAsync();
