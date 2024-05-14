import { useEffect } from "react";
import { io } from "socket.io-client";
import { atom, useAtom } from "jotai";

export const socket = io("http://220.119.73.171:5000");
// export const socket = io("http://220.119.73.171:5000");
export const charactersAtom = atom([]);
export const mapAtom = atom(null);
export const userAtom = atom(null);
export const nicknameAtom = atom(null);

export const SocketManager = () => {
	const [_characters, setCharacters] = useAtom(charactersAtom);
	const [_map, setMap] = useAtom(mapAtom);
	const [_user, setUser] = useAtom(userAtom);
	const [_nickname, setNickName] = useAtom(nicknameAtom);
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
			console.log(value);
			setMap(value.map);
			setUser(value.id);
		}

		function onHello2(value) {
			console.log(value);
			setNickName(value.id);
		}

		function onPlayerMove(value) {
			setCharacters((prev) => {
				return prev.map((character) => {
					if (character.id === value.id) {
						socket.emit("moveDone", { id: character.id });
						return value;
					}
					return character;
				});
			});
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisConnect);
		socket.on("characters", onCharacters);
		socket.on("hello", onHello);
		socket.on("hello2", onHello2);
		socket.on("playerMove", onPlayerMove);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisConnect);
			socket.off("characters", onCharacters);
			socket.off("hello", onHello);
			socket.off("hello2", onHello2);
			socket.off("playerMove", onPlayerMove);
		};
	}, []);
};
