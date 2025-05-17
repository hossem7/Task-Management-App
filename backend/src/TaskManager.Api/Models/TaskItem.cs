namespace TaskManager.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; } // primary key
        public required string Title { get; set; } // task title
        public bool IsCompleted { get; set; } = false; // task completion toggle
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // creation timestamp
    }
}
