const dotenv  = require("dotenv")
dotenv.config();

const devEnv = {
  synchronize: true,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/subscriber"
  },
  name: "default",
  type: "postgres",
  port: 5432,
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB 
}

const testEnv = {
  type: 'sqlite',
  database: ':memory:',
  entities: ['./src/entities/**/*.ts'],
  synchronize: true,
}

let exportModule = devEnv

if (process.env.NODE_ENV === "test"){
  exportModule = testEnv
}

module.exports = exportModule