import { useEffect } from "react"

import { connect, sendMsg } from "./api"
import Header from "./components/Header.tsx"

function App() {
  useEffect(() => {
    connect()
  }, [])

  const send = () => {
    console.log("Hello")
    sendMsg("hello")
  }

  return (
    <div className="container relative mx-auto mt-8 h-[80vh] rounded-lg border border-gray-300">
      <Header />
      <div className="absolute bottom-0 right-0 mb-[-4rem] mt-4 flex w-full justify-center">
        <input
          type="text"
          className="mr-4 flex-grow rounded-lg border border-gray-300 p-2.5"
          placeholder="Type a message"
        />
        <button
          className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
          onClick={send}
        >
          Hit
        </button>
      </div>
    </div>
  )
}

export default App
