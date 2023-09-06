import React, { useEffect, useState } from "react";
import "./Popup.css";
import { useFetch } from "../hooks/useFetch";
import { DropDown } from "../components/DropDown";
import { SelectChangeEvent, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { CardBox  } from "../components/CardBox";
import { LogInOut  } from "../components/LogInOut";


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
  const [data, loading] = useFetch<ITasks>(
    "https://dummyjson.com/todos?limit=20&skip=10",
    { todos: [] }
  );
  // const [removeData, setRemoveData] = useFetch<ITasks>(
  //   `https://dummyjson.com/todos/${id}`,
  //   { todos: [] }
  // );
  const [tasks, setTasks] = useState<ITaskItem[]>([]);
  const [selectTask, setSelectTask] = useState<{
    id: number | null;
    value: string;
    todo: string;
    completed: boolean;
  }>({ id: null, value: "", completed: false, todo: "" });
  const [addedTasks, setAddedTasks] = useState<{ id: number | null; value: string; todo: string; completed: boolean; }[]>([]);
  const [isLogged, setIslogged] = useState<boolean>(false);

  useEffect(() => {
    const tasksData = data.todos.map((task) => task);
    setTasks(tasksData);
    console.log("tasksData", tasksData);
  }, [data]);

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
      //...selectTask,
      value: e.target.value,
      id: selectedTask ? selectedTask.id : null,
      todo: selectedTask ? selectedTask.todo : "",
      completed: selectedTask ? selectedTask.completed : false,
    });
  };

  const addTaskHandle = () => {
    if (selectTask.id !== null) {
      setAddedTasks([...addedTasks, selectTask]);
     
      fetch(`https://dummyjson.com/todos/${selectTask.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() =>
          setTasks(
            tasks.filter((task) => task.id !== selectTask.id)
          )
        );
    } 

    setSelectTask({id: null, value: "", completed: false, todo: ""})
  }

  const onCheckedHandle = () => {
    const updatedTask = data.todos.map((task) =>
      task.id === selectTask.id
        ? { ...task, completed: !selectTask.completed }
        : task
    );

    setTasks(updatedTask);
  };

  const logInHandle = () => {
    setIslogged((prevSetLogIn) => !prevSetLogIn );
  }

  const logOutHandle = () => {
    setIslogged((prevSetLogOut) => !prevSetLogOut );
  }

  return (
    <div>
      {isLogged ? (
        <div>
        <LogInOut colorStyle="success" onLogInOut={logOutHandle} textBtn="Log Out" /> 
          <DropDown
            options={tasks.map((task) => task.todo)}
            value={selectTask.value}
            onChange={handleChange}
            label="Select a Task"
          />
          <div style={{ margin: "10px auto", width: '100%' }}>
            <Button onClick={addTaskHandle} fullWidth={true} variant="contained" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} endIcon={<AddIcon sx={{ color: "white" }} />}>Add task</Button>
          </div>

          {addedTasks.map((task) => (
            <CardBox
              key={task.id}
              id={task.id !== null ? task.id : 0}
              value={task.value}
              todo={task.todo}
              completed={task.completed}
              onChecked={onCheckedHandle}
            />
          ))}
        </div>
      ) : (
        <div>
          <LogInOut colorStyle="error" onLogInOut={logInHandle} textBtn="Log In" />
        </div>
        
      )}
    </div>
  );
}

export default Popup;

