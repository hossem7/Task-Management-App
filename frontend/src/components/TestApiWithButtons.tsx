import {
    CreateTask,
    DeleteTask,
    GetTasks,
    UpdateCompletionStatus,
} from "../api/TaskController";

export function TestAPIButtons() {
    return (
        <div>
            <button onClick={() => GetTasks().then(console.log)}>
                GetTasks
            </button>
            <button
                onClick={() =>
                    CreateTask("Buy Groceries").then((task) =>
                        console.log(task.Title, "created at", task.CreatedAt)
                    )
                }
            >
                CreateTask
            </button>
            <button
                onClick={() =>
                    UpdateCompletionStatus(3).then(console.log)
                }
            >
                Toggle Complete
            </button>
            <button
                onClick={() =>
                    DeleteTask(4).then(() => console.log("Deleted id=2"))
                }
            >
                DeleteTask
            </button>
        </div>
    );
}
