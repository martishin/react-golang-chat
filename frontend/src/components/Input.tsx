import { ReactNode } from "react"

interface InputProps {
  message: string
  setMessage: (message: string) => void
  send: () => void
}

export default function Input({ message, setMessage, send }: InputProps): ReactNode {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      send()
    }
  }

  return (
    <div className="absolute bottom-0 right-0 mb-[-4rem] mt-4 flex w-full justify-center">
      <input
        type="text"
        className="mr-4 flex-grow rounded-lg border border-gray-300 p-2.5"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
        onClick={send}
      >
        Hit
      </button>
    </div>
  )
}
