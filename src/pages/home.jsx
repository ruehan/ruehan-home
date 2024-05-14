import { Canvas } from "@react-three/fiber";
import { SocketManager } from "../components/SocketManager";
import { UI } from "../components/UI";
import { Experience } from "../components/Experience";

export const Home = () => {
	return (
		<>
			<SocketManager />
			<Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
				<color attach="background" args={["#ececec"]} />
				<Experience />
			</Canvas>
			<UI />
		</>
	);
};
