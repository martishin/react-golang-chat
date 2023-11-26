import { ReactNode, useEffect, useState } from "react"

import { connect, sendMsg } from "./api"
import ChatHistory from "./components/ChatHistory"
import Header from "./components/Header"
import Input from "./components/Input"

function App(): ReactNode {
  const [chatHistory, setChatHistory] = useState<string[]>([])
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    connect((msg: string) => {
      console.log("Got message: ", msg)
      setChatHistory((prevState) => [...prevState, msg])
    })
  }, [chatHistory])

  const send = () => {
    if (message.trim() === "") {
      return
    }

    console.log("Sending msg: ", message)
    sendMsg(message)
    setMessage("")
  }

  return (
    <div className="relative mx-auto mt-8 h-[80vh] max-w-2xl rounded-lg border border-gray-300">
      <Header />
      <ChatHistory messages={chatHistory} />
      <Input message={message} setMessage={setMessage} send={send} />
    </div>
  )
}

export default App
