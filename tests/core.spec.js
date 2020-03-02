const coreUsers = require("../core/users");

describe("Core users functions validators", () => {
    it("Check email function", () => {
      expect(coreUsers.checkEmail("leonardo.mattevi@email.it")).toBe(true);
      expect(coreUsers.checkEmail("leonardo.mattevi@email")).toBe(false);
      expect(coreUsers.checkEmail("leonardo.matteviemail.it")).toBe(false);
    });
  });
  