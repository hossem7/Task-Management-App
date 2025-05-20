# Task Management App

## Overview
A full‑stack MVC task management application built with ASP .NET Core (backend) with EF Core SQLite and React + TypeScript (frontend).

### Backend
I use ASP.NET Core Web API with EF Core and SQLite in a clean 3‑tier setup:

- Presentation Layer (Controllers/): I map HTTP to service calls in [ApiController] classes, keeping routing and status‑code logic here.
- Application Layer (Services/ with ITaskService/TaskService): I encapsulate all business logic-creating, toggling, deleting and querying tasks behind a simple service interface.
- Infrastructure Layer (Data/TaskDbContext & Migrations/): I handle persistence with SQLite in dev and version my schema in src/TaskManager.Api/Migrations.

Endpoints:

- GET /tasks — retrieve all tasks
- POST /tasks — create a new task
- PATCH /tasks/{id}/toggle — flip a task’s completion status
- DELETE /tasks/{id} — remove a task

I keep EF Core migrations in backend/src/TaskManager.Api/Migrations/ and configure the app to apply them automatically on startup (or run dotnet ef database update if preferred). I expose all my endpoints via Swagger for easy manual QA. All my xUnit + Moq tests live under tests/TaskManager.Tests.

### Frontend
I used a component‑based design powered by Vite, React 18, TypeScript and Ant Design (https://ant.design/components/overview/). My code lives under src/ in a feature‑based layout:

- components/ for reusable UI pieces
- pages/ for route‑level views (Landing, Tasks)
- hooks/ for custom hooks (e.g. useTasks)
- api/ for API clients (axios wrappers)
- context/ for global state providers
- utils/ for shared helpers (e.g. toast messages)

The UI has two pages:
- Landing Page (a welcome screen with a quick link to Tasks)
- Tasks Page, where I separated the view into List View and Board View via a toggle.
- List View shows all tasks in one list ordered by uncompleted first (oldest to newest) then completed.
- Board View is a Kanban‑style board implemented with react-beautiful-dnd so users can drag tasks from “To Do” to “Completed.”

In both views, user actions trigger API calls (fetch all tasks, toggle completion, add a task and delete a task). I created a centralized TasksContext plus a useTasks() hook so components share state and avoid duplicate fetches. For styling, I leverage Ant Design components and customize them with the styled-components library for my own layout tweaks. Finally, I chose Vitest (Jest‑like syntax) for unit tests because it integrates natively with Vite and has much faster startup times than Jest.

### Assumptions
- Simple file‑based DB (tasks.db) covers early prototyping without spinning up SQL Server or Postgres
- For a project of this scale, one‑project solution (API, data, migrations all together) is simpler than fully splitting into Domain/Application/Infrastructure assemblies
- Controller‑based API: Choosing explicit [ApiController] classes over Minimal APIs for clearer routing and status‑code handling.
- Single Page Application (SPA-only view): Skipping server‑rendered pages and relying entirely on a React + Vite single‑page app for the UI
- Dual-layout design: Offering both list and Kanban-style board views to match common task‑management workflows (similar to Jira) and give users flexibility.

### Trade-Offs
- SQLite vs SQL Server/Postgres: + No dev setup; – Limited to single‑user file locking and switching to SQL Server/Postgres will require connection‐string and EF migrations tweaking.
- EF Core vs Raw SQL: + Fast development and type safety; – Less control over query performance and complex joins.
- One project vs Clean Architecture: + Easier to browse; – Weaker module boundaries if the codebase grows large.
- Ant Design vs Custom CSS: + Ready‑made, accessible/responsive components; – Larger bundle and reliance on Ant Design’s theming system.
- Vitest vs Jest: + Native Vite integration and lightning‑fast startup; – Jest needed extra ESM/Babel config and had slower boot times under Vite. 

Follow the steps below to get it running:

## Backend Setup

### Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/download) (or whichever version you target)  
- EF Core CLI for migrations/creating local db:  
  ```bash
  dotnet tool install --global dotnet-ef
  ```

1. Clone & Restore
```bash
git clone https://github.com/your-org/TaskManagementApp.git
cd TaskManagementApp
dotnet restore
```
2. Create/Update Local DB
```bash
cd backend/src/TaskManager.Api
dotnet ef database update
```
2. Build & Run (Go back to root directory)
```bash
cd TaskManagementApp
dotnet build
```

## Launch the API

Run the App through Visual Studio's Run Button (CTRL + F5)

![image](https://github.com/user-attachments/assets/63f708ec-1d8d-48d9-b3fa-c053d4f68dc0)

By default the API will:

Host at https://localhost:7025  (Note: This approach also includes the SSL Certificate)

Expose Swagger UI at https://localhost:7025/swagger/index.html

![image](https://github.com/user-attachments/assets/97d2de14-9839-4e6b-b73f-8f411f5775af)


## Frontend Setup

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- create a .env.local file on the /frontend foler and add this line
  ```bash
  VITE_API_URL=https://localhost:7025/api/
  ```

1. Install & Start
```bash
cd frontend
npm install
npm run dev
```
Launch the React dev server at http://localhost:5173

Automatically open your default browser

2. Frontend UI Preview


Landing Page:
![image](https://github.com/user-attachments/assets/91d71d6b-d86e-4f7d-a7e1-5116478ac7cd)



ListView:
![image](https://github.com/user-attachments/assets/54c4eb8e-0b79-4da6-9a5b-31b15c65e0f0)




BoardView:
![image](https://github.com/user-attachments/assets/fc314640-bcd9-414f-b446-397dcfcbd67a)




## Running Tests

### Backend Tests

In Visual Studio, you can use test explorer to run the tests, or if you want to run it through terminal:

```bash
dotnet test tests/TaskManager.Tests/TaskManager.Tests.csproj
```
### Frontend Tests

This project uses Vitest (similar to Jest). To run do this:

```bash
cd frontend
npm test
```

## Additional Notes
Database: Uses SQLite in development (tasks.db in the backend/src/TaskManager.Api folder). You can use something simple like SQLite DB Browser - https://sqlitebrowser.org/ to view the database
