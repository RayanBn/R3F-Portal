import { CameraControls, Environment, MeshPortalMaterial, OrbitControls, useCursor, useTexture } from "@react-three/drei";
import { useFrame} from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import * as THREE from "three";
import { easing } from "maath";

const damp = THREE.MathUtils.damp;
const state = proxy({
    clicked: null,
    doubleClick: null,
    images: [
        "./360/anime_room.jpg",
        "./360/anime_sun.jpg",
        "./360/fantasy.jpg",
        "./360/holographic.jpg",
    ],
});

const Item = ({ ...props }) => {
    const { image, position, index, camera, setHovered } = props;
    const { clicked, doubleClick } = useSnapshot(state);
    const [ underworld, setUnderworld ] = useState(false);
    const scale = [ .27, 1, 1 ];
    const ref = useRef();
    const meshref = useRef();
    const portalref = useRef();
    const map = useTexture(image);
    const [ width, setWidth ] = useState(1);
    const [ height, setHeight ] = useState(1);

    const clickFunc = () => {
        state.clicked = index === clicked ? null : index;
    }

    const doubleClickFunc = () => {
        state.doubleClick = index === doubleClick ? null : index
        setUnderworld(true);
    }

    const missedPointerFunc = () => {
        state.doubleClick = null;
        if (underworld) {
            camera.current.setLookAt(0, 0, 5, 0, 0, 0, true);
            setUnderworld(false);
        }
    }

    useEffect(() => {
    }, [ width, height ]);

    useFrame((_state, delta) => {
        const worldOpen = doubleClick === index ? 1 : 0;

        setWidth(damp(ref.current.parameters.width, clicked === index ? 1 : scale[0], 6, delta));
        setHeight(damp(ref.current.parameters.height, clicked === index ? 1.2 : 1, 6, delta));
        if (clicked !== null && clicked < index)
            meshref.current.position.x = damp(meshref.current.position.x, position[0] + .35, 6, delta);
        else if (clicked !== null && clicked > index)
            meshref.current.position.x = damp(meshref.current.position.x, position[0] - .35, 6, delta);
        else
            meshref.current.position.x = damp(meshref.current.position.x, position[0], 6, delta);
        easing.damp(portalref.current, "blend", worldOpen, .1, delta);
    });

    return (
        <>
            <mesh
                onClick={ clickFunc }
                onDoubleClick={ doubleClickFunc }
                onPointerMissed={ missedPointerFunc }
                onPointerOver={ () => setHovered(true) }
                onPointerOut={ () => setHovered(false) }
                position={ position }
                ref={ meshref }
                castShadow
                receiveShadow
            >
                <planeGeometry
                    ref={ ref }
                    args={ [ width, height ] }
                    scale={ scale }
                />
                <MeshPortalMaterial
                    ref={ portalref }
                    side={ THREE.DoubleSide }
                >
                    <ambientLight intensity={ 1 } />
                    <Environment preset="sunset" />
                    <mesh>
                        <sphereGeometry args={ [ 5, 32, 32 ] } />
                        <meshBasicMaterial map={ map } side={ THREE.BackSide } />
                    </mesh>
                </MeshPortalMaterial>
            </mesh>
        </>
    );
}

const Carroussel = () => {
    const { images } = useSnapshot(state);
    const [ hovered, setHovered ] = useState(null);
    useCursor(hovered);
    const camera = useRef();

    return (
        <>
            <CameraControls
                ref={ camera }
                maxPolarAngle={ Math.PI / 2 }
                minPolarAngle={ Math.PI / 2 }
                enablePan={ false }
            />
            <group
                position={ [ .8, 0, 0 ] }
            >
                {
                    images.map((image, index) => {
                        return (
                            <Item
                                key={ index }
                                index={ index }
                                image={ image }
                                camera={ camera }
                                position={ [ index * .3, 0, 0 ] }
                                setHovered={ setHovered }
                            />
                        );
                    })
                }
            </group>
        </>
    );
}

export default Carroussel;
