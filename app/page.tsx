import { TerminalInterface } from "@/components/terminal-interface"
import { StatusBar } from "@/components/status-bar"

export default function Home() {
  return (
    <main className="bg-black">
      <TerminalInterface />
      <StatusBar />
    </main>
  )
}
