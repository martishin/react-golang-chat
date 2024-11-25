import { ReactNode, useEffect, useState } from "react"

import { connect, sendMsg } from "./api"
import ChatHistory from "./components/ChatHistory"
import Header from "./components/Header"
import Input from "./components/Input"
import UsernameModal from "./components/UsernameModal"

function App(): ReactNode {
  const [chatHistory, setChatHistory] = useState<string[]>([])
  const [message, setMessage] = useState<string>("")
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState<string>("")

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (!storedUsername) {
      setShowModal(true)
    } else {
      setUsername(storedUsername)
    }

    connect((msg: string) => {
      console.log("Got message: ", msg)
      setChatHistory((prevState) => [...prevState, msg])
    })
  }, [chatHistory])

  const send = () => {
    if (message.trim() === "") {
      return
    }

    const requestBody = JSON.stringify({
      message: message,
      username: username,
    })

    console.log("Sending msg: ", requestBody)
    sendMsg(requestBody)
    setMessage("")
  }

  const handleUsernameSubmit = (username: string) => {
    setUsername(username)
    localStorage.setItem("username", username)
    setShowModal(false)
  }

  return (
    <div className="relative mx-auto mt-8 flex h-[80vh] max-w-2xl flex-col rounded-lg border border-indigo-200 bg-white">
      <Header />
      {showModal && <UsernameModal onSubmit={handleUsernameSubmit} />}
      <ChatHistory username={username} messages={chatHistory} />
      <Input message={message} setMessage={setMessage} send={send} />
    </div>
  )
}

export default App
