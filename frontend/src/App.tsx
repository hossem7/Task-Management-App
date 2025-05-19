import { useState } from "react";
import { TasksPage } from "./pages/TasksPage";
import { LandingPage } from "./pages/LandingPage";

function App() {
    const [showLanding, setShowLanding] = useState(true);

    if (showLanding) {
        return <LandingPage viewTasks={() => setShowLanding(false)} />;
    }

    return <TasksPage />;
}

export default App;
