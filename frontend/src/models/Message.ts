export default class Message {
  type: number
  message: string
  username: string

  constructor(type: number, message: string, username: string) {
    this.type = type
    this.message = message
    this.username = username
  }
}
