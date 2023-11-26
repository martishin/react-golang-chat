import { ReactNode } from "react"

interface MessageProps {
  message: string
}

export default function Message({ message }: MessageProps): ReactNode {
  const parsedMessage = JSON.parse(message)

  return (
    <div className="">
      <div className="p-2">
        {parsedMessage.type == 2 ? (
          <p className="text-lg text-gray-400">{parsedMessage.body}</p>
        ) : (
          <p className="text-lg text-gray-600">{parsedMessage.body}</p>
        )}
        <hr className="mt-1 border-gray-900/10" />
      </div>
    </div>
  )
}
