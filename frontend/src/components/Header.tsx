import { ReactNode } from "react"

export default function Header(): ReactNode {
  return (
    <div className="min-h-max w-full rounded-t-lg bg-blue-700 p-3 text-white">
      <h2 className="m-0 p-0 text-xl font-bold tracking-tight text-white">Realtime Chat App</h2>
    </div>
  )
}
