import database from "infra/database";
const dotenv = require("dotenv")

dotenv.config({path: '.env.development'})

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;")
}

beforeAll(cleanDatabase)

test("POST to /api/v1/migrations should return 200", async () => {
  const firstResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const firstResponseBody = await firstResponse.json();

  expect(Array.isArray(firstResponseBody)).toBe(true);

  const secondResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const secondResponseBody = await secondResponse.json();

}); 
