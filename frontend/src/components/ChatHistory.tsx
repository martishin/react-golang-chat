import { ReactNode, useEffect, useRef } from "react"

import Message from "./Message"

interface ChatHistoryProps {
  messages: string[]
}

export default function ChatHistory({ messages }: ChatHistoryProps): ReactNode {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className="h-[75vh] overflow-y-auto">
      <div ref={messagesEndRef}>
        {messages.map((message, idx) => {
          const parsedMessage = JSON.parse(message)
          if (parsedMessage.type == 2) {
            return null
          }

          return <Message key={idx} message={message} />
        })}
      </div>
    </div>
  )
}
