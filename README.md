# Task Management App

## Overview
A full‑stack MVC task management application built with ASP .NET Core (backend) with EF Core SQLite and React + TypeScript (frontend).

### Backend
There are 4 endpoints (GET - get all tasks, PUT - create a new task, PATCH - toggle the completion status, DELETE - remove a task). I am using a 3 tier architecture (Presentation Layer - API, Application Layer - Services and Infrastructure Layer - SQLite DB). Controllers map HTTP to service calls, Services contain business logic, and EF Core handles persistence. I keep all my migrations under Migrations/ and apply them automatically at startup in dev. Unit tests are contained under the tests folder. I expose all my endpoints via Swagger for easy manual QA.

### Frontend
I am using component based design for my frontend. The UI has two pages: Landing Page and Tasks Page. In the Tasks Page, I seperated the view into two pieces through a view toggle: List View and Board View. In List View, I am showing all the the tasks in 1 list ordered by uncompleted tasks (oldest first) followed by completed tasks. In Board View, I designed a Kanban style board that allows user to drag the task from the to do section to the completed section. In both views, user's action would trigger an API call (ie. fetching all the tasks, changing the completion status using the toggle and adding a new task or deleting a task). 

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
