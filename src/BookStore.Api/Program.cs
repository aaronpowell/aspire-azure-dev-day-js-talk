using BookStore.Api.Models;
using Microsoft.EntityFrameworkCore;

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
    return ctx.BookDetails;
});

app.MapGet("/api/books/{id}", (LibraryContext ctx, int id, ILogger<Program> logger) =>
{
    logger.LogInformation("Getting book with id {id}", id);
    Book? book = ctx.Books.Include(b => b.Authors).FirstOrDefault(b => b.Id == id);

    if (book is null)
    {
        logger.LogWarning("Book with id {id} not found", id);
        return Results.NotFound();
    }

    return Results.Json(book);
});

app.MapGet("/api/authors", (LibraryContext context, ILogger<Program> logger) =>
{
    logger.LogInformation("Getting all authors");
    return context.Authors;
});

app.MapDefaultEndpoints();

app.Run();
