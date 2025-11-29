# React + Express + PostgreSQL Starter (Sin JWT)

## Estructura
- backend/: Express + Node.js
- frontend/: React (create-react-app structure simplified)
- docker-compose.yml: PostgreSQL + pgAdmin + backend + frontend (dev)

## Pasos (desarrollo local)

### Backend
1. Ir a `backend/`
2. Copiar `.env.example` a `.env` y ajustar credenciales.
3. Instalar dependencias:
   ```
   npm install
   ```
4. Crear tabla `users` en PostgreSQL:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100)
   );
   INSERT INTO users(name) VALUES ('Juan'), ('María');
   ```
5. Iniciar servidor:
   ```
   npm run dev
   ```
   (o `npm start`)

### Frontend
1. Ir a `frontend/`
2. Instalar dependencias:
   ```
   npm install
   ```
3. Iniciar:
   ```
   npm start
   ```
4. Abrir `http://localhost:3000` (React) y deberías ver la lista de usuarios.

### Docker (opcional)
Puedes usar `docker-compose.yml` incluido para levantar Postgres y pgAdmin. Revisa y ajusta variables antes de usar.

