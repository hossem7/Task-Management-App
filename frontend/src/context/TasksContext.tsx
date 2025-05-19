import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import {
    CreateTask,
    DeleteTask,
    type Task,
    GetTasks,
    UpdateCompletionStatus,
} from "../api/TaskController";
import { showNotification } from "../utils/Notification";

type TasksContextType = {
    tasks: Task[];
    loading: boolean;
    error: Error | null;
    fetchTasks: () => Promise<void>;
    addTask: (title: string) => Promise<void>;
    toggleCompletion: (id: number) => Promise<void>;
    removeTask: (id: number) => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchTasks = async () => {
        setLoading(true);

        try {
            const data = await GetTasks();
            setTasks(data);
            showNotification('Tasks loaded successfully', 'success');
        } catch (e) {
            setError(e as Error);
            showNotification(`Failed to load tasks`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (title: string) => {
        setLoading(true);

        try {
            const newTask = await CreateTask(title);
            setTasks((prev) => [newTask, ...prev]);
            showNotification('Added a task successfully', 'success');
        } catch (e) {
            setError(e as Error);
            showNotification(`Failed to create a task`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const toggleCompletion = async (id: number) => {
        setLoading(true);
        try {
            const updated = await UpdateCompletionStatus(id);
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
            showNotification('Changed the completion status of the task successfully', 'success');
        } catch (e) {
            setError(e as Error);
            showNotification(`Failed to change the completion status of the task`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const removeTask = async (id: number) => {
        setLoading(true);
        try {
            await DeleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
            showNotification('Deleted a task successfully', 'success');
        } catch (e) {
            setError(e as Error);
            showNotification(`Failed to delete a task`, 'error');
        } finally {
            setLoading(false);
        }
    };

    // fetch on provider mount
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TasksContext.Provider
            value={{
                tasks,
                loading,
                error,
                fetchTasks,
                addTask,
                toggleCompletion,
                removeTask,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = (): TasksContextType => {
    const context = useContext(TasksContext);
    if (!context)
        throw new Error("useTasks should be used within a TasksProvider");
    return context;
};
