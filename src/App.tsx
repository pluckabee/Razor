import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import "./App.css";
import { SearchView } from "./views/SearchView";

import "./App.css";
import { SingleTitleView } from "./views/SingleTitleView";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchView/>} />
          <Route path="/movie/:imdbID" element={<SingleTitleView/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
