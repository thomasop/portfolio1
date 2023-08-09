import * as THREE from "three";
import { useRef } from "react";
import useSpline from "@splinetool/r3f-spline";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLerpedMouse } from "../hooks";
import { useSelector } from "react-redux";

const cameraTargetPosition = new THREE.Vector3(0, -10, 211);
export default function Scene({ ...props }) {
  const { theme } = useSelector((state) => state.theme);
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/2UAXRqVmUIHdk8R0/scene.splinecode"
  );
  const camera = useRef();
  const sceneContent = useRef();
  const mouse = useLerpedMouse();

  const size = useThree((state) => state.size);
  const isMobile = size.width < 768;

  const lerpedScroll = useRef(0);

  const drone = useRef();
  const hélice1 = useRef();
  const hélice2 = useRef();
  const hélice3 = useRef();
  const hélice4 = useRef();
  useFrame(({ clock }) => {
    // lerp the scroll
    const a = clock.getElapsedTime();
    hélice1.current.rotation.z = a * 20;
    hélice2.current.rotation.z = a * 20;
    hélice3.current.rotation.z = a * 20;
    hélice4.current.rotation.z = a * 20;
    drone.current.position.y = 200 + Math.sin(a * 2) * 100;


    // animate the camera
    const zStart = isMobile ? 4000 : 2100;
    const zEnd = isMobile ? -3000 : -1000;
    const xMin = isMobile ? -2000 : -2000;
    const xMax = isMobile ? -2000 : -1000;
    const targetX = isMobile ? -50 : 100;
    const yBase = isMobile ? 50 : 100;
    const yRange = isMobile ? 1000 : 500;
    const t = lerpedScroll.current;
    const arc = Math.sin(t * Math.PI - 250.60);
    camera.current.position.set(
      THREE.MathUtils.lerp(xMax, xMin, arc),
      arc * yRange + yBase,
      THREE.MathUtils.lerp(zStart, zEnd, t)
    );
    cameraTargetPosition.x = THREE.MathUtils.lerp(0, targetX * -10, arc);
    camera.current.lookAt(cameraTargetPosition);

    // rotate the model on mousehover
    sceneContent.current.position.x = (1 - t) * 150;
    sceneContent.current.rotation.y = mouse.current.x * Math.PI * 0.01;
    sceneContent.current.rotation.z = mouse.current.y * Math.PI * 0.01;
  });

  return (
    <>
      <color
        attach="background"
        args={[theme === "light" ? "white" : "black"]}
      />
      <group {...props} dispose={null}>
        <PerspectiveCamera
          name="Camera"
          ref={camera}
          makeDefault={true}
          far={8000}
          near={50}
          fov={65}
        />
        <group ref={sceneContent}>
          <group name="Mouse" position={[1074.46, -164.38, 827.5]} rotation={[-Math.PI, -0.72, -Math.PI]}>
            <mesh
              name="Cylinder"
              geometry={nodes.Cylinder.geometry}
              material={materials.white}
              skeleton={nodes.Cylinder.skeleton}
              castShadow
              receiveShadow
              position={[-44.83, 32.43, 10.02]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={1.24}
            />
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={materials['Key-red']}
              skeleton={nodes.Cube.skeleton}
              castShadow
              receiveShadow
              position={[8.55, 47.37, 11.73]}
              scale={1.24}
            />
          </group>
          <group name="Audio" position={[1609.35, -180.91, 1021.55]} rotation={[Math.PI, -1.41, Math.PI]} scale={1}>
            <mesh
              name="Torus 2"
              geometry={nodes['Torus 2'].geometry}
              material={materials['Key-white']}
              skeleton={nodes['Torus 2'].skeleton}
              castShadow
              receiveShadow
              position={[-0.71, 172.06, 41.19]}
              rotation={[-0.17, 0, 0]}
              scale={1}
            />
            <mesh
              name="Torus"
              geometry={nodes.Torus.geometry}
              material={materials['Key-white']}
              skeleton={nodes.Torus.skeleton}
              castShadow
              receiveShadow
              position={[-0.71, 63.3, 59]}
              rotation={[-0.17, 0, 0]}
              scale={1}
            />
            <mesh
              name="Sphere 2"
              geometry={nodes['Sphere 2'].geometry}
              material={materials['Key-white']}
              skeleton={nodes['Sphere 2'].skeleton}
              castShadow
              receiveShadow
              position={[-0.92, 170.99, 27.54]}
            />
            <mesh
              name="Sphere"
              geometry={nodes.Sphere.geometry}
              material={materials['Key-white']}
              skeleton={nodes.Sphere.skeleton}
              castShadow
              receiveShadow
              position={[-0.92, 62.23, 43.86]}
            />
            <mesh
              name="Cube 2"
              geometry={nodes['Cube 2'].geometry}
              material={materials['Cube 2 Material']}
              skeleton={nodes['Cube 2'].skeleton}
              castShadow
              receiveShadow
              position={[0, 116.35, -0.52]}
            />
          </group>
          <group name="Audio1" position={[1588.67, -188.34, -778.3]} rotation={[0, -1.23, 0]} scale={1}>
            <mesh
              name="Torus 21"
              geometry={nodes['Torus 21'].geometry}
              material={materials['Key-white']}
              skeleton={nodes['Torus 21'].skeleton}
              castShadow
              receiveShadow
              position={[-0.71, 172.06, 41.19]}
              rotation={[-0.17, 0, 0]}
              scale={1}
            />
            <mesh
              name="Torus1"
              geometry={nodes.Torus1.geometry}
              material={materials['Key-white']}
              skeleton={nodes.Torus1.skeleton}
              castShadow
              receiveShadow
              position={[-0.71, 63.3, 59]}
              rotation={[-0.17, 0, 0]}
              scale={1}
            />
            <mesh
              name="Sphere 21"
              geometry={nodes['Sphere 21'].geometry}
              material={materials['Key-white']}
              skeleton={nodes['Sphere 21'].skeleton}
              castShadow
              receiveShadow
              position={[-0.92, 170.99, 27.54]}
            />
            <mesh
              name="Sphere1"
              geometry={nodes.Sphere1.geometry}
              material={materials['Key-white']}
              skeleton={nodes.Sphere1.skeleton}
              castShadow
              receiveShadow
              position={[-0.92, 62.23, 43.86]}
            />
            <mesh
              name="Cube 21"
              geometry={nodes['Cube 21'].geometry}
              material={materials['Cube 21 Material']}
              skeleton={nodes['Cube 21'].skeleton}
              castShadow
              receiveShadow
              position={[0, 116.35, -0.52]}
            />
          </group>
          <mesh
            name="Cube 3"
            geometry={nodes['Cube 3'].geometry}
            material={materials['Cube 3 Material']}
            skeleton={nodes['Cube 3'].skeleton}
            castShadow
            receiveShadow
            position={[1631.18, 411.39, 142.95]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <mesh
            name="Cube 4"
            geometry={nodes['Cube 4'].geometry}
            material={materials['Cube 4 Material']}
            skeleton={nodes['Cube 4'].skeleton}
            castShadow
            receiveShadow
            position={[1662.41, 205.37, 86.68]}
            rotation={[0, 0, Math.PI]}
          />
          <mesh
            name="Cube 22"
            geometry={nodes['Cube 22'].geometry}
            material={materials['Cube 22 Material']}
            skeleton={nodes['Cube 22'].skeleton}
            castShadow
            receiveShadow
            position={[1684.93, 22.85, 86.68]}
            rotation={[0, 0, Math.PI / 2]}
          />
          <mesh
            name="Cube1"
            geometry={nodes.Cube1.geometry}
            material={materials['Cube1 Material']}
            skeleton={nodes.Cube1.skeleton}
            castShadow
            receiveShadow
            position={[1645.82, -193.17, 86.68]}
          />
          <group name="cup" position={[1217.19, -154.28, -638.4]} scale={[2.89, 3.07, 2.81]}>
            <mesh
              name="Cube 31"
              geometry={nodes['Cube 31'].geometry}
              material={materials['Cube 31 Material']}
              skeleton={nodes['Cube 31'].skeleton}
              castShadow
              receiveShadow
              position={[18.09, 1.8, 1.24]}
            />
            <mesh
              name="Cube 23"
              geometry={nodes['Cube 23'].geometry}
              material={materials['Cube 23 Material']}
              skeleton={nodes['Cube 23'].skeleton}
              castShadow
              receiveShadow
              position={[-5.14, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={1}
            />
          </group>
          <group name="drone" position={[1260.63, -127.99, 1098.88]} scale={[2.26, 3.25, 3.04]}>
            <group ref={drone} name="DJ" position={[0, 2.06, 0]} scale={0.8}>
              <mesh
                name="Cylinder 2"
                geometry={nodes['Cylinder 2'].geometry}
                material={materials['Dark Blue']}
                skeleton={nodes['Cylinder 2'].skeleton}
                castShadow
                receiveShadow
                position={[0.69, 19.18, 1.34]}
              />
              <mesh
                name="Cylinder1"
                geometry={nodes.Cylinder1.geometry}
                material={materials.white}
                skeleton={nodes.Cylinder1.skeleton}
                castShadow
                receiveShadow
                position={[-1.72, -7.72, -3.26]}
                scale={1}
              >
                <mesh
                  name="Cube2"
                  geometry={nodes.Cube2.geometry}
                  material={materials['Dark Blue']}
                  skeleton={nodes.Cube2.skeleton}
                  castShadow
                  receiveShadow
                  position={[0.11, -10.11, 2.66]}
                  rotation={[0.17, 0, 0]}
                  scale={1}
                />
              </mesh>
              <group name="Group 87" position={[0, 9.59, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1}>
                <mesh
                  ref={hélice1}
                  name="Shape 3"
                  geometry={nodes['Shape 3'].geometry}
                  material={materials.white}
                  skeleton={nodes['Shape 3'].skeleton}
                  castShadow
                  receiveShadow
                  position={[47.65, -47.18, 7.18]}
                  rotation={[0, 0, 0.61]}
                  scale={0.75}
                />
                <mesh
                  ref={hélice2}
                  name="Shape 4"
                  geometry={nodes['Shape 4'].geometry}
                  material={materials.white}
                  skeleton={nodes['Shape 4'].skeleton}
                  castShadow
                  receiveShadow
                  position={[-46.59, -48.21, 7.18]}
                  rotation={[0, 0, -0.7]}
                  scale={0.75}
                />
                <mesh
                  ref={hélice3}
                  name="Shape 2"
                  geometry={nodes['Shape 2'].geometry}
                  material={materials.white}
                  skeleton={nodes['Shape 2'].skeleton}
                  castShadow
                  receiveShadow
                  position={[47.44, 46.38, 7.18]}
                  rotation={[0, 0, -0.7]}
                  scale={0.75}
                />
                <mesh
                  ref={hélice4}
                  name="Shape"
                  geometry={nodes.Shape.geometry}
                  material={materials.white}
                  skeleton={nodes.Shape.skeleton}
                  castShadow
                  receiveShadow
                  position={[-47.56, 46.66, 7.18]}
                  rotation={[0, 0, 0.7]}
                  scale={0.75}
                />
                <mesh
                  name="Ellipse 4"
                  geometry={nodes['Ellipse 4'].geometry}
                  material={materials['Dark Blue']}
                  skeleton={nodes['Ellipse 4'].skeleton}
                  castShadow
                  receiveShadow
                  position={[47.36, -47.05, -0.15]}
                  rotation={[0, 0, Math.PI / 6]}
                  scale={1}
                />
                <mesh
                  name="Ellipse 5"
                  geometry={nodes['Ellipse 5'].geometry}
                  material={materials['Dark Blue']}
                  skeleton={nodes['Ellipse 5'].skeleton}
                  castShadow
                  receiveShadow
                  position={[-46.53, -47.9, -0.15]}
                  rotation={[0, 0, -Math.PI / 4]}
                  scale={1}
                />
                <mesh
                  name="Ellipse 3"
                  geometry={nodes['Ellipse 3'].geometry}
                  material={materials['Dark Blue']}
                  skeleton={nodes['Ellipse 3'].skeleton}
                  castShadow
                  receiveShadow
                  position={[47.5, 46.69, -0.15]}
                  rotation={[0, 0, -Math.PI / 4]}
                  scale={1}
                />
                <mesh
                  name="Ellipse 2"
                  geometry={nodes['Ellipse 2'].geometry}
                  material={materials['Dark Blue']}
                  skeleton={nodes['Ellipse 2'].skeleton}
                  castShadow
                  receiveShadow
                  position={[-47.85, 46.77, -0.15]}
                  rotation={[0, 0, 0.61]}
                  scale={1}
                />
                <mesh
                  name="Ellipse 41"
                  geometry={nodes['Ellipse 41'].geometry}
                  material={materials.white}
                  skeleton={nodes['Ellipse 41'].skeleton}
                  castShadow
                  receiveShadow
                  position={[47.36, -47.05, -0.88]}
                  rotation={[0, 0, Math.PI / 6]}
                  scale={1}
                />
                <mesh
                  name="Ellipse 51"
                  geometry={nodes['Ellipse 51'].geometry}
                  material={materials.white}
                  skeleton={nodes['Ellipse 51'].skeleton}
                  castShadow
                  receiveShadow
                  position={[-46.53, -47.9, -0.88]}
                  rotation={[0, 0, -Math.PI / 4]}
                  scale={1}
                />
                <mesh
                  name="Ellipse 31"
                  geometry={nodes['Ellipse 31'].geometry}
                  material={materials.white}
                  skeleton={nodes['Ellipse 31'].skeleton}
                  castShadow
                  receiveShadow
                  position={[47.5, 46.69, -0.88]}
                  rotation={[0, 0, -Math.PI / 4]}
                  scale={1}
                />
                <mesh
                  name="Ellipse"
                  geometry={nodes.Ellipse.geometry}
                  material={materials.white}
                  skeleton={nodes.Ellipse.skeleton}
                  castShadow
                  receiveShadow
                  position={[-47.85, 46.77, -0.88]}
                  rotation={[0, 0, 0.61]}
                  scale={1}
                />
                <mesh
                  name="Cylinder2"
                  geometry={nodes.Cylinder2.geometry}
                  material={materials['Dark Blue']}
                  skeleton={nodes.Cylinder2.skeleton}
                  castShadow
                  receiveShadow
                  position={[0.26, -0.52, -2.71]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={1}
                />
              </group>
            </group>
          </group>
          <group name="keyboard" position={[1132.59, -157.22, 57.24]} rotation={[0, -1.51, 0]} scale={[0.6, 0.37, 0.5]}>
            <mesh
              name="Text 10"
              geometry={nodes['Text 10'].geometry}
              material={materials['Text 10 Material']}
              skeleton={nodes['Text 10'].skeleton}
              castShadow
              receiveShadow
              position={[549.51, 44.33, -389.43]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="Text 9"
              geometry={nodes['Text 9'].geometry}
              material={materials['Text 9 Material']}
              skeleton={nodes['Text 9'].skeleton}
              castShadow
              receiveShadow
              position={[429.49, 44.33, -389.4]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="Text 8"
              geometry={nodes['Text 8'].geometry}
              material={materials['Text 8 Material']}
              skeleton={nodes['Text 8'].skeleton}
              castShadow
              receiveShadow
              position={[309.43, 44.33, -391.36]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="Text 7"
              geometry={nodes['Text 7'].geometry}
              material={materials['Text 7 Material']}
              skeleton={nodes['Text 7'].skeleton}
              castShadow
              receiveShadow
              position={[186.12, 44.33, -390.74]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="Text 6"
              geometry={nodes['Text 6'].geometry}
              material={materials['Text 6 Material']}
              skeleton={nodes['Text 6'].skeleton}
              castShadow
              receiveShadow
              position={[63.46, 44.33, -391.41]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="Text 5"
              geometry={nodes['Text 5'].geometry}
              material={materials['Text 5 Material']}
              skeleton={nodes['Text 5'].skeleton}
              castShadow
              receiveShadow
              position={[-47.29, 44.33, -389.95]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="Text 4"
              geometry={nodes['Text 4'].geometry}
              material={materials['Text 4 Material']}
              skeleton={nodes['Text 4'].skeleton}
              castShadow
              receiveShadow
              position={[-179.24, 44.33, -391.4]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="Text 3"
              geometry={nodes['Text 3'].geometry}
              material={materials['Text 3 Material']}
              skeleton={nodes['Text 3'].skeleton}
              castShadow
              receiveShadow
              position={[-302.62, 44.33, -391.4]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="Text 2"
              geometry={nodes['Text 2'].geometry}
              material={materials['Text 2 Material']}
              skeleton={nodes['Text 2'].skeleton}
              castShadow
              receiveShadow
              position={[-417.95, 44.33, -390.69]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="Text"
              geometry={nodes.Text.geometry}
              material={materials['Text Material']}
              skeleton={nodes.Text.skeleton}
              castShadow
              receiveShadow
              position={[-547.11, 44.33, -392.02]}
              rotation={[-Math.PI / 2, 0, 0.01]}
              scale={1.33}
            />
            <mesh
              name="keyboard-base"
              geometry={nodes['keyboard-base'].geometry}
              material={materials['keyboard-base Material']}
              skeleton={nodes['keyboard-base'].skeleton}
              castShadow
              receiveShadow
              position={[-0.96, -35.77, -155.1]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={1}
            >
              <mesh
                name="Rectangle 2"
                geometry={nodes['Rectangle 2'].geometry}
                material={materials['Rectangle 2 Material']}
                skeleton={nodes['Rectangle 2'].skeleton}
                castShadow
                receiveShadow
                position={[-4.65, -3.9, -0.91]}
                scale={1}
              />
            </mesh>
            <group name="Key Instance 9" position={[426.61, 0, -155.1]}>
              <mesh
                name="Text-character special1"
                geometry={nodes['Text-character special1'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special1'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character1"
                geometry={nodes['Text-character1'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character1'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow1"
                geometry={nodes.Arrow1.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow1.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control1"
                geometry={nodes['Text-control1'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control1'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC1"
                geometry={nodes['Text-ABC1'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC1'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base1"
                geometry={nodes['key-base1'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base1'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 8" position={[304.82, 0, -155.1]}>
              <mesh
                name="Text-character special2"
                geometry={nodes['Text-character special2'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special2'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character2"
                geometry={nodes['Text-character2'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character2'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow2"
                geometry={nodes.Arrow2.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow2.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control2"
                geometry={nodes['Text-control2'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control2'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC2"
                geometry={nodes['Text-ABC2'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC2'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base2"
                geometry={nodes['key-base2'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base2'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 7" position={[183.03, 0, -155.1]}>
              <mesh
                name="Text-character special3"
                geometry={nodes['Text-character special3'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special3'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character3"
                geometry={nodes['Text-character3'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character3'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow3"
                geometry={nodes.Arrow3.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow3.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control3"
                geometry={nodes['Text-control3'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control3'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC3"
                geometry={nodes['Text-ABC3'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC3'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base3"
                geometry={nodes['key-base3'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base3'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 6" position={[61.21, 0, -155.1]}>
              <mesh
                name="Text-character special4"
                geometry={nodes['Text-character special4'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special4'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character4"
                geometry={nodes['Text-character4'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character4'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow4"
                geometry={nodes.Arrow4.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow4.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control4"
                geometry={nodes['Text-control4'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control4'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC4"
                geometry={nodes['Text-ABC4'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC4'].skeleton}
                castShadow
                receiveShadow
                position={[9.83, 40.44, -0.74]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base4"
                geometry={nodes['key-base4'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base4'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 5" position={[-60.92, 0, -155.1]}>
              <mesh
                name="Text-character special5"
                geometry={nodes['Text-character special5'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special5'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character5"
                geometry={nodes['Text-character5'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character5'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow5"
                geometry={nodes.Arrow5.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow5.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control5"
                geometry={nodes['Text-control5'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control5'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC5"
                geometry={nodes['Text-ABC5'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC5'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base5"
                geometry={nodes['key-base5'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base5'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 4" position={[-183.03, 0, -155.1]}>
              <mesh
                name="Text-character special6"
                geometry={nodes['Text-character special6'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special6'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character6"
                geometry={nodes['Text-character6'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character6'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow6"
                geometry={nodes.Arrow6.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow6.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control6"
                geometry={nodes['Text-control6'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control6'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC6"
                geometry={nodes['Text-ABC6'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC6'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base6"
                geometry={nodes['key-base6'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base6'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 3" position={[-304.82, 0, -155.1]}>
              <mesh
                name="Text-character special7"
                geometry={nodes['Text-character special7'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special7'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character7"
                geometry={nodes['Text-character7'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character7'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow7"
                geometry={nodes.Arrow7.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow7.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control7"
                geometry={nodes['Text-control7'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control7'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC7"
                geometry={nodes['Text-ABC7'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC7'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base7"
                geometry={nodes['key-base7'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base7'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 2" position={[-426.61, 0, -155.1]}>
              <mesh
                name="Text-character special8"
                geometry={nodes['Text-character special8'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special8'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character8"
                geometry={nodes['Text-character8'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character8'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow8"
                geometry={nodes.Arrow8.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow8.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control8"
                geometry={nodes['Text-control8'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control8'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC8"
                geometry={nodes['Text-ABC8'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC8'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base8"
                geometry={nodes['key-base8'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base8'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 16" position={[183.03, 0, -32.72]}>
              <mesh
                name="Text-character special9"
                geometry={nodes['Text-character special9'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special9'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character9"
                geometry={nodes['Text-character9'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character9'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow9"
                geometry={nodes.Arrow9.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow9.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control9"
                geometry={nodes['Text-control9'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control9'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC9"
                geometry={nodes['Text-ABC9'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC9'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base9"
                geometry={nodes['key-base9'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base9'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 15" position={[61.21, 0, -32.72]}>
              <mesh
                name="Text-character special10"
                geometry={nodes['Text-character special10'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special10'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character10"
                geometry={nodes['Text-character10'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character10'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow10"
                geometry={nodes.Arrow10.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow10.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control10"
                geometry={nodes['Text-control10'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control10'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC10"
                geometry={nodes['Text-ABC10'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC10'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base10"
                geometry={nodes['key-base10'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base10'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 14" position={[-60.92, 0, -32.72]}>
              <mesh
                name="Text-character special11"
                geometry={nodes['Text-character special11'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special11'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character11"
                geometry={nodes['Text-character11'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character11'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow11"
                geometry={nodes.Arrow11.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow11.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control11"
                geometry={nodes['Text-control11'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control11'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC11"
                geometry={nodes['Text-ABC11'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC11'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base11"
                geometry={nodes['key-base11'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base11'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 13" position={[-183.03, 0, -32.72]}>
              <mesh
                name="Text-character special12"
                geometry={nodes['Text-character special12'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special12'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character12"
                geometry={nodes['Text-character12'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character12'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow12"
                geometry={nodes.Arrow12.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow12.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control12"
                geometry={nodes['Text-control12'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control12'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC12"
                geometry={nodes['Text-ABC12'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC12'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base12"
                geometry={nodes['key-base12'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base12'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 12" position={[-304.82, 0, -32.72]}>
              <mesh
                name="Text-character special13"
                geometry={nodes['Text-character special13'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special13'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character13"
                geometry={nodes['Text-character13'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character13'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow13"
                geometry={nodes.Arrow13.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow13.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control13"
                geometry={nodes['Text-control13'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control13'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC13"
                geometry={nodes['Text-ABC13'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC13'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base13"
                geometry={nodes['key-base13'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base13'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 11" position={[-426.61, 0, -32.72]}>
              <mesh
                name="Text-character special14"
                geometry={nodes['Text-character special14'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special14'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character14"
                geometry={nodes['Text-character14'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character14'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow14"
                geometry={nodes.Arrow14.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow14.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control14"
                geometry={nodes['Text-control14'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control14'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC14"
                geometry={nodes['Text-ABC14'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC14'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base14"
                geometry={nodes['key-base14'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base14'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 10" position={[-548.4, 0, -32.72]}>
              <mesh
                name="Text-character special15"
                geometry={nodes['Text-character special15'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special15'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character15"
                geometry={nodes['Text-character15'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character15'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow15"
                geometry={nodes.Arrow15.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow15.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control15"
                geometry={nodes['Text-control15'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control15'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC15"
                geometry={nodes['Text-ABC15'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC15'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base15"
                geometry={nodes['key-base15'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base15'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance" position={[-546.58, 0, -392.59]}>
              <mesh
                name="Text-character special16"
                geometry={nodes['Text-character special16'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special16'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character16"
                geometry={nodes['Text-character16'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character16'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow16"
                geometry={nodes.Arrow16.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow16.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control16"
                geometry={nodes['Text-control16'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control16'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC16"
                geometry={nodes['Text-ABC16'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC16'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base16"
                geometry={nodes['key-base16'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base16'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance1" position={[-416.83, 0, -392.59]}>
              <mesh
                name="Text-character special17"
                geometry={nodes['Text-character special17'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special17'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character17"
                geometry={nodes['Text-character17'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character17'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow17"
                geometry={nodes.Arrow17.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow17.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control17"
                geometry={nodes['Text-control17'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control17'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC17"
                geometry={nodes['Text-ABC17'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC17'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base17"
                geometry={nodes['key-base17'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base17'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance2" position={[-301.53, 0, -392.59]}>
              <mesh
                name="Text-character special18"
                geometry={nodes['Text-character special18'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special18'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character18"
                geometry={nodes['Text-character18'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character18'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow18"
                geometry={nodes.Arrow18.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow18.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control18"
                geometry={nodes['Text-control18'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control18'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC18"
                geometry={nodes['Text-ABC18'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC18'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base18"
                geometry={nodes['key-base18'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base18'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance3" position={[-178.87, 0, -392.59]}>
              <mesh
                name="Text-character special19"
                geometry={nodes['Text-character special19'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special19'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character19"
                geometry={nodes['Text-character19'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character19'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow19"
                geometry={nodes.Arrow19.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow19.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control19"
                geometry={nodes['Text-control19'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control19'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC19"
                geometry={nodes['Text-ABC19'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC19'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base19"
                geometry={nodes['key-base19'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base19'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance4" position={[-47.2, 0, -392.59]}>
              <mesh
                name="Text-character special20"
                geometry={nodes['Text-character special20'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special20'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character20"
                geometry={nodes['Text-character20'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character20'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow20"
                geometry={nodes.Arrow20.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow20.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control20"
                geometry={nodes['Text-control20'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control20'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC20"
                geometry={nodes['Text-ABC20'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC20'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base20"
                geometry={nodes['key-base20'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base20'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance5" position={[63.81, 0, -392.59]}>
              <mesh
                name="Text-character special21"
                geometry={nodes['Text-character special21'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special21'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character21"
                geometry={nodes['Text-character21'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character21'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow21"
                geometry={nodes.Arrow21.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow21.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control21"
                geometry={nodes['Text-control21'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control21'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC21"
                geometry={nodes['Text-ABC21'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC21'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base21"
                geometry={nodes['key-base21'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base21'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance6" position={[185.16, 0, -392.59]}>
              <mesh
                name="Text-character special22"
                geometry={nodes['Text-character special22'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special22'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character22"
                geometry={nodes['Text-character22'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character22'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow22"
                geometry={nodes.Arrow22.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow22.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control22"
                geometry={nodes['Text-control22'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control22'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC22"
                geometry={nodes['Text-ABC22'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC22'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base22"
                geometry={nodes['key-base22'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base22'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance7" position={[309.92, 0, -392.59]}>
              <mesh
                name="Text-character special23"
                geometry={nodes['Text-character special23'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special23'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character23"
                geometry={nodes['Text-character23'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character23'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow23"
                geometry={nodes.Arrow23.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow23.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control23"
                geometry={nodes['Text-control23'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control23'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC23"
                geometry={nodes['Text-ABC23'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC23'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base23"
                geometry={nodes['key-base23'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base23'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance8" position={[428.63, 0, -392.59]}>
              <mesh
                name="Text-character special24"
                geometry={nodes['Text-character special24'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special24'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character24"
                geometry={nodes['Text-character24'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character24'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow24"
                geometry={nodes.Arrow24.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow24.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control24"
                geometry={nodes['Text-control24'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control24'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC24"
                geometry={nodes['Text-ABC24'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC24'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base24"
                geometry={nodes['key-base24'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base24'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance9" position={[548.4, 0, -392.59]}>
              <mesh
                name="Text-character special25"
                geometry={nodes['Text-character special25'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special25'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character25"
                geometry={nodes['Text-character25'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character25'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow25"
                geometry={nodes.Arrow25.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow25.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control25"
                geometry={nodes['Text-control25'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control25'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC25"
                geometry={nodes['Text-ABC25'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC25'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base25"
                geometry={nodes['key-base25'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base25'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 26" position={[548.4, 0, -275.85]}>
              <mesh
                name="Text-character special26"
                geometry={nodes['Text-character special26'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special26'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character26"
                geometry={nodes['Text-character26'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character26'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow26"
                geometry={nodes.Arrow26.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow26.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control26"
                geometry={nodes['Text-control26'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control26'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC26"
                geometry={nodes['Text-ABC26'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC26'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base26"
                geometry={nodes['key-base26'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base26'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 25" position={[426.61, 0, -275.85]}>
              <mesh
                name="Text-character special27"
                geometry={nodes['Text-character special27'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special27'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character27"
                geometry={nodes['Text-character27'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character27'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow27"
                geometry={nodes.Arrow27.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow27.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control27"
                geometry={nodes['Text-control27'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control27'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC27"
                geometry={nodes['Text-ABC27'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC27'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base27"
                geometry={nodes['key-base27'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base27'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 24" position={[304.82, 0, -275.85]}>
              <mesh
                name="Text-character special28"
                geometry={nodes['Text-character special28'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special28'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character28"
                geometry={nodes['Text-character28'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character28'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow28"
                geometry={nodes.Arrow28.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow28.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control28"
                geometry={nodes['Text-control28'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control28'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC28"
                geometry={nodes['Text-ABC28'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC28'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base28"
                geometry={nodes['key-base28'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base28'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 23" position={[183.03, 0, -275.85]}>
              <mesh
                name="Text-character special29"
                geometry={nodes['Text-character special29'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special29'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character29"
                geometry={nodes['Text-character29'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character29'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow29"
                geometry={nodes.Arrow29.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow29.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control29"
                geometry={nodes['Text-control29'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control29'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC29"
                geometry={nodes['Text-ABC29'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC29'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base29"
                geometry={nodes['key-base29'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base29'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 22" position={[61.25, 0, -275.85]}>
              <mesh
                name="Text-character special30"
                geometry={nodes['Text-character special30'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special30'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character30"
                geometry={nodes['Text-character30'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character30'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow30"
                geometry={nodes.Arrow30.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow30.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control30"
                geometry={nodes['Text-control30'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control30'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC30"
                geometry={nodes['Text-ABC30'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC30'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base30"
                geometry={nodes['key-base30'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base30'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 21" position={[-60.92, 0, -275.85]}>
              <mesh
                name="Text-character special31"
                geometry={nodes['Text-character special31'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special31'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character31"
                geometry={nodes['Text-character31'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character31'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow31"
                geometry={nodes.Arrow31.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow31.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control31"
                geometry={nodes['Text-control31'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control31'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC31"
                geometry={nodes['Text-ABC31'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC31'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base31"
                geometry={nodes['key-base31'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base31'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 20" position={[-183.03, 0, -275.85]}>
              <mesh
                name="Text-character special32"
                geometry={nodes['Text-character special32'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special32'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character32"
                geometry={nodes['Text-character32'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character32'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow32"
                geometry={nodes.Arrow32.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow32.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control32"
                geometry={nodes['Text-control32'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control32'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC32"
                geometry={nodes['Text-ABC32'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC32'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base32"
                geometry={nodes['key-base32'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base32'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 19" position={[-304.82, 0, -275.85]}>
              <mesh
                name="Text-character special33"
                geometry={nodes['Text-character special33'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special33'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character33"
                geometry={nodes['Text-character33'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character33'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow33"
                geometry={nodes.Arrow33.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow33.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control33"
                geometry={nodes['Text-control33'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control33'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC33"
                geometry={nodes['Text-ABC33'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC33'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base33"
                geometry={nodes['key-base33'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base33'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 18" position={[-426.61, 0, -275.85]}>
              <mesh
                name="Text-character special34"
                geometry={nodes['Text-character special34'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special34'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character34"
                geometry={nodes['Text-character34'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character34'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow34"
                geometry={nodes.Arrow34.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow34.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control34"
                geometry={nodes['Text-control34'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control34'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC34"
                geometry={nodes['Text-ABC34'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC34'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base34"
                geometry={nodes['key-base34'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base34'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 37" position={[426.61, 0, 89.07]}>
              <mesh
                name="Text-character special35"
                geometry={nodes['Text-character special35'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special35'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character35"
                geometry={nodes['Text-character35'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character35'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow35"
                geometry={nodes.Arrow35.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow35.skeleton}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={1}
              />
              <mesh
                name="Text-control35"
                geometry={nodes['Text-control35'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-control35'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC35"
                geometry={nodes['Text-ABC35'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC35'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base35"
                geometry={nodes['key-base35'].geometry}
                material={materials['Key-white']}
                skeleton={nodes['key-base35'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 39" position={[670.19, 0, 89.07]}>
              <mesh
                name="Text-character special36"
                geometry={nodes['Text-character special36'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special36'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character36"
                geometry={nodes['Text-character36'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character36'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow36"
                geometry={nodes.Arrow36.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow36.skeleton}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control36"
                geometry={nodes['Text-control36'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-control36'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC36"
                geometry={nodes['Text-ABC36'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC36'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base36"
                geometry={nodes['key-base36'].geometry}
                material={materials['Key-white']}
                skeleton={nodes['key-base36'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 38" position={[548.4, 0, 89.07]}>
              <mesh
                name="Text-character special37"
                geometry={nodes['Text-character special37'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special37'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character37"
                geometry={nodes['Text-character37'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character37'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow37"
                geometry={nodes.Arrow37.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow37.skeleton}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                scale={1}
              />
              <mesh
                name="Text-control37"
                geometry={nodes['Text-control37'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-control37'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC37"
                geometry={nodes['Text-ABC37'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC37'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base37"
                geometry={nodes['key-base37'].geometry}
                material={materials['Key-white']}
                skeleton={nodes['key-base37'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 36" position={[304.82, 0, 89.07]}>
              <mesh
                name="Text-character special38"
                geometry={nodes['Text-character special38'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special38'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character38"
                geometry={nodes['Text-character38'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character38'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow38"
                geometry={nodes.Arrow38.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow38.skeleton}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control38"
                geometry={nodes['Text-control38'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-control38'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC38"
                geometry={nodes['Text-ABC38'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC38'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base38"
                geometry={nodes['key-base38'].geometry}
                material={materials['Key-white']}
                skeleton={nodes['key-base38'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 47" position={[-60.92, 0, 89.07]}>
              <mesh
                name="key-base39"
                geometry={nodes['key-base39'].geometry}
                material={materials['key-base39 Material']}
                skeleton={nodes['key-base39'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 31" position={[-548.4, 0, 89.07]}>
              <mesh
                name="Text-character special39"
                geometry={nodes['Text-character special39'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special39'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character39"
                geometry={nodes['Text-character39'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character39'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow39"
                geometry={nodes.Arrow39.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow39.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control39"
                geometry={nodes['Text-control39'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-control39'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC39"
                geometry={nodes['Text-ABC39'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC39'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base40"
                geometry={nodes['key-base40'].geometry}
                material={materials['Key-white']}
                skeleton={nodes['key-base40'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 30" position={[-670.19, 0, 89.07]}>
              <mesh
                name="Text-character special40"
                geometry={nodes['Text-character special40'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special40'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character40"
                geometry={nodes['Text-character40'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character40'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow40"
                geometry={nodes.Arrow40.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow40.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control40"
                geometry={nodes['Text-control40'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-control40'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC40"
                geometry={nodes['Text-ABC40'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC40'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base41"
                geometry={nodes['key-base41'].geometry}
                material={materials['Key-white']}
                skeleton={nodes['key-base41'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 50" position={[670.19, 0, -398.34]}>
              <mesh
                name="Text-character special41"
                geometry={nodes['Text-character special41'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special41'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character41"
                geometry={nodes['Text-character41'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character41'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow41"
                geometry={nodes.Arrow41.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow41.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control41"
                geometry={nodes['Text-control41'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-control41'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC41"
                geometry={nodes['Text-ABC41'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC41'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base42"
                geometry={nodes['key-base42'].geometry}
                material={materials['Key-white']}
                skeleton={nodes['key-base42'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 49" position={[-670.19, 0, -398.34]}>
              <mesh
                name="Text-character special42"
                geometry={nodes['Text-character special42'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special42'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character42"
                geometry={nodes['Text-character42'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character42'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow42"
                geometry={nodes.Arrow42.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow42.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control42"
                geometry={nodes['Text-control42'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-control42'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC42"
                geometry={nodes['Text-ABC42'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC42'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base43"
                geometry={nodes['key-base43'].geometry}
                material={materials['Key-white']}
                skeleton={nodes['key-base43'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 29" position={[-670.19, 0, -32.72]}>
              <mesh
                name="Text-character special43"
                geometry={nodes['Text-character special43'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special43'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character43"
                geometry={nodes['Text-character43'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character43'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow43"
                geometry={nodes.Arrow43.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow43.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control43"
                geometry={nodes['Text-control43'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-control43'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC43"
                geometry={nodes['Text-ABC43'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC43'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base44"
                geometry={nodes['key-base44'].geometry}
                material={materials['Key-white']}
                skeleton={nodes['key-base44'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 41" position={[670.19, 0, -275.85]}>
              <mesh
                name="Text-character special44"
                geometry={nodes['Text-character special44'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special44'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character44"
                geometry={nodes['Text-character44'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character44'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow44"
                geometry={nodes.Arrow44.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow44.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control44"
                geometry={nodes['Text-control44'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control44'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC44"
                geometry={nodes['Text-ABC44'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC44'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base45"
                geometry={nodes['key-base45'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base45'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 46" position={[670.19, 0, -155.1]}>
              <mesh
                name="Text-character special45"
                geometry={nodes['Text-character special45'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special45'].skeleton}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character45"
                geometry={nodes['Text-character45'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character45'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow45"
                geometry={nodes.Arrow45.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow45.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control45"
                geometry={nodes['Text-control45'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control45'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC45"
                geometry={nodes['Text-ABC45'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC45'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base46"
                geometry={nodes['key-base46'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base46'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 45" position={[548.4, 0, -155.1]}>
              <mesh
                name="Text-character special46"
                geometry={nodes['Text-character special46'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special46'].skeleton}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character46"
                geometry={nodes['Text-character46'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character46'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow46"
                geometry={nodes.Arrow46.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow46.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control46"
                geometry={nodes['Text-control46'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control46'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC46"
                geometry={nodes['Text-ABC46'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC46'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base47"
                geometry={nodes['key-base47'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base47'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 44" position={[548.4, 0, -32.72]}>
              <mesh
                name="Text-character special47"
                geometry={nodes['Text-character special47'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special47'].skeleton}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character47"
                geometry={nodes['Text-character47'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character47'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow47"
                geometry={nodes.Arrow47.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow47.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control47"
                geometry={nodes['Text-control47'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control47'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC47"
                geometry={nodes['Text-ABC47'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC47'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base48"
                geometry={nodes['key-base48'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base48'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 43" position={[426.61, 0, -32.72]}>
              <mesh
                name="Text-character special48"
                geometry={nodes['Text-character special48'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special48'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character48"
                geometry={nodes['Text-character48'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character48'].skeleton}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow48"
                geometry={nodes.Arrow48.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow48.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control48"
                geometry={nodes['Text-control48'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control48'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC48"
                geometry={nodes['Text-ABC48'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC48'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base49"
                geometry={nodes['key-base49'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base49'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 42" position={[304.82, 0, -32.72]}>
              <mesh
                name="Text-character special49"
                geometry={nodes['Text-character special49'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special49'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character49"
                geometry={nodes['Text-character49'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character49'].skeleton}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow49"
                geometry={nodes.Arrow49.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow49.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control49"
                geometry={nodes['Text-control49'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control49'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC49"
                geometry={nodes['Text-ABC49'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC49'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base50"
                geometry={nodes['key-base50'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base50'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 40" position={[670.19, 0, -32.72]}>
              <mesh
                name="Text-character special50"
                geometry={nodes['Text-character special50'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special50'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character50"
                geometry={nodes['Text-character50'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character50'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow50"
                geometry={nodes.Arrow50.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow50.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control50"
                geometry={nodes['Text-control50'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control50'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC50"
                geometry={nodes['Text-ABC50'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC50'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base51"
                geometry={nodes['key-base51'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base51'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 35" position={[183.03, 0, 89.07]}>
              <mesh
                name="Text-character special51"
                geometry={nodes['Text-character special51'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special51'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character51"
                geometry={nodes['Text-character51'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character51'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow51"
                geometry={nodes.Arrow51.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow51.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control51"
                geometry={nodes['Text-control51'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control51'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC51"
                geometry={nodes['Text-ABC51'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC51'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base52"
                geometry={nodes['key-base52'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base52'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 34" position={[-183.03, 0, 89.07]}>
              <mesh
                name="Text-character special52"
                geometry={nodes['Text-character special52'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special52'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character52"
                geometry={nodes['Text-character52'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character52'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow52"
                geometry={nodes.Arrow52.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow52.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control52"
                geometry={nodes['Text-control52'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control52'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC52"
                geometry={nodes['Text-ABC52'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC52'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base53"
                geometry={nodes['key-base53'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base53'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 33" position={[-304.82, 0, 89.07]}>
              <mesh
                name="Text-character special53"
                geometry={nodes['Text-character special53'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special53'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character53"
                geometry={nodes['Text-character53'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character53'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow53"
                geometry={nodes.Arrow53.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow53.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control53"
                geometry={nodes['Text-control53'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control53'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC53"
                geometry={nodes['Text-ABC53'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC53'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base54"
                geometry={nodes['key-base54'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base54'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 32" position={[-426.61, 0, 89.07]}>
              <mesh
                name="Text-character special54"
                geometry={nodes['Text-character special54'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special54'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character54"
                geometry={nodes['Text-character54'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character54'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow54"
                geometry={nodes.Arrow54.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow54.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control54"
                geometry={nodes['Text-control54'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control54'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC54"
                geometry={nodes['Text-ABC54'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC54'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base55"
                geometry={nodes['key-base55'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base55'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 28" position={[-670.19, 0, -155.1]}>
              <mesh
                name="Text-character special55"
                geometry={nodes['Text-character special55'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special55'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character55"
                geometry={nodes['Text-character55'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character55'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow55"
                geometry={nodes.Arrow55.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow55.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control55"
                geometry={nodes['Text-control55'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control55'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC55"
                geometry={nodes['Text-ABC55'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC55'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base56"
                geometry={nodes['key-base56'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base56'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 27" position={[-670.19, 0, -275.85]}>
              <mesh
                name="Text-character special56"
                geometry={nodes['Text-character special56'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special56'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character56"
                geometry={nodes['Text-character56'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character56'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow56"
                geometry={nodes.Arrow56.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow56.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control56"
                geometry={nodes['Text-control56'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control56'].skeleton}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC56"
                geometry={nodes['Text-ABC56'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC56'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base57"
                geometry={nodes['key-base57'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base57'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance 17" position={[-548.4, 0, -275.85]}>
              <mesh
                name="Text-character special57"
                geometry={nodes['Text-character special57'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special57'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character57"
                geometry={nodes['Text-character57'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character57'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow57"
                geometry={nodes.Arrow57.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow57.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control57"
                geometry={nodes['Text-control57'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control57'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC57"
                geometry={nodes['Text-ABC57'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC57'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base58"
                geometry={nodes['key-base58'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base58'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
            <group name="Key Instance10" position={[-548.4, 0, -155.1]}>
              <mesh
                name="Text-character special58"
                geometry={nodes['Text-character special58'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character special58'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-3.34, 39.95, 5.81]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-character58"
                geometry={nodes['Text-character58'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-character58'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.11, 40.56, 8.69]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Arrow58"
                geometry={nodes.Arrow58.geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes.Arrow58.skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[-1.09, 40.26, -1.23]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1}
              />
              <mesh
                name="Text-control58"
                geometry={nodes['Text-control58'].geometry}
                material={materials['Text-white']}
                skeleton={nodes['Text-control58'].skeleton}
                visible={false}
                castShadow
                receiveShadow
                position={[0, 41.66, 3.6]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="Text-ABC58"
                geometry={nodes['Text-ABC58'].geometry}
                material={materials['TEXT-2  control']}
                skeleton={nodes['Text-ABC58'].skeleton}
                castShadow
                receiveShadow
                position={[-2.79, 40.44, 0.58]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={1}
              />
              <mesh
                name="key-base59"
                geometry={nodes['key-base59'].geometry}
                material={materials['Key-red']}
                skeleton={nodes['key-base59'].skeleton}
                castShadow
                receiveShadow
                position={[-0.93, -1.99, 0]}
              />
            </group>
          </group>
          <group name="lamp" position={[1253.19, 522.04, -922.16]} scale={[2.16, 2.36, 2.3]}>
            <mesh
              name="Cylinder 4"
              geometry={nodes['Cylinder 4'].geometry}
              material={materials['Cylinder 4 Material']}
              skeleton={nodes['Cylinder 4'].skeleton}
              castShadow
              receiveShadow
              position={[0.25, -107.09, -0.71]}
              scale={0.85}
            />
            <mesh
              name="Cylinder 6"
              geometry={nodes['Cylinder 6'].geometry}
              material={materials['Cylinder 6 Material']}
              skeleton={nodes['Cylinder 6'].skeleton}
              castShadow
              receiveShadow
              position={[-0.16, -65.35, -0.71]}
              scale={0.85}
            />
            <mesh
              name="Cylinder 5"
              geometry={nodes['Cylinder 5'].geometry}
              material={materials['Cylinder 5 Material']}
              skeleton={nodes['Cylinder 5'].skeleton}
              castShadow
              receiveShadow
              position={[-0.16, -149.66, -0.71]}
              scale={0.85}
            />
            <mesh
              name="Cylinder 3"
              geometry={nodes['Cylinder 3'].geometry}
              material={materials['Cylinder 3 Material']}
              skeleton={nodes['Cylinder 3'].skeleton}
              castShadow
              receiveShadow
              position={[-0.53, -212.52, 1.57]}
              scale={1}
            />
            <mesh
              name="Cylinder 21"
              geometry={nodes['Cylinder 21'].geometry}
              material={materials['Cylinder 21 Material']}
              skeleton={nodes['Cylinder 21'].skeleton}
              castShadow
              receiveShadow
              position={[-0.25, -296.92, 0.71]}
            />
          </group>
          <group name="table" position={[1505.73, -402.12, -561.28]} scale={[0.74, 0.73, 0.7]}>
            <mesh
              name="Rectangle"
              geometry={nodes.Rectangle.geometry}
              material={materials['Rectangle Material']}
              skeleton={nodes.Rectangle.skeleton}
              castShadow
              receiveShadow
              position={[-236.25, 158.44, 965.01]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <pointLight
            name="Point Light"
            // castShadow
            intensity={9.6}
            distance={1011}
            color="#c2d3fe"
            position={[319.47, 509.35, -330.97]}
            rotation={[0, -Math.PI / 6, 0]}
          />
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={0.7}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
          />
          <hemisphereLight
            name="Default Ambient Light"
            intensity={0.75}
            color="#eaeaea"
            position={[0, 1, 0]}
          />
        </group>
      </group>
    </>
  );
}
