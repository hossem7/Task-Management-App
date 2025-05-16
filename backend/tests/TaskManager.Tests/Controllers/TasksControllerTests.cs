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
        public async Task GetAllTasks_WhenCalled_ReturnsOkWithTasks()
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
    }
}
