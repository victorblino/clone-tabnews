import database from "infra/database";
import orchestrator from "tests/orchestrator";
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });

async function cleanDatabase() {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDatabase);

describe("POST to /api/v1/migrations", () => {
  describe("Anonymous User", () => {
    test("should return 200", async () => {
      const firstResponse = await fetch(
        "http://localhost:3000/api/v1/migrations",
        {
          method: "POST",
        },
      );
      expect(firstResponse.status).toBe(201);
    });
  });
});

test("POST to /api/v1/migrations should return 200", async () => {
  const firstResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const firstResponseBody = await firstResponse.json();

  expect(Array.isArray(firstResponseBody)).toBe(true);
});
