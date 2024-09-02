namespace BookStore.Api.Models;

public partial class BookDetails
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public int? Pages { get; set; }

    public int? Year { get; set; }

    public string? Authors { get; set; }
}
