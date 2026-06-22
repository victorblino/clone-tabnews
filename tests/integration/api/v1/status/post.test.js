const { default: orchestrator } = require("tests/orchestrator");

beforeAll(orchestrator.waitForAllServices);

describe("POST to /api/v1/status", () => {
  describe("Anonymous User", () => {
    test("POST to /api/v1/status should return 200", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowed",
        message: "Método não permitido para esse endpoint.",
        action: "Verifique se o método HTTP é válido para esse endpoint.",
        status_code: 405,
      });
    });
  });
});
