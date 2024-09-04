# [Choice] .NET version: 8.0-bookworm, 8.0-jammy, 8.0-bullseye
FROM mcr.microsoft.com/devcontainers/dotnet:1-8.0-bookworm

# Add .NET global tools path
ENV PATH $PATH:/home/vscode/.dotnet:/home/vscode/.dotnet/tools

# Update .NET workload and install .NET Aspire
RUN sudo dotnet workload update \
    && sudo dotnet workload install aspire
