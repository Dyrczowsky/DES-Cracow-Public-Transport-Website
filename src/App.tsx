import Faq from './components/Faq.tsx'
import './App.css'
import Header from "./components/Header.tsx";
import Sim from "./components/Sim.tsx";

function App() {

  return (
    <><Header />
        <Sim/>
      <Faq />

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
