import React, { useState } from 'react';
import Arrow from "./assets/arrow-thin-chevron-bottom-icon.svg"


  interface Task {
    id: number;
    text: string;
    completed: boolean;
  }

  const TodoApp: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    const handleNewTaskChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setNewTaskText(event.target.value);
    };

    const handleNewTaskAddition = () => {
      if (newTaskText.trim() !== "") {
        const newTask: Task = {
          id: Date.now(),
          text: newTaskText.trim(),
          completed: false,
        };
        setTasks([...tasks, newTask]);
        setNewTaskText("");
      }
    };

    const toggleTaskCompletion = (taskId: number) => {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    };

    const handleClearCompleted = () => {
      const uncompletedTasks = tasks.filter((task) => !task.completed);
      setTasks(uncompletedTasks);
    };

    const uncompletedTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    const filteredTasks =
      filter === "active"
        ? uncompletedTasks
        : filter === "completed"
        ? completedTasks
        : tasks;

    const itemsLeft = uncompletedTasks.length;

    return (
      <>
        <h1>todos</h1>
        <div className="block">
          <div className="paper1"></div>
          <div className="paper2"></div>
          <div className="container">
            <div className="text-input">
              <img src={Arrow} alt="" />
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTaskText}
                onChange={handleNewTaskChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleNewTaskAddition();
                  }
                }}
              />
            </div>

            <div className="results">
              {filteredTasks.map((task) => (
                <div key={task.id} className="task">
                  <label className="contained">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                    <span
                      className={`taskText ${task.completed ? "completed" : ""}`}
                    >
                      {task.text}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <div className="btn-block">
              <h6> {itemsLeft} Items left </h6>
              <div className="middle-btn">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("completed")}>
                  Completed
                </button>
              </div>
              <button onClick={handleClearCompleted}>Clear Completed</button>
            </div>
          </div>
        </div>
      </>
    );
  };

export default TodoApp;
