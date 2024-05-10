import { useEffect } from "react";
import { io } from "socket.io-client";
import { atom, useAtom } from "jotai";

export const socket = io("http://220.119.73.171:5000");
export const charactersAtom = atom([]);
export const mapAtom = atom(null);
export const userAtom = atom(null);

export const SocketManager = () => {
	const [_characters, setCharacters] = useAtom(charactersAtom);
	const [_map, setMap] = useAtom(mapAtom);
	const [_user, setUser] = useAtom(userAtom);
	useEffect(() => {
		function onConnect() {
			console.log("connect");
		}
		function onDisConnect() {
			console.log("disconnect");
		}

		function onCharacters(value) {
			console.log("characters", value);
			setCharacters(value);
		}

		function onHello(value) {
			setMap(value.map);
			setUser(value.id);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisConnect);
		socket.on("characters", onCharacters);
		socket.on("hello", onHello);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisConnect);
			socket.off("characters", onCharacters);
			socket.off("hello", onHello);
		};
	}, []);
};
