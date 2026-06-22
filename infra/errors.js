export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro inesperado aconteceu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = 500;
  }

  toJson() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowed extends Error {
  constructor() {
    super("Método não permitido para esse endpoint.");
    this.name = "MethodNotAllowed";
    this.action = "Verifique se o método HTTP é válido para esse endpoint.";
    this.statusCode = 405;
  }

  toJson() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
