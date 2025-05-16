using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Models;

namespace TaskManager.Api.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _db;
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

        public async Task ToggleAsync(int id)
        {
            var task = await _db.Tasks.FindAsync(id)
                       ?? throw new KeyNotFoundException($"Task with {id} not found from the list");
            task.IsCompleted = !task.IsCompleted;
            await _db.SaveChangesAsync();
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
