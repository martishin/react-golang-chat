import { ReactNode } from "react"

import Message from "./Message"

interface ChatHistoryProps {
  messages: string[]
}

export default function ChatHistory({ messages }: ChatHistoryProps): ReactNode {
  return (
    <div>
      {messages.map((message, idx) => (
        <Message key={idx} message={message} />
      ))}
    </div>
  )
}
