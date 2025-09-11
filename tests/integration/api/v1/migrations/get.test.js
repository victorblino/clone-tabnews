import orchestrator from "tests/orchestrator";
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });

async function cleanDatabase() {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
}

beforeAll(cleanDatabase);

describe("GET to /api/v1/migrations", () => {
  describe("Anonymous User", () => {
    test("Running pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
