import { atom, useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { socket } from "../../components/SocketManager";

export const nicknameAtom = atom(null);

export const Info = () => {
	const params = useParams();
	const id = params.id;
	console.log(id);
	const { register, handleSubmit } = useForm();
	const [_nickname, setNickName] = useAtom(nicknameAtom);
	const navigate = useNavigate();

	const onSubmit = (data) => {
		socket.emit("init", { id, nickname: data.nickname });
		navigate("/");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("nickname")}></input>
			<input type="submit"></input>
		</form>
	);
};
