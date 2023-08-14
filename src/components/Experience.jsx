import { Center, ContactShadows, Environment } from "@react-three/drei";
import Headset from "./headset/Headset";
import HeadsetController from "./headset/HeadsetController";
import Carroussel from "./Carroussel";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />

      <ContactShadows
        position={ [ 0, -.8, 0 ] }
        opacity={ .25 }
      />

      <Center
        disableX
      >
        <group
          position={ [ -1, 0, 0 ] }
        >
          <Headset
            position={ [ 0, 0, 0 ] }
            rotation={ [ Math.PI * 2.1, Math.PI * .2, 0 ] }
          />
          <HeadsetController
            position={ [ -.9, 0, 0 ] }
            rotation={ [ Math.PI * 1.9, Math.PI * .4, 0 ] }
          />
        </group>
      </Center>
      <Carroussel />
    </>
  );
};
