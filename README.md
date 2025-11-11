# Todo App

A simple full-stack todo application built with React (Vite) and Node.js Express, using file-based storage.

## Features

- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Data persisted in JSON file (no database required)

## Project Structure

```
ansh-full-stack/
├── backend/
│   ├── server.js          # Express server (ES modules)
│   ├── package.json       # Backend dependencies
│   └── todos.json         # Data storage file (created automatically)
└── frontend/
    ├── index.html
    ├── vite.config.js     # Vite configuration with proxy
    ├── package.json       # Frontend dependencies
    └── src/
        ├── App.jsx        # Main React component
        ├── App.css        # Styles
        ├── main.jsx       # React entry point
        └── index.css      # Global styles
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   (or `pnpm install` if you're using pnpm)

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (or another port if 5173 is taken)

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Data Storage

Todos are stored in `backend/todos.json` file. The file is created automatically when the first todo is added.

## Notes

- The backend uses ES modules (type: "module" in package.json)
- The frontend uses Vite for fast development and building
- CORS is enabled on the backend to allow frontend requests
- Vite proxy is configured to forward `/api` requests to the backend

