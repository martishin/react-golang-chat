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
        className="flex items-center justify-center rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
        onClick={send}
      >
        Send
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="ml-2 h-5 w-5 rotate-90 transform"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
        </svg>
      </button>
    </div>
  )
}
