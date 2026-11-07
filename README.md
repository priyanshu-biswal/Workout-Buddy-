# Workout Budyyy

A workout tracker with a React frontend and an Express API backed by MongoDB.

## Requirements

- Node.js 18 or newer (npm is included)
- MongoDB, either running locally or available through MongoDB Atlas

## Setup

From the project root, install all workspace dependencies:

```powershell
npm.cmd install
```

If you do not already have `backend\.env`, create it from the example:

```powershell
if (-not (Test-Path backend\.env)) { Copy-Item backend\.env.example backend\.env }
```

Edit `backend\.env` and set `MONGO_URI` to your MongoDB connection string. The example uses a local MongoDB database; set `PORT` to `4000` unless you also update the frontend proxy in `frontend\package.json`.

## Run in development

From the project root, start both the API and frontend:

```powershell
npm.cmd run dev
```

The React app runs at <http://localhost:3000> and proxies `/api` requests to the backend at <http://localhost:4000>.

You can also run each workspace separately:

```powershell
npm.cmd run dev --workspace=backend
npm.cmd start --workspace=frontend
```

## Production build

Build the frontend assets with:

```powershell
npm.cmd run build
```

Start the API with:

```powershell
npm.cmd run start:backend
```

The backend exposes `GET`, `POST`, and `DELETE` endpoints under `/api/workouts`. The frontend build is not served by the API; deploy the generated `frontend\build` directory to a static host and configure it to proxy `/api` to the backend.
