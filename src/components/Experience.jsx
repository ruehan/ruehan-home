import { Environment, OrbitControls } from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";

export const Experience = () => {
	return (
		<>
			<Environment preset="sunset" />
			<ambientLight intensity={0.3} />
			<OrbitControls />
			<AnimatedWoman />
		</>
	);
};
