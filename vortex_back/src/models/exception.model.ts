export class VortexException extends Error {
  type: string;

  constructor(type: string) {
    super();
    this.type = type;
  }
}
