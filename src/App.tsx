import Faq from './components/Faq.tsx'
import './App.css'
import { Link } from "react-router-dom";
import Header from "./components/Header.tsx";

function App() {

  return (
    <>
        <Header />

        <Link to={"/sim"} className="btn mt-10 p-2 w-70 mx-auto bg-purple-950 text-white rounded-full hover:cursor-pointer hover:bg-purple-900">
          Zobacz jak to dziala
        </Link>

      <Faq />

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
