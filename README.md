
This is the backend API for a simple Task Management Application.  
Built with **Node.js**, **Express**, and **PostgresSQL** . It supports user authentication and task management for individual users.

---

## **Features**

- User Registration and Login (JWT authentication)  
- CRUD operations for tasks:
  - Create task
  - List user tasks
  - Update task status
  - Delete task
- Each task includes:
  - `title` (required)
  - `description` (optional)
  - `status` (`Pending`, `In Progress`, `Done`)
  - `createdAt`
  -  `updatedAt`
  -  `isArchived`
- Users can only access their own tasks  
- Pagination supported 

---

## **Tech Stack**

- Node.js  
- Express.js  
- Sequelize ORM  
- SQLite / MySQL / PostgreSQL  
- JWT for authentication

---

1. Install dependencies
npm install

2.Run database migrations
npx sequelize-cli db:migrate

3.Start the server
npm run dev



