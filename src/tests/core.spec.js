const { checkEmail } = require("../core/users");

describe("Core users functions validators", () => {
    it("Check email function", () => {
      expect(checkEmail("leonardo.mattevi@email.it")).toBe(true);
      expect(checkEmail("leonardo.mattevi@email")).toBe(false);
      expect(checkEmail("leonardo.matteviemail.it")).toBe(false);
    });
  });
  