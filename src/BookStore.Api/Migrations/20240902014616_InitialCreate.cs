using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookStore.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence<int>(
                name: "globalId",
                startValue: 1000000L);

            migrationBuilder.CreateTable(
                name: "authors",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false, defaultValueSql: "(NEXT VALUE FOR [dbo].[globalId])"),
                    first_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    middle_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    last_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_authors", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "books",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false, defaultValueSql: "(NEXT VALUE FOR [dbo].[globalId])"),
                    title = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    year = table.Column<int>(type: "int", nullable: true),
                    pages = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_books", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "books_authors",
                columns: table => new
                {
                    author_id = table.Column<int>(type: "int", nullable: false),
                    book_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_books_authors", x => new { x.author_id, x.book_id });
                    table.ForeignKey(
                        name: "FK_books_authors_authors_author_id",
                        column: x => x.author_id,
                        principalTable: "authors",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_books_authors_books_book_id",
                        column: x => x.book_id,
                        principalTable: "books",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_books_authors_book_id_author_id",
                table: "books_authors",
                columns: new[] { "book_id", "author_id" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "books_authors");

            migrationBuilder.DropTable(
                name: "authors");

            migrationBuilder.DropTable(
                name: "books");

            migrationBuilder.DropSequence(
                name: "globalId");
        }
    }
}
