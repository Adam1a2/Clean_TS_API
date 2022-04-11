export class UnauthorizedError extends Error {
  constructor (stack?: string) {
    super('Unauthorized server error')
    this.name = 'UnauthorizedError'
  }
}
