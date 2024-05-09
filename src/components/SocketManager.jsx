import { useEffect } from "react";
import { io } from "socket.io-client";
import { atom, useAtom } from "jotai";

export const socket = io("http://220.119.73.171:5000");
export const charactersAtom = atom([]);

export const SocketManager = () => {
	const [_characters, setCharacters] = useAtom(charactersAtom);
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

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisConnect);
		socket.on("characters", onCharacters);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisConnect);
			socket.off("characters", onCharacters);
		};
	}, []);
};
