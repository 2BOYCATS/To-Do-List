import { useState } from "react"
import Header from "./Components/Headers/Header";
import Content from "./Components/Contents/Content";

const App = () => {
  const [todo, setTodo] = useState([])
  return (
    <div name="body" className="flex justify-center items-center min-h-screen bg-violet-100 p-8">
        <div name="card" className="w-full max-w-xl p-8 rounded-2xl shadow-2xl bg-violet-200"> 
            <Header todo={todo} setTodo={setTodo}></Header>
            <Content todo={todo} setTodo={setTodo}></Content>
        </div>
    </div>
  )
}

export default App
