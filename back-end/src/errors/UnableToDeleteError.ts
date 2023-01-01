export class UnableToDeleteError extends Error {
  constructor(message?: string) {
    super(message || "Unable to delete resource.");
  }
}
