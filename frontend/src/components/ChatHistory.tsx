import { ReactNode, useEffect, useRef } from "react"

import Message from "../models/Message"
import MessageComponent from "./MessageComponent"

interface ChatHistoryProps {
  username: string
  messages: string[]
}

export default function ChatHistory({ username, messages }: ChatHistoryProps): ReactNode {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className="flex-grow overflow-y-auto">
      {messages.map((messageString, idx) => {
        const parsedMessage = JSON.parse(messageString)
        if (parsedMessage.type == 2) {
          return null
        }

        const parsedBody = JSON.parse(parsedMessage.body)

        const message = new Message(parsedMessage.type, parsedBody.message, parsedBody.username)

        return <MessageComponent key={idx} username={username} message={message} />
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
