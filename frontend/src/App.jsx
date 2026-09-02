import AppRoutes from "./routes/AppRoutes";
import Register from "./pages/public/Register";
import { Route } from "react-router-dom";

function App() {
    return <AppRoutes />;
    <Route path="/register" element={<Register />} />
}

export default App;