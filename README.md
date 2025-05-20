# Task Management App

A full‑stack task management application built with ASP .NET Core (backend) with EF Core SQLite and React + TypeScript (frontend).  

Follow the steps below to get it running:

## 📦 Backend Setup

### Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/download) (or whichever version you target)  
- (Optional) EF Core CLI for migrations:  
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

# Launch the API (Option 1)

Run the App through Visual Studio's Run Button (CTRL + F5)

![image](https://github.com/user-attachments/assets/63f708ec-1d8d-48d9-b3fa-c053d4f68dc0)

By default the API will:

Host at https://localhost:7025

Expose Swagger UI at https://localhost:7025/swagger/index.html

![image](https://github.com/user-attachments/assets/97d2de14-9839-4e6b-b73f-8f411f5775af)


## 🚀 Frontend Setup

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

1. Install & Start
```bash
cd frontend
npm install
npm run dev
```
Launch the React dev server at http://localhost:5173

Automatically open your default browser

2. Frontend UI Preview


## 🧪 Running Tests

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

📝 Additional Notes
Database: Uses SQLite in development (tasks.db in the backend folder).
