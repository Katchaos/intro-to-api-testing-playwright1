export class LoginDto {
  username: string | undefined
  password: string | undefined

  constructor(username: string | undefined, password: string | undefined) {
    this.username = username
    this.password = password
  }

  static createLoginDto() {
    return new LoginDto(
      process.env.USER || '',
      process.env.PASSWORD || '',)
  }
}
