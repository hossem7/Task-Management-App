using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public TasksController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetAll()
        {
            var tasks = await _db.Tasks
                                 .AsNoTracking()
                                 .OrderBy(t => t.CreatedAt)
                                 .ToListAsync();
            return Ok(tasks);
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> Create(TaskItem newTask)
        {
            _db.Tasks.Add(newTask);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = newTask.Id }, newTask);
        }

        // PATCH: api/tasks/{id}/toggle
        [HttpPatch("{id}/toggle")]
        public async Task<IActionResult> Toggle(int id)
        {
            var task = await _db.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            task.IsCompleted = !task.IsCompleted;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var t = await _db.Tasks.FindAsync(id);
            if (t == null) return NotFound();

            _db.Tasks.Remove(t);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
