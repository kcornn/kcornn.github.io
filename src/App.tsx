import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { ReactTyped } from "react-typed"

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Kali Cornn</h1>
      <ReactTyped strings={["software engineer"]} typeSpeed={40} />
      <div className="card">
        <p>hello world! portfolio in progress</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
