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
  const filteredMessages = messages
    .map((message) => JSON.parse(message))
    .filter((parsedMessage) => parsedMessage.type !== 2)

  return (
    <div className="flex-grow overflow-y-auto">
      {filteredMessages.map((filteredMessage, idx) => {
        const parsedBody = JSON.parse(filteredMessage.body)

        const message = new Message(filteredMessage.type, parsedBody.message, parsedBody.username)
        const isLastMessage = idx === filteredMessages.length - 1
        console.log(idx, filteredMessages.length - 1)

        return (
          <MessageComponent
            key={idx}
            username={username}
            message={message}
            isLastMessage={isLastMessage}
          />
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
