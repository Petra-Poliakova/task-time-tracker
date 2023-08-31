import React, { useEffect, useState } from "react";
import "./Popup.css";
import { useFetch } from "../hooks/useFetch";
import { DropDown } from "../components/DropDown";
import { SelectChangeEvent } from "@mui/material";
import { CardBox } from "../components/CardBox";

interface ITaskItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface ITasks {
  todos: ITaskItem[];
}

function Popup() {
  const [data, loading] = useFetch<ITasks>("https://dummyjson.com/todos?limit=20&skip=10", { todos: [] });
  const [tasks, setTasks] = useState<ITaskItem[]>([]);
  const [selectTask, setSelectTask] = useState<{ id: number | null; value: string; todo: string; completed: boolean; }>({id: null,  value: "",  completed: false, todo: "" });
  const [remainingTasks, setRemainingTasks] = useState<ITasks[]>([]);

  useEffect(()=>{
    const tasksData = data.todos.map((task) => task);
    setTasks(tasksData);
   console.log('tasksData', tasksData)
   },[data])
  
  if (loading) return <p>Loading...</p>;

  if (!data || !data.todos) {
    return <p>Data not available.</p>;
  }

  const handleChange = (
    e: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    const selectedTask = data.todos.find(
      (task) => task.todo === e.target.value
    );
      setSelectTask({
        ...selectTask,
        value: e.target.value,
        id: selectedTask ? selectedTask.id : null,
        todo: selectedTask ? selectedTask.todo : "",
        completed: selectedTask ? selectedTask.completed : false,
      });
      // if (selectedTask) {
      //   setRemainingTasks(data.todos.filter((task) => task.id !== selectedTask.id));
      // }
  };

  const onCheckedHandle = () => {
    const updatedTask = data.todos.map((task) =>
      task.id === selectTask.id
        ? { ...task, completed: !selectTask.completed }
        : task
    );

    //setTasks(updatedTask);
  };

  return (
    <div>
      <DropDown
        //options={data.todos.map((task) => task.todo)}
        options={tasks.map((task) => task.todo)}
        value={selectTask.value}
        onChange={handleChange}
        label="Select a Task"
      />
      {selectTask.id !== null && (
        <CardBox
        id={selectTask.id !== null ? selectTask.id : 0} 
        value={selectTask.value}
        todo={selectTask.todo}
        //completed={selectTask.completed}
        onChecked={onCheckedHandle}
      />)}
    </div>
  );
}

export default Popup;


//https://www.youtube.com/watch?v=vzrwpaYwE5s&list=PLBS1L3Ug2VVpgpDEcLmapOk52mVGv4MIu&index=3
//https://github.com/manshu/reactjs-chrome-extension-oauth2/blob/master/src/routes/Authentication.js

//https://www.youtube.com/watch?v=H-anyDrYHyg&list=PLIckDtOkqwLv56F0c8zbHDivaUQgJr9xw

//https://tasoskakour.com/blog/react-use-oauth2