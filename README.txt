# 🛫 Trip Nest - Backend Server

The **Trip Nest Backend** is the server-side application for the Trip Nest travel package booking platform. It powers all the core functionalities by exposing RESTful API endpoints for packages, bookings, and user data. Built with **Node.js**, **Express**, and **MongoDB**, it ensures efficient data management and smooth communication with the front-end client.

---

## 🌐 Live Server URL

🔗 [Backend API Base URL](https://b11a11-server-side-ashahab007.vercel.app/)  
_Replace with your actual deployed backend link (e.g., Render, Railway, etc.)_

---

## 🎯 Project Purpose

The purpose of this backend is to handle:

- Travel package data management
- Booking operations for authenticated users
- Secure communication with the frontend via REST APIs
- MongoDB-based persistent storage for all data

This ensures the frontend can deliver a smooth experience to travelers while the server takes care of all the heavy lifting in the background.

---

## ✨ Key Features

- 📦 CRUD operations on travel packages
- 🧾 Manage user bookings with email-based filtering
- 🔐 Environment-based config using `.env`
- ⚙️ Middleware-powered route and request handling
- 🌍 CORS support for secure frontend/backend communication
- ⚡ Lightweight, fast, and scalable setup

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend framework for building APIs
- **MongoDB** – NoSQL database for storing packages & bookings
- **dotenv** – Secure environment variable management
- **CORS** – Cross-Origin Resource Sharing configuration

---

## 📦 NPM Packages Used

| Package      | Purpose                                        |
|--------------|------------------------------------------------|
| `express`    | To build RESTful APIs                         |
| `mongodb`    | Native MongoDB driver for database operations |
| `dotenv`     | To load environment variables securely        |
| `cors`       | To handle cross-origin requests               |

---

## 🧪 Available Scripts

| Command         | Description                        |
|----------------|------------------------------------|
| `npm start`     | Starts the server (on default port) |
| `npm test`      | Placeholder for future tests        |

---

## API Endpoints


| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | `/packages`        | Get all travel packages       |
| GET    | `/packages/:id`    | Get package by ID             |
| POST   | `/bookings`        | Create a new booking          |
| GET    | `/bookings/:email` | Get bookings for a user email |
| DELETE | `/bookings/:id`    | Delete a booking              |


🧑‍💻 Author
Developed by Ammar Shahab

📝 License
This project is licensed under the ISC License.

