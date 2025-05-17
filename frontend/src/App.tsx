// import { TestAPIButtons } from "./components/TestApiWithButtons"
import { useTasks } from "./context/TasksContext";
import { TasksPage } from "./pages/TasksPage";

function App() {
  const {
    tasks,
    loading,
    error,
    addTask,
    toggleCompletion,
    removeTask,
  } = useTasks();

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error.message}</p>;

  return (
    <div>
      

      <div>
        <TasksPage />
      </div>
    </div>
  );
}

export default App
