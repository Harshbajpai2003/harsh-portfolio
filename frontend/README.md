# Harsh Bajpai — Portfolio

Full-stack portfolio website built with React (Vite) and Spring Boot.

## Live Site
- Frontend: https://harsh-portfolio-eta-one.vercel.app
- Backend API: https://harsh-portfolio-production-de81.up.railway.app/api

## Tech Stack
**Frontend:** React 19, Vite, Tailwind CSS v4, React Router, Axios, Framer Motion, React Hook Form
**Backend:** Java 21, Spring Boot 3.5, Spring Security, Spring Data JPA, MySQL, JWT
**DevOps:** Docker, Docker Compose, Railway, Vercel

## Features
- Public pages: Home, About, Skills, Projects, Experience, Certifications, Blog, Contact
- Admin dashboard with JWT authentication
- Full CRUD for projects, skills, certificates, experiences, blog posts
- Contact form with message management

## Running Locally
Backend: `cd backend && ./mvnw spring-boot:run`
Frontend: `cd frontend && npm install && npm run dev`
Or full stack: `docker compose up --build`