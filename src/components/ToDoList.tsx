import React, { useState } from 'react';
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [visibleAll, setVisibleAll] = useState<boolean>(true);
  const [activeOrCompleted, setActiveOrCompleted] = useState<boolean>(true);

  
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj: Task = {
        id: new Date().getTime().toString(),
        title: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
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

  const handleAllVisible = () => {
    setVisibleAll(true);
  } 

  const handleVisibleActive = () => {
    if(visibleAll !== false){
        setVisibleAll(false)
    }
    setActiveOrCompleted(true)
  }

  const handlVisibleCompleted = () => {
    if(visibleAll !== false){
        setVisibleAll(false)
    }
    setActiveOrCompleted(false)
  }

  const allRender = (_filter?: (task: Task) => boolean) => {
    if(_filter == undefined){
      return(
        tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskStatus(task.id)}
              />
              {task.completed ? (
                  <input
                  className='donetask'
                  type="text"
                  value={task.title || ""}
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
        ))
      )
    } else{
      return tasks.filter(_filter).map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskStatus(task.id)}
          />
          {task.completed ? (
            <input className="donetask" type="text" value={task.title || ""} readOnly />
          ) : (
            <input
              type="text"
              defaultValue={task.title}
              onBlur={(e) => editTask(task.id, e.target.value)}
            />
          )}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ));
    }
    
  }

  const activeOrCompletedRender = (stateActive: boolean) => {
    return stateActive ? allRender((task) => !task.completed) : allRender((task) => task.completed)
  }

  return (
      <div className='container'>
        <h1>ToDoList</h1>
        <div>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className='task'>
          {visibleAll ? allRender() : activeOrCompletedRender(activeOrCompleted)}
        </ul>
        <div className='categories'>
          <button onClick={handleAllVisible}>All</button>
          <button onClick={handleVisibleActive}>Active</button>
          <button onClick={handlVisibleCompleted}>Completed</button>
        </div>
        <span>{`Осталось выполнить ${tasks.filter((i: { completed: any; }) => !i.completed).length} задачи`}</span>
      </div>
  );
};

export default ToDoList;