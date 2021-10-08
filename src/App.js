import "./App.css";
import Movielist from "./components/Movielist";
import { Route } from "react-router-dom";


function App() {
  return (
    <>
      <Route exact path="/" component={Movielist} />
    </>
  );
}

export default App;
