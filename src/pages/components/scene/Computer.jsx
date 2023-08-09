import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";


const Computers = () => {
    const computer = useGLTF("../assets/blender/first1.gltf");

    return (
        <mesh>
            <primitive
                object={computer.scene}
                scale={0.60}
                position={[0, 0, -1.5]}
                rotation={[-0.01, -10.2, 0.0901]}
            />
        </mesh>
    );
};

export default Computers