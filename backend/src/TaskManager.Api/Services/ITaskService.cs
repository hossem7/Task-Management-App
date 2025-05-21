using TaskManager.Api.Models;

namespace TaskManager.Api.Services
{
    /// <summary>
    /// Defines business operations over TaskItem entities.
    /// </summary>
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllAsync(); // Get all tasks
        Task<TaskItem> CreateAsync(TaskItem newTask); // Create a new task
        Task<TaskItem> ToggleAsync(int id); // Toggle the completion status of a task
        Task DeleteAsync(int id); // Delete a task
    }
}
