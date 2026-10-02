import { CreateWorkflow } from "./components/CreateWorkflow";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/create-workflow" element={<CreateWorkflow />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
