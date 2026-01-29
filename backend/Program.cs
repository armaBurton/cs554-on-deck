
DotNetEnv.Env.Load();    

var url = Environment.GetEnvironmentVariable("SUPABASE_HOST");
var key = Environment.GetEnvironmentVariable("SUPABASE_PASSWORD");

var options = new Supabase.SupabaseOptions
{
    AutoConnectRealtime = true,
};

var supabase = new Supabase.Client(url, key, options);
await supabase.InitializeAsync();



// var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// builder.Services.AddScoped(_ =>
// {
//     DotNetEnv.Env.Load();

//     var url = Environment.GetEnvironmentVariable("SUPABASE_HOST");
//     var key = Environment.GetEnvironmentVariable("SUPABASE_PASSWORD");

//     return null; //new Supabase.Client(url, key);
// });

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// app.Run();
