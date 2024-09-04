namespace BookStore.Api.Models;

public class BookModel
{
    public string Title { get; set; } = null!;
    public int? Year { get; set; }
    public int? Pages { get; set; }
    public List<int> AuthorIds { get; set; } = [];
}
