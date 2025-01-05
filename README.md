# sysEye

This project is a full-stack application consisting of:

- **Backend**: Laravel with MongoDB
- **Frontend**: Next.js
- **Database**: MongoDB
Docker Compose is used to orchestrate the services and run the application locally.

---
## Setup

1. **Clone the Repository**

   First, clone the repository to your local machine:
   ```bash
   git clone https://github.com/OussamaDarrazi/sysEye
   cd sysEye
   ```
2. **Build and Run the Docker Containers**
   ```bash
   docker-compose up --build
   ```
  After running this command, Docker will start all the containers in the background.

---
## Services
Once the containers are up, you can access each service via the following URLs:

### Backend (Laravel API)
URL: http://localhost:8000
### Frontend (Next.js)
URL: http://localhost:3000
### MongoDB (Database)
URL: db:27017
Username: root
Password: root
