export class PayloadValidationError extends Error {
  constructor(message?: string) {
    super(message || "Invalid payload");
  }
}
