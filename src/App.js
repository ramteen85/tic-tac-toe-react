import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import TwoPlayer from './pages/TwoPlayer/TwoPlayer';
import Easy from './pages/Easy/Easy';
import Hard from './pages/Hard/Hard';
import Credits from './pages/Credits/Credits';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/two-player" element={<TwoPlayer />}></Route>
      <Route path="/single-easy" element={<Easy />}></Route>
      <Route path="/single-hard" element={<Hard />}></Route>
      <Route path="/credits" element={<Credits />}></Route>
    </Routes>
  );
}

export default App;
