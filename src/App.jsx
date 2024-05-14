import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Info } from "./pages/info/[id]";

function App() {
	return (
		<Routes>
			<Route path="/info/:id" element={<Info />}></Route>
			<Route path="/" element={<Home />}></Route>
		</Routes>
	);
}

export default App;
