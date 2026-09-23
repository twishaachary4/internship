import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("all");

  // save to the browser whenever these change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  function addTask(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: text.trim(), done: false }]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }
  function greet() {
  alert("Hello " + (name || "there"));
}

  const visible = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const doneCount = tasks.filter((t) => t.done).length;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="app">
      <header>
        <p className="date">{today}</p>
        <h1>
          Plan for{" "}
          <input
            className="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your name"
          />
        </h1>
        <p className="count">
          <button className="greet" onClick={greet}>Greet</button>
          {doneCount} of {tasks.length} done
        </p>
      </header>

      <form className="add" onSubmit={addTask}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        {["all", "active", "done"].map((f) => (
          <button
            key={f}
            className={filter === f ? "tab on" : "tab"}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="list">
        {visible.map((t) => (
          <li key={t.id} className={t.done ? "item done" : "item"}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTask(t.id)}
            />
            <span>{t.text}</span>
            <button className="remove" onClick={() => removeTask(t.id)}>
              remove
            </button>
          </li>
        ))}
      </ul>

      {visible.length === 0 && <p className="empty">Nothing here.</p>}

      {doneCount > 0 && (
        <button className="clear" onClick={clearDone}>
          Clear completed
        </button>
      )}
    </div>
  );
}

export default App;