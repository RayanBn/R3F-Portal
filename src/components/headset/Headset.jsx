import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Headset(props) {
  const { nodes, materials } = useGLTF("models/VR Headset.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Headset_M_Cube-Mesh"].geometry}
        material={materials.Headset_M}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Headset_M_Cube-Mesh_1"].geometry}
        material={materials.Foam}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Headset_M_Cube-Mesh_2"].geometry}
        material={materials.Gray_Plastic}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Headset_M_Cube-Mesh_3"].geometry}
        material={materials.Lens}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Headset_M_Cube-Mesh_4"].geometry}
        material={materials.L}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Strap_Cube003-Mesh"].geometry}
        material={materials.Headset_M}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Strap_Cube003-Mesh_1"].geometry}
        material={materials.Strap}
      />
    </group>
  );
}

export default Headset;
