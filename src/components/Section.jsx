import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const Geometries = {
    hero: (props) => null,
    skills: (props) => null,
    projects: (props) => null,
    achievements: (props) => null,
    contact: (props) => null,
}

export const Section = ({ type, ...props }) => {
    const Component = Geometries[type] || Geometries.hero
    const group = useRef()

    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.3
            group.current.rotation.x += delta * 0.1
        }
    })

    return (
        <group ref={group} {...props}>
            <Component />
        </group>
    )
}
