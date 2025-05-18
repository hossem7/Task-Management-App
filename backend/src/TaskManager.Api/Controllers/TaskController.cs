using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Models;
using TaskManager.Api.Services;


namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]s/")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _svc;
        public TaskController(ITaskService svc)
        {
            _svc = svc;
        }

        // GET: /tasks/getTasks
        [HttpGet("getTasks")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetAll()
        {
            var list = await _svc.GetAllAsync();
            return Ok(list);
        }

        // POST: /tasks/createTask
        [HttpPost("createTask")]
        public async Task<ActionResult<TaskItem>> Create(TaskItem newTask)
        {
            var created = await _svc.CreateAsync(newTask);
            return CreatedAtAction(nameof(GetAll),
                                   new { id = created.Id },
                                   created);
        }

        // PATCH: /tasks/{id}/toggleTask
        [HttpPatch("{id}/toggleTask")]
        public async Task<ActionResult<TaskItem>> Toggle(int id)
        {
            try
            {
                var updated = await _svc.ToggleAsync(id);
                return Ok(updated);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        // DELETE: /tasks/{id}
        [HttpDelete("{id}/deleteTask")]
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
