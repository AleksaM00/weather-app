import "./App.css";
import Header from "./components/Header/Header";
import Weather from "./components/Weather/Weather";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
