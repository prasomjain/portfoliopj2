import { ScrollControls, Scroll, OrthographicCamera, Sparkles, Environment, Float, Html, useScroll } from '@react-three/drei'
import { Overlay, Navbar } from './Overlay'
import { Section } from './Section'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

const ScrollHandler = () => {
    const scroll = useScroll()
    useEffect(() => {
        const handleScroll = (e) => {
            const pageIndex = e.detail
            if (scroll && scroll.el) {
                scroll.el.scrollTo({
                    top: pageIndex * window.innerHeight,
                    behavior: 'smooth'
                })
            }
        }
        window.addEventListener('portfolio-scroll', handleScroll)
        return () => window.removeEventListener('portfolio-scroll', handleScroll)
    }, [scroll])
    return null
}

export default function Experience({ setExpandedProject }) {
    const viewport = useThree((state) => state.viewport)

    return (
        <>
            <color attach="background" args={['#050505']} />

            {/* Isometric Camera */}
            <OrthographicCamera
                makeDefault
                position={[20, 20, 20]}
                zoom={40}
                near={-100}
                far={200}
                onUpdate={c => c.lookAt(0, 0, 0)}
            />

            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f9" />
            <pointLight position={[-10, 0, -10]} intensity={0.5} color="#f49" />

            {/* Background Particles */}
            <Sparkles count={2000} scale={[40, 40, 40]} size={4} speed={0.2} opacity={0.6} color="#88ccff" />

            <ScrollControls pages={8} damping={0.1} style={{ scrollbarWidth: 'none' }}>
                <ScrollHandler />

                {/* 3D Content Layer */}
                <Scroll>
                    {/* Hero Section */}
                    <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
                        <Section type="hero" scale={1.5} position={[0, -1, 0]} />
                    </Float>

                    {/* Skills Section - 1 page down */}
                    <group position={[0, -viewport.height, 0]}>
                        <Float floatIntensity={1} speed={2} rotationIntensity={0.5}>
                            <Section type="skills" scale={1.2} />
                        </Float>
                    </group>

                    {/* Projects Section - 2 pages down */}
                    <group position={[0, -viewport.height * 2, 0]}>
                        <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
                            <Section type="projects" scale={1.2} />
                        </Float>
                    </group>

                    {/* Achievements Section - 3 pages down */}
                    <group position={[0, -viewport.height * 3, 0]}>
                        <Float floatIntensity={1} speed={2} rotationIntensity={0.5}>
                            <Section type="achievements" scale={1.2} />
                        </Float>
                    </group>

                    {/* Contact Section - 4 pages down */}
                    <group position={[0, -viewport.height * 4, 0]}>
                        <Float floatIntensity={0.5} speed={1} rotationIntensity={0.5}>
                            <Section type="contact" scale={1.2} />
                        </Float>
                    </group>
                </Scroll>

                {/* HTML Overlay Layer */}
                <Scroll html style={{ width: '100vw', height: '100vh', zIndex: 100 }}>
                    <Overlay setExpandedProject={setExpandedProject} />
                </Scroll>
            </ScrollControls>
        </>
    )
}
