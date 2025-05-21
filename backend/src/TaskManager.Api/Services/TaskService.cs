using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Models;

namespace TaskManager.Api.Services
{
    /// <summary>
    /// Concrete implementation of ITaskService using EF Core for persistence.
    /// </summary>
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _db;

        // Constructor receives the EF DbContext via DI.
        public TaskService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync() =>
            await _db.Tasks
                     .AsNoTracking()
                     .OrderBy(t => t.CreatedAt)
                     .ToListAsync();

        public async Task<TaskItem> CreateAsync(TaskItem newTask)
        {
            _db.Tasks.Add(newTask);
            await _db.SaveChangesAsync();
            return newTask;
        }

        public async Task<TaskItem> ToggleAsync(int id)
        {
            var task = await _db.Tasks.FindAsync(id)
                       ?? throw new KeyNotFoundException($"Task with {id} not found from the list");
            task.IsCompleted = !task.IsCompleted;
            await _db.SaveChangesAsync();
            return task;
        }

        public async Task DeleteAsync(int id)
        {
            var task = await _db.Tasks.FindAsync(id)
                       ?? throw new KeyNotFoundException($"Task with {id} not found from the list");
            _db.Tasks.Remove(task);
            await _db.SaveChangesAsync();
        }
    }
}
