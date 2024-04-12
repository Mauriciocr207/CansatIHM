import { useGLTF } from '@react-three/drei';

export function CansatModel(props) {
  const { nodes } = useGLTF('/model-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material} scale={[5, 20, 5]} />
    </group>
  )
}

useGLTF.preload('/model-transformed.glb')
