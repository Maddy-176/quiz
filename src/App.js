import './App.css';
import Landingpage from './components/landingpage';
import Questions from './components/Questions';
import Result from './components/Result'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/result" element={<Result />} />

        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
