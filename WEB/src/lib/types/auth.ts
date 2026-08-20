export type LoginDto = {
  Email: string,
  Password: string,
  IsPersistence: boolean
}
export type RegisterDto = {
  FirstName: string,
  LastName: string,
  Email: string,
  Password: string,
}
export type ResetPasswordDto = {
  email: string,
  code: string,
  newPassword: string,
}