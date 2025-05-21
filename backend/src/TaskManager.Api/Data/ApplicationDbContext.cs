using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Models;

namespace TaskManager.Api.Data
{
    /// <summary>
    /// EF Core DbContext for TaskManager; exposes the Tasks DbSet and applies any model configuration.
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        // Constructor called by DI container
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // Represents the Tasks table in the database.
        public DbSet<TaskItem> Tasks { get; set; }
    }
}
