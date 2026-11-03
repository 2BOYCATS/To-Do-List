import React, { useState } from "react";
import { CalendarHeart } from "lucide-react";

const Header = ({ todo, setTodo }) => {
  const [newName, setNewname] = useState("");

  const hdlSubmit = (e) => {
    e.preventDefault();

    if (todo.length < 8) {
      const newTodo = {
        id: todo.length + 1,
        name: newName,
      };

      if (newName != "") {
        setTodo((prev) => [...prev, newTodo]);
      }
    } else alert("Task full");

    setNewname("");
  };

  return (
    <div>
      <div name="header" className="flex gap-4 p-4 -ml-3 mb-2">
        <CalendarHeart size={32} />
        <h1 className="text-2xl font-bold">To-Do List</h1>
      </div>

      <form onSubmit={(e) => hdlSubmit(e)}>
        <div className="relative">
          <input
            type="text"
            placeholder="Add your task"
            value={newName}
            onChange={(e) => setNewname(e.target.value)}
            autoFocus
            className="bg-white rounded-3xl outline-none px-3 py-2 w-full"
          />
          <button className="absolute right-1 top-1 bg-violet-400 rounded-2xl px-4 py-1 text-white hover:bg-violet-800 hover:scale-105 duration-500">
            ADD
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default Header;
