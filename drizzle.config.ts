import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/server/database/schema.ts',
  out: './src/server/database/migrations',
  dbCredentials: {
    host: '127.0.0.1',
    port: 5432,
    user: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
    ssl: false,
  },
})
