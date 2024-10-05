import database from "infra/database";
const dotenv = require("dotenv")

dotenv.config({path: '.env.development'})

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;")
}

beforeAll(cleanDatabase)

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  const responseBody = await response.json()

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
