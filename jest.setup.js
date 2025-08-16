const { default: orchestrator } = require("tests/orchestrator")

beforeAll(() => {
  orchestrator.waitForAllServices();
})