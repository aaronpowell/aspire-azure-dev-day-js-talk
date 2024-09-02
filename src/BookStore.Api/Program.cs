using BookStore.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddSqlServerDbContext<LibraryContext>("library");

builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();

app.MapGet("/api/books", (LibraryContext ctx) => ctx.Books);

app.MapDefaultEndpoints();

app.Run();
