import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function HeadsetController(props) {
  const { nodes, materials } = useGLTF("models/VR Controller.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder001_Cylinder002-Mesh"].geometry}
        material={materials.White1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder001_Cylinder002-Mesh_1"].geometry}
        material={materials.White2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder001_Cylinder002-Mesh_2"].geometry}
        material={materials.Gray1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder001_Cylinder002-Mesh_3"].geometry}
        material={materials.Gray2}
      />
    </group>
  );
}

export default HeadsetController;
