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
    BookDetails? book = ctx.BookDetails.FirstOrDefault(b => b.Id == id);

    if (book is null)
    {
        logger.LogWarning("Book with id {id} not found", id);
        return Results.NotFound();
    }

    return Results.Json(book);
});

app.MapPost("/api/books", async (LibraryContext ctx, BookModel bookModel, ILogger<Program> logger) =>
{
    logger.LogInformation("Adding a new book");
    Book book = new()
    {
        Title = bookModel.Title,
        Year = bookModel.Year,
        Pages = bookModel.Pages,
    };

    if (bookModel.AuthorIds.Count > 0)
    {
        var authors = ctx.Authors.Where(a => bookModel.AuthorIds.Contains(a.Id));
        book.Authors = [.. authors];
    }

    ctx.Books.Add(book);

    await ctx.SaveChangesAsync();

    return Results.Created($"/api/books/{book.Id}", new { id = book.Id });
});

app.MapGet("/api/authors", (LibraryContext context, ILogger<Program> logger) =>
{
    logger.LogInformation("Getting all authors");
    return context.Authors;
});

app.MapDefaultEndpoints();

app.Run();
