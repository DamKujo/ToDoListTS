import { useEffect, useState } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';
type Theme = 'light' | 'dark';

// Unique id with a fallback for environments where crypto.randomUUID is unavailable (e.g. jsdom).
const createId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Russian pluralization for "задача" (e.g. 1 задача, 2 задачи, 5 задач).
const pluralizeTasks = (count: number): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return 'задача';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'задачи';
  return 'задач';
};

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');
  const [theme, setTheme] = useState<Theme>('light');

  // Apply the theme to the whole app via a data-theme attribute on the root element.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const addTask = () => {
    const title = newTask.trim();
    if (title === '') return;
    const newTaskObj: Task = {
      id: createId(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <div className="container">
      <h1>ToDoList</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            aria-label="Toggle dark mode"
          />
          <span className="slider" />
          <span className="theme-label">{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}</span>
        </label>
      </div>
      <ul className="task">
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id)}
              aria-label="Toggle task status"
            />
            {task.completed ? (
              <input
                className="donetask"
                type="text"
                value={task.title}
                readOnly
              />
            ) : (
              <input
                type="text"
                defaultValue={task.title}
                onBlur={(e) => editTask(task.id, e.target.value)}
              />
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="categories">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <span>{`Осталось выполнить ${remaining} ${pluralizeTasks(remaining)}`}</span>
    </div>
  );
};

export default ToDoList;
