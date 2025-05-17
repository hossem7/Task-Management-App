using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TaskManager.Api.Controllers;
using TaskManager.Api.Models;
using TaskManager.Api.Services;

namespace TaskManager.Tests.Controllers
{
    public class TasksControllerTests
    {
        [Fact]
        public async Task GetAllTasks_PositiveCase()
        {
            // Arrange
            var mockTasks = new List<TaskItem>
            {
                new TaskItem { Id = 1, Title = "Test", IsCompleted = false }
            };

            var svcMock = new Mock<ITaskService>();
            svcMock.Setup(s => s.GetAllAsync())
                   .ReturnsAsync(mockTasks);

            var controller = new TaskController(svcMock.Object);

            // Act
            var actionResult = await controller.GetAll();

            // Assert
            var Result = actionResult.Result as OkObjectResult;
            Result.Should().NotBeNull();
            Result.StatusCode.Should().Be(200);

            var returned = Result.Value as IEnumerable<TaskItem>;
            returned.Should().BeEquivalentTo(mockTasks);
        }

        [Fact]
        public async Task CreateTask_PositveCase()
        {
            // Arrange
            var newTask = new TaskItem { Title = "Test" };
            var createdTask = new TaskItem { Id = 1, Title = "Test", IsCompleted = false };
            
            var svcMock = new Mock<ITaskService>();
            svcMock.Setup(s => s.CreateAsync(newTask))
                   .ReturnsAsync(createdTask);

            var controller = new TaskController(svcMock.Object);

            // Act
            var actionResult = await controller.Create(newTask);
            
            // Assert
            var Result = actionResult.Result as CreatedAtActionResult;
            Result.Should().NotBeNull();
            Result.StatusCode.Should().Be(201);
            Result.RouteValues.Should().ContainKey("id").And.ContainValue(createdTask.Id);

            var returned = Result.Value as TaskItem;
            returned.Should().BeEquivalentTo(createdTask);
        }

        [Fact]
        public async Task ToggleTask_PositveCase()
        {
            // Arrange
            var taskId = 1;
            var svcMock = new Mock<ITaskService>();
            svcMock.Setup(s => s.ToggleAsync(taskId))
                   .Returns(Task.CompletedTask);

            var controller = new TaskController(svcMock.Object);

            // Act
            var actionResult = await controller.Toggle(taskId);

            // Assert
            actionResult.Should().BeOfType<NoContentResult>();
        }

        [Fact]
        public async Task ToggleTask_NegativeCase()
        {
            // Arrange
            var taskId = 1;
            var svcMock = new Mock<ITaskService>();
            svcMock.Setup(s => s.ToggleAsync(taskId))
                   .ThrowsAsync(new KeyNotFoundException());

            var controller = new TaskController(svcMock.Object);

            // Act
            var actionResult = await controller.Toggle(taskId);

            // Assert
            actionResult.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async Task DeleteTask_PositveCase()
        {
            // Arrange
            var taskId = 1;
            var svcMock = new Mock<ITaskService>();
            svcMock.Setup(s => s.DeleteAsync(taskId))
                   .Returns(Task.CompletedTask);

            var controller = new TaskController(svcMock.Object);

            // Act
            var actionResult = await controller.Delete(taskId);

            // Assert
            actionResult.Should().BeOfType<NoContentResult>();
        }

        [Fact]
        public async Task DeleteTask_NegativeCase()
        {
            // Arrange
            var taskId = 1;
            var svcMock = new Mock<ITaskService>();
            svcMock.Setup(s => s.DeleteAsync(taskId))
                   .ThrowsAsync(new KeyNotFoundException());

            var controller = new TaskController(svcMock.Object);

            // Act
            var actionResult = await controller.Delete(taskId);

            // Assert
            actionResult.Should().BeOfType<NotFoundResult>();
        }
    }
}
