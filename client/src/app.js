import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles.css";

import HSSurvey from "./components/hsSurvey";
import Payroll from "./components/payroll";

function App() {
  return (
    <div className="App">
      <h1>H&S Survey</h1>
      <Router>
        <Route exact path="/" component={Payroll} />
        <Route path="/training" component={HSSurvey} />
      </Router>
    </div>
  );
}

export default App;