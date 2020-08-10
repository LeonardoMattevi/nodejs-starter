const { validateCreateUser } = require("../store/validators");

describe("Validators Joy", () => {
  it("Validate User", () => {
    expect(!!validateCreateUser({
        firstName: '',
        lastName: 'test',
        email: 'test@test.it',
        isActive: true
    }).error).toBe(true);
    
    expect(!!validateCreateUser({
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.it',
        isActive: true
    }).error).toBe(false);
  });
});

    
  
   
  