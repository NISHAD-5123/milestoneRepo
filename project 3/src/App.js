import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim()) {
      const newTodo = { id: Date.now(), title: input, status: 'Pending' };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const handleToggleStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === 'Pending' ? 'Completed' : 'Pending' }
          : todo
      )
    );
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
      </header>
      <main>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <div className="todo-list">
          {todos.map((todo, index) => (
            <div key={todo.id} className={`todo-item ${todo.status.toLowerCase()}`}>
              <div className="todo-content">
                <span className="todo-number">{index + 1}.</span>
                <span className="todo-title">{todo.title}</span>
                <span className="todo-status">({todo.status})</span>
              </div>
              <div className="todo-actions">
                <button onClick={() => handleToggleStatus(todo.id)}>Update Status</button>
                <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

