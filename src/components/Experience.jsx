import {
	ContactShadows,
	Environment,
	OrbitControls,
	useCursor,
} from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom, mapAtom, socket } from "./SocketManager";
import { useState } from "react";
import * as THREE from "three";
import { Item } from "./Items";

export const Experience = () => {
	const [characters] = useAtom(charactersAtom);
	const [onFloor, setOnFloor] = useState(false);
	const [map] = useAtom(mapAtom);
	useCursor(onFloor);

	return (
		<>
			<Environment preset="sunset" />
			<ambientLight intensity={0.3} />
			{/* <ContactShadows blur={2} /> */}
			<OrbitControls />

			{map.items.map((item, idx) => (
				<Item key={`${item.name}-${idx}`} item={item} />
			))}

			<mesh
				rotation-x={-Math.PI / 2}
				position-y={-0.001}
				onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
				onPointerEnter={() => setOnFloor(true)}
				onPointerLeave={() => setOnFloor(false)}
				position-x={map.size[0] / 2}
				position-z={map.size[1] / 2}
			>
				<planeGeometry args={map.size} />
				<meshStandardMaterial color="lightblue" />
			</mesh>

			{characters.map((character) => (
				<AnimatedWoman
					key={character.id}
					id={character.id}
					position={
						new THREE.Vector3(
							character.position[0],
							character.position[1],
							character.position[2]
						)
					}
					hairColor={character.hairColor}
					topColor={character.topColor}
					bottomColor={character.bottomColor}
				/>
			))}
		</>
	);
};
