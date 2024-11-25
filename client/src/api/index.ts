import { getWsApiUrl } from "./config"

const wsApiUrl = getWsApiUrl()
const socket = new WebSocket(wsApiUrl)

const connect = (cb: (msg: string) => void) => {
  console.log("Attempting Connection...")

  socket.onopen = () => {
    console.log("Successfully connected")
  }

  socket.onmessage = (msg) => {
    cb(msg.data)
  }

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event)
  }

  socket.onerror = (error) => {
    console.log("Socket Error: ", error)
  }
}

const sendMsg = (msg: string) => {
  socket.send(msg)
}

export { connect, sendMsg }
