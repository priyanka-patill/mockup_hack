import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WorldSelector from "./pages/worlds/WorldSelector";
import PrincessWorld from "./pages/worlds/PrincessWorld";
import MarvelWorld from "./pages/worlds/MarvelWorld";
import PixarWorld from "./pages/worlds/PixarWorld";

function App() {
  return (
    <Router>
      <Routes>
        {/* World Selector — Landing */}
        <Route path="/" element={<WorldSelector />} />

        {/* Worlds */}
        <Route path="/princess" element={<PrincessWorld />} />
        <Route path="/marvel" element={<MarvelWorld />} />
        <Route path="/pixar" element={<PixarWorld />} />
      </Routes>
    </Router>
  );
}

export default App;
