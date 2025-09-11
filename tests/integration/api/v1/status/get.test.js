const { default: orchestrator } = require("tests/orchestrator");

beforeAll(orchestrator.waitForAllServices());

describe("GET to /api/v1/status", () => {
  describe("Anonymous User", () => {
    test("GET to /api/v1/status should return 200", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
      expect(responseBody.update_at).toEqual(parsedUpdatedAt);

      expect(responseBody.dependecies.database.postgres_version).toEqual(
        "16.9",
      );

      expect(responseBody.dependecies.database.max_connections).toEqual(100);

      expect(
        responseBody.dependecies.database.opened_connections,
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
