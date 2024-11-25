import { ReactNode } from "react"

import Message from "../models/Message"

interface MessageProps {
  username: string
  message: Message
  isLastMessage: boolean
}

export default function MessageComponent({
  username,
  message,
  isLastMessage,
}: MessageProps): ReactNode {
  console.log(username, message)
  const isCurrentUser = message.username === username

  return (
    <div className="">
      <div className="px-4 pt-2">
        {message.type == 2 ? (
          <p className="text-lg text-gray-400">{message.message}</p>
        ) : (
          <div className={`${isCurrentUser ? "text-right" : ""} text-lg`}>
            <div className="text-lg text-indigo-500">{message.username}</div>
            <p className="mt-1 text-lg text-gray-600">{message.message}</p>
          </div>
        )}
        {!isLastMessage && <hr className="mt-1 border-indigo-200" />}
      </div>
    </div>
  )
}
