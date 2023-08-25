import React from 'react';
import './Popup.css';
import { useFetch } from '../hooks/useFetch';

interface ITodoItem {
      id: number,
      todo: string,
      completed: boolean,
      userId: number
}

interface ITodos {
  todos: ITodoItem[]
}

function Popup() {
  const [data, loading] = useFetch<ITodos>('https://dummyjson.com/todos',  { todos: [] });

  if(loading) return <p>Loading</p>

  console.log('data', data)
  return (
    <div className="App">
      {data.todos.map((todo, index) => {
        return(
          <div key={index}>
            <p> Item Id: {todo.id}</p>
            <p> Title: {todo.todo}</p>
            <p> Completed: {todo.completed}</p>
          </div>
        )
        
      })}
     Hello World
    </div>
  );
}

export default Popup;
