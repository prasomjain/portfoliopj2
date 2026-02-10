import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import Experience from './components/Experience'
import { Navbar, ProjectModal } from './components/Overlay'
import './index.css'

function App() {
  const [expandedProject, setExpandedProject] = useState(null)

  return (
    <>
      <Navbar />
      <ProjectModal projectId={expandedProject} onClose={() => setExpandedProject(null)} />

      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 64,
          position: [2.3, 1.5, 2.3],
        }}
        gl={{ antialias: false }}
        style={{
          background: '#050505',
          position: 'fixed',
          left: 0,
          top: 0
        }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <Experience setExpandedProject={setExpandedProject} />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
