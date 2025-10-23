# 📚 Lesson Management System

A full-stack web application for managing lessons, built with Vue.js frontend and Node.js/Express.js backend, storing data in MongoDB Atlas.

## 🏗️ Architecture

- **Frontend**: Vue.js 3 (CDN) with Bootstrap 5 for styling
- **Backend**: Node.js with Express.js REST API
- **Database**: MongoDB Atlas with native MongoDB driver
- **Data Communication**: Native Fetch API with Promises

## 📋 Requirements Compliance

This application strictly adheres to the specified requirements:

### ✅ Frontend Requirements
- **Vue.js Framework**: Using Vue.js 3 exclusively
- **No Duplicate Libraries**: Only Bootstrap for styling (doesn't replace Vue.js features)
- **Native Fetch API**: All API calls use `fetch()` with promises (no axios or XMLHttpRequest)

### ✅ Backend Requirements
- **Node.js**: Express.js server running on Node.js
- **Express.js REST API**: Complete RESTful API implementation
- **MongoDB Atlas**: Cloud database storage
- **Native MongoDB Driver**: Using official `mongodb` package (no Mongoose)

### ✅ Deployment Requirements
- **Allowed Hosting**: Ready for AWS or render.com deployment
- **No Prohibited Services**: No AWS S3, EC2, Heroku, or local MongoDB

## 🚀 Features

- **Lesson Management**: Browse, search, and sort available lessons
- **Shopping Cart**: Add/remove lessons with real-time availability updates
- **Order Processing**: Complete checkout with customer information
- **Order History**: View all placed orders
- **Responsive Design**: Mobile-friendly Bootstrap interface

## 📁 Project Structure

```
Francis_FullStack/
├── express.app/          # Backend Node.js/Express.js
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment variables template
├── vue.js/               # Frontend Vue.js
│   ├── index.html        # Main HTML file
│   ├── app.js           # Vue.js application
│   ├── styles.css       # Custom styles
│   └── package.json     # Frontend dependencies
└── README.md            # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd express.app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lessondb
   PORT=3000
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd vue.js
   ```

2. **Start the frontend server:**
   ```bash
   npm start
   ```
   
   This will serve the application on `http://localhost:8080`

3. **Update API URL:**
   In `app.js`, update the `apiBaseUrl` to point to your deployed backend

## 🌐 API Endpoints

### Lessons
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/lessons` - Create new lesson
- `PUT /api/lessons/:id/availability` - Update lesson availability

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order

## 🚀 Deployment

### Backend Deployment (render.com or AWS)
1. Create a new Web Service
2. Connect your repository
3. Set build command: `cd express.app && npm install`
4. Set start command: `cd express.app && npm start`
5. Add `MONGODB_URI` environment variable

### Frontend Deployment
1. Create a Static Site service
2. Set publish directory to `vue.js`
3. Update API URL in `app.js` to point to deployed backend

## 🔧 Development Notes

- The application uses Vue.js 3 CDN (no build process required)
- Bootstrap 5 provides responsive styling
- Native MongoDB driver (no Mongoose)
- Fetch API with promises for all HTTP requests
- CORS enabled for cross-origin requests
