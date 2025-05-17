using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Models;
using TaskManager.Api.Services;


namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]s")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _svc;
        public TaskController(ITaskService svc)
        {
            _svc = svc;
        }

        // GET: /tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetAll()
        {
            var list = await _svc.GetAllAsync();
            return Ok(list);
        }

        // POST: /tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> Create(TaskItem newTask)
        {
            var created = await _svc.CreateAsync(newTask);
            return CreatedAtAction(nameof(GetAll),
                                   new { id = created.Id },
                                   created);
        }

        // PATCH: /tasks/{id}/toggle
        [HttpPatch("{id}/toggle")]
        public async Task<IActionResult> Toggle(int id)
        {
            try
            {
                await _svc.ToggleAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        // DELETE: /tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _svc.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
