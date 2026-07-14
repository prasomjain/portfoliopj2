import { useState } from 'react'
import { Navbar, Overlay, ProjectModal, StepperRail } from './components/Overlay'
import './index.css'

function App() {
  const [expandedProject, setExpandedProject] = useState(null)

  return (
    <>
      <div className="stadium-bg" aria-hidden="true" />
      <Navbar />
      <StepperRail />
      <Overlay setExpandedProject={setExpandedProject} />
      <ProjectModal projectId={expandedProject} onClose={() => setExpandedProject(null)} />
    </>
  )
}

export default App
