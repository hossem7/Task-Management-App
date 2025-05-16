namespace backend.Models
{
    public class TaskItem
    {
        public int Id { get; set; } // primary key
        public string Title { get; set; } // task title
        public bool IsCompleted { get; set; } // status flag
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
