import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom } from "./SocketManager";

export const Experience = () => {
	const [characters] = useAtom(charactersAtom);

	return (
		<>
			<Environment preset="sunset" />
			<ambientLight intensity={0.3} />
			<ContactShadows blur={2} />
			<OrbitControls />
			{characters.map((character) => (
				<AnimatedWoman
					key={character.id}
					position={character.position}
					hairColor={character.hairColor}
					topColor={character.topColor}
					bottomColor={character.bottomColor}
				/>
			))}
		</>
	);
};
