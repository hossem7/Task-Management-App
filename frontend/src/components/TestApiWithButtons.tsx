import { CreateTask, DeleteTask, GetTasks, UpdateCompletionStatus } from '../api/TaskController';

export function TestAPIButtons() {
  return (
    <div>
      <button onClick={() => GetTasks().then(console.log)}>GetTasks</button>
      <button onClick={() => CreateTask('Buy Groceries').then(task => console.log(task.Title, 'created at', task.CreatedAt))}>CreateTask</button>
      <button onClick={() => UpdateCompletionStatus(2, { isCompleted: true }).then(console.log)}>
        Toggle Complete
      </button>
      <button onClick={() => DeleteTask(2).then(() => console.log('Deleted id=2'))}>
        DeleteTask
      </button>
    </div>
  );
}