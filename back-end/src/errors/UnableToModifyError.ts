export class UnableToModifyError extends Error {
  constructor(message?: string) {
    super(message || "Unable to modify resource.");
  }
}
