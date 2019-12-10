const { validateUser } = require("../store/validators");

describe("Validators Joy", () => {
  it("Validate User", () => {
    expect(!!validateUser({
        firstName: '',
        lastName: 'test',
        email: 'test@test.it',
        isActive: true
    }).error).toBe(true);
    
    expect(!!validateUser({
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.it',
        isActive: true
    }).error).toBe(false);
  });
});

    
  
   
  