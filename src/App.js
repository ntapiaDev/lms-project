
import React from "react"
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Views from "./Views";
import Header from "./components/header";

export default function App() {
  
  return (
    <Router>
      <React.Fragment>
        <Header />
        <main>
          <Views/>
        </main>
        <footer>
          <p>Nicolas | Damirdine | Christopher</p>
        </footer>
      </React.Fragment>
    </Router>
  );
}


