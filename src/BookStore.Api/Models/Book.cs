namespace BookStore.Api.Models;

public partial class Book
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public int? Year { get; set; }

    public int? Pages { get; set; }

    public virtual ICollection<Author> Authors { get; set; } = [];
}
