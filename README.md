# Welcome to Pong Game Web App Project

Pong Game project is a web application for playing real-time multiplayer ping-pong, chatting, and having fun with friends.

## Project Link

To explore the full experience, we invite you to visit our website through the application link: [Pong Game Web App](https://pingpongpro.me)

## Key Features (Functionalities)

Here are the key functionalities of the project:

- User Authentication (OAuth with Google + Two-Factor Authentication (2FA))
- Real-time multiplayer ping-pong game
- Chat system
- User profile
- Match history

## Technologies

This app is built using a modern tech stack including:

- Programming Language: TypeScript
- Front-End Development: React | React Router | Tailwind CSS | Socket.IO
- Back-End Development: NestJS | PostgreSQL | Prisma
- Tools: Nginx | Docker | Docker Compose | Git

## Running the Project Locally

The development environment is built using Docker Compose, consisting of three containers: one for the front-end, one for the back-end, and another for the PostgreSQL database. To run the application locally, you need **Docker** and **Docker Compose** installed on your machine.

We are using:

- Docker version 20.10.20
- Docker Compose version v2.12.1

Follow these steps to get a local copy up and running:

1. Clone the project:

   `git clone https://github.com/hnaji-el/pong-game`

2. Rename the .env files by removing the ".example" suffix and set the required environment variables based on your setup. There are three .env files: one in the project root, one in the frontend folder, and another in the backend folder. Let's take the .env.example file in the project root as an example. This file contains the environment variables for the PostgreSQL database. First, rename it by removing the ".example" suffix, then set the environment variables to match your database credentials.

3. Run the application

   `docker compose up --build`

## Contributing

Contributions are welcome! If you'd like to improve the Pong Game Platform, feel free to fork the repository, make changes, and submit a pull request. Please ensure your changes are tested before submitting. We appreciate your input in making this project better!
