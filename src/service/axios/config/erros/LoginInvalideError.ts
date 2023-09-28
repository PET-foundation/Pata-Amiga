class LoginInvalidError extends Error {
    public readonly message: string = '';
  
    constructor(msg: string) {
      super();
      this.message = msg;
    }
  }
  
  export default LoginInvalidError;