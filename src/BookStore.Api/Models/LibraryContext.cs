using Microsoft.EntityFrameworkCore;

namespace BookStore.Api.Models;

public partial class LibraryContext : DbContext
{
    public LibraryContext()
    {
    }

    public LibraryContext(DbContextOptions<LibraryContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Author> Authors { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<BookDetails> VwBooksDetails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.ToTable("authors");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(NEXT VALUE FOR [dbo].[globalId])")
                .HasColumnName("id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(100)
                .HasColumnName("middle_name");

            entity.HasMany(d => d.Books).WithMany(p => p.Authors)
                .UsingEntity<Dictionary<string, object>>(
                    "BooksAuthor",
                    r => r.HasOne<Book>().WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.ClientSetNull),
                    l => l.HasOne<Author>().WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.ClientSetNull),
                    j =>
                    {
                        j.ToTable("books_authors");
                        j.HasIndex(["BookId", "AuthorId"]);
                        j.IndexerProperty<int>("AuthorId").HasColumnName("author_id");
                        j.IndexerProperty<int>("BookId").HasColumnName("book_id");
                    });
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.ToTable("books");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(NEXT VALUE FOR [dbo].[globalId])")
                .HasColumnName("id");
            entity.Property(e => e.Pages).HasColumnName("pages");
            entity.Property(e => e.Title)
                .HasMaxLength(1000)
                .HasColumnName("title");
            entity.Property(e => e.Year).HasColumnName("year");
        });

        modelBuilder.Entity<BookDetails>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_books_details");

            entity.Property(e => e.Authors)
                .HasMaxLength(4000)
                .HasColumnName("authors");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Pages).HasColumnName("pages");
            entity.Property(e => e.Title)
                .HasMaxLength(1000)
                .HasColumnName("title");
            entity.Property(e => e.Year).HasColumnName("year");
        });
        modelBuilder.HasSequence<int>("globalId").StartsAt(1000000L);

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
