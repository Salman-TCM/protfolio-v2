import { TerminalInterface } from "@/components/terminal-interface"
import { StatusBar } from "@/components/status-bar"
// import { ProjectsSection } from "@/components/projects-section"

export default function Home() {
  return (
    <main className="bg-black">
      <TerminalInterface />
      <StatusBar />
      {/* <ProjectsSection /> */}
    </main>
  )
}
