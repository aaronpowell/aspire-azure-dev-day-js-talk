var builder = DistributedApplication.CreateBuilder(args);

var db = builder.AddSqlServer("BookStore")
    .WithBindMount("./sqlserverconfig", "/usr/config")
    .WithBindMount("../../database", "/docker-entrypoint-initdb.d")
    .WithEntrypoint("/usr/config/entrypoint.sh")
    .AddDatabase("library");

var apiService = builder.AddProject<Projects.BookStore_Api>("apiservice")
    .WithReference(db);

_ = builder.AddNpmApp("web", "../bookstore-web", "dev")
    .WithReference(apiService);

builder.Build().Run();
