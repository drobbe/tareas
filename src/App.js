import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  Todos: () => true,
  Activos: task => !task.completed,
  Completados: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('Todos');

  async function toggleTaskCompleted(id) {
    let task = tasks.find((t) => t.id === id);
    try {
      let body = {completed:!task.completed};
      let response = await fetch(`http://localhost:8000/tasks/${id}`,
      {
        method:'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(body)
      }
      );
      const updatedTasks = tasks.map(task => {
        // if this task has the same ID as the edited task
        if (id === task.id) {
          // use object spread to make a new obkect
          // whose `completed` prop has been inverted
          return {...task, completed: !task.completed}
        }
        return task;
      });
      setTasks(updatedTasks);
      
    } catch (error) {
      
    }

  }


  async function deleteTask(id) {
    try {
      await fetch(`http://localhost:8000/tasks/${id}`,{method:'DELETE'})
      const remainingTasks = tasks.filter(task => id !== task.id);
      setTasks(remainingTasks);
      
    } catch (error) {
    }
  }


  async function editTask(id, newName) {
    try {
      let body = {name:newName};
      let response = await fetch(`http://localhost:8000/tasks/${id}`,
      {
        method:'PUT',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(body)
      }
      );
      const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
        if (id === task.id) {
          //
          return {...task, name: newName}
        }
        return task;
      });
      setTasks(editedTaskList);
      
    } catch (error) {
      
    }

  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  async function addTask(name) {
    try {
      let body = {name:name,completed:false};
      let response = await fetch(`http://localhost:8000/tasks`,
      {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(body)
      }
      );
      response = await response.json();
      setTasks([...tasks, response.data]);
     
    } catch (error) {
      
    }
    
  }


  const tasksNoun = taskList.length !== 1 ? 'Tareas' : 'Tarea';
  const headingText = `${taskList.length} ${tasksNoun} Faltantes`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
