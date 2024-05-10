import { useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import { mapAtom } from "./SocketManager";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";

export const Item = ({ item }) => {
	const { name, gridPosition, size } = item;
	const [map] = useAtom(mapAtom);
	const { scene } = useGLTF(`models/items/${name}.glb`);
	const clone = useMemo(() => SkeletonUtils.clone(scene, [scene]));
	return (
		<primitive
			object={clone}
			position={[
				size[0] / map.gridDivision / 2 + gridPosition[0] / map.gridDivision,
				0,
				size[1] / map.gridDivision / 2 + gridPosition[1] / map.gridDivision,
			]}
		/>
	);
};
