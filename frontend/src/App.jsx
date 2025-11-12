import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://13.233.190.179:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      setError(null);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error('Failed to add todo');
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setInputText('');
    } catch (err) {
      setError(err.message);
      console.error('Error adding todo:', err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError(err.message);
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a new todo..."
            className="todo-input"
          />
          <button type="submit" className="add-button">
            Add Todo
          </button>
        </form>

        {loading && <div className="loading">Loading...</div>}

        <div className="todo-list">
          {todos.length === 0 && !loading ? (
            <div className="empty-state">No todos yet. Add one above!</div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
