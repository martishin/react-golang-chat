import { ReactNode } from "react"

interface MessageProps {
  message: string
}

export default function Message({ message }: MessageProps): ReactNode {
  return (
    <div className="">
      <div className="p-2">
        <p className="text-lg text-gray-600">{message}</p>
        <hr className="mt-1 border-gray-900/10" />
      </div>
    </div>
  )
}
