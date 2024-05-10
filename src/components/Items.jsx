import { useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import { mapAtom } from "./SocketManager";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";

export const Item = ({ item }) => {
	const { name, gridPosition, size, rotation } = item;
	const [map] = useAtom(mapAtom);
	const { scene } = useGLTF(`models/items/${name}.glb`);
	const clone = useMemo(() => SkeletonUtils.clone(scene, [scene]));
	const width = rotation === 1 || rotation === 3 ? size[1] : size[0];
	const height = rotation === 1 || rotation === 3 ? size[0] : size[1];
	return (
		<primitive
			object={clone}
			position={[
				width / map.gridDivision / 2 + gridPosition[0] / map.gridDivision,
				0,
				height / map.gridDivision / 2 + gridPosition[1] / map.gridDivision,
			]}
		/>
	);
};
