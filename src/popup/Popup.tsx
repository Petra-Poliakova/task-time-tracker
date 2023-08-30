import React, { useState } from "react";
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
  const [data, loading] = useFetch<ITasks>("https://dummyjson.com/todos", {
    todos: [],
  });
  const [selectValue, setSelectValue] = useState<{
    id: number | null;
    value: string;
    completed: boolean;
  }>({
    value: "",
    id: null,
    completed: false,
  });

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
    setSelectValue({
      ...selectValue,
      value: e.target.value,
      id: selectedTask ? selectedTask.id : null,
      completed: selectedTask ? selectedTask.completed : false,
    });
  };

  console.log("data", data);
  return (
    <div>
      <DropDown
        options={data.todos.map((task) => task.todo)}
        value={selectValue.value}
        onChange={handleChange}
        label="Select a Task"
      />
      <CardBox />
      {selectValue && (
        <div>
          <p> Id: {selectValue.id}</p>
          <p> Title: {selectValue.value}</p>
          <p> Completed: {selectValue.completed.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default Popup;
