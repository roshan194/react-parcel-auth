import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./src/pages/Signup";
import Profile from "./src/pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
