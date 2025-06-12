# EasyToGet

A web application that provides a directory of official download links for various software and operating systems.

## Features

- Browse software downloads by categories
- Search for specific software
- View official download links with thumbnails
- Clean and responsive UI

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: React
- **Database**: SQLite
- **API**: RESTful endpoints

## Project Structure

- `/backend-python`: Flask backend API
- `/EasyToGet`: React frontend application

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend-python
   ```

2. Install dependencies:
   ```
   pip install flask flask-cors flask-sqlalchemy
   ```

3. Run the backend server:
   ```
   python app.py
   ```
   The server will run on port 5001 by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd EasyToGet
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm start
   ```
   The frontend will run on port 3000 by default.

## API Endpoints

- `GET /content` - Returns all website content (paginated)
- `GET /content/all` - Returns all content without pagination
- `GET /search?q=your_query` - Returns search results matching the query
- `GET /content/category/category_name` - Returns content for a specific category
- `GET /api-docs/json` - Returns API documentation in JSON format
- `GET /health` - Returns API health status

## License

MIT# EasyToGet
