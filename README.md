# NestJS Project with Node.js and SQL

This project is built using [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications. It utilizes SQL as its database, providing robust data storage and retrieval capabilities.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v20.11.0)
- npm (v10.2.4)
- A SQL database - MySQL
- Git (for cloning the repository)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/kumaraguru16/eg-backend.git
cd eg-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure your environment**

   Create a .env file in root folder.

   Example for environment file.

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=12345678
DB_DATABASE=magazine
JWT_SECRET_KEY=71a817a9-13c6-4a71-91d7-6ef2ad3631a3
JWT_EXPIRATION_TIME=1d
```

4. **Database setup**

   Ensure your SQL database is running and accessible with below configuration.

```bash
MYSQL download from below link - https://www.mysql.com/downloads/
```

```bash
Workbench download from below link: - https://dev.mysql.com/downloads/workbench/
```

```bash
Host Name  = localhost
Port = 3306
Username = root
Password = 12345678
Database Name = magazine
```

### Running the Application

- **Development mode**

```bash
npm run start:dev
```

- **Production mode**

```bash
npm run start:prod
```

This will start the application on `http://localhost:3000` by default. You can access the API endpoints as defined in your project's controllers.

## API Documentation

Swagger UI:

Navigate to http://localhost:3000/api to view the API documentation.

## Built With

- [NestJS](https://nestjs.com/) - The framework used
- [Node.js](https://nodejs.org/) - The runtime environment
- SQL Database (e.g., PostgreSQL, MySQL) - Data persistence

## Authors

- **Kumaraguru** - [kumaraguru16](https://github.com/kumaraguru16)

## License

This project is licensed under the MIT License.
