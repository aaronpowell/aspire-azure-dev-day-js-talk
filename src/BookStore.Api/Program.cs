using BookStore.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddSqlServerDbContext<LibraryContext>("library");

builder.Services.AddProblemDetails();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.UseExceptionHandler();

app.MapGet("/api/books", (LibraryContext ctx, ILogger<Program> logger) =>
{
    logger.LogInformation("Getting all books");
    return ctx.Books;
});

app.MapDefaultEndpoints();

app.Run();
