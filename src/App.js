import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (toDo.trim() === '') {
      alert('ToDo cannot be empty');
      return;
    } 

    if (toDos.some((todo) => todo.text.toLowerCase() === toDo.toLowerCase())) {
      alert('ToDo already exists');
      return;
    }

    if (editId) {
      setToDos(
        toDos.map((todo) =>
          todo.id === editId ? { ...todo, text: toDo } : todo
        )
      );
      setEditId(null);
    } else {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
    }
    setToDo('');
  };

  const deleteTodo = (id) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, text) => {
    setEditId(id);
    setToDo(text);
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div key={obj.id} className="todo">
            <div className="left">
              <input
                onChange={(e) => {
                  setToDos(
                    toDos.map((todo) =>
                      todo.id === obj.id ? { ...todo, status: e.target.checked } : todo
                    )
                  );
                }}
                checked={obj.status}
                type="checkbox"
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i
                onClick={() => deleteTodo(obj.id)}
                className="fas fa-times"
              ></i>
              <i
                onClick={() => editTodo(obj.id, obj.text)}
                className="fas fa-edit"
              ></i>
            </div>
          </div>
        ))}

        <div>
          <h1 className="active">Active Tasks</h1>
          {toDos.map((obj) => {
            if (!obj.status) {
              return (
                <p key={obj.id} className="text">{obj.text}</p>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
