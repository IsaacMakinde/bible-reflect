import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      {" "}
      <Header></Header>
      <AppRoutes />
      <Footer></Footer>
    </Router>
  );
}

export default App;
