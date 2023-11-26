import { useEffect, useState } from "react"

import { connect, sendMsg } from "./api"
import ChatHistory from "./components/ChatHistory.tsx"
import Header from "./components/Header.tsx"

function App() {
  const [chatHistory, setChatHistory] = useState<string[]>([])
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    connect((msg: string) => {
      console.log("Got message: ", msg)
      setChatHistory((prevState) => [...prevState, msg])
    })
  }, [chatHistory])

  const send = () => {
    console.log("Sending msg: ", message)
    sendMsg(message)
    setMessage("")
  }

  return (
    <div className="relative mx-auto mt-8 h-[80vh] max-w-2xl rounded-lg border border-gray-300">
      <Header />
      <ChatHistory messages={chatHistory} />
      <div className="absolute bottom-0 right-0 mb-[-4rem] mt-4 flex w-full justify-center">
        <input
          type="text"
          className="mr-4 flex-grow rounded-lg border border-gray-300 p-2.5"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
          onClick={send}
        >
          Hit
        </button>
      </div>
    </div>
  )
}

export default App
