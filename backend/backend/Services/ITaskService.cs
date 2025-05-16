using backend.Models;

namespace backend.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllAsync(); // Get all tasks
        Task<TaskItem> CreateAsync(TaskItem newTask); // Create a new task
        Task ToggleAsync(int id); // Toggle the completion status of a task
        Task DeleteAsync(int id); // Delete a task
    }
}
