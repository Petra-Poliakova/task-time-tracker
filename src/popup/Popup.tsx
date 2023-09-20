import React, { useEffect, useState } from "react";
import "./Popup.css";
import { useFetch } from "../hooks/useFetch";
import { DropDown } from "../components/DropDown";
import { SelectChangeEvent, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CardBox } from "../components/CardBox";
import { Header } from "../components/Header";
//import { LogInOut  } from "../components/LogInOut";

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
    "https://dummyjson.com/todos?limit=150&skip=10",
    { todos: [] }
  );
  // const [removeData, setRemoveData] = useFetch<ITasks>(
  //   `https://dummyjson.com/todos/${id}`,
  //   { todos: [] }
  // );
  const [tasks, setTasks] = useState<ITaskItem[]>([]);
  const [selectTask, setSelectTask] = useState<{
    id: string;
    value: string;
    todo: string;
    completed: boolean;
  }>({ id: "", value: "", completed: false, todo: "" });
  //}>({ id: null, value: "", completed: false, todo: "" });
  const [activeTasks, setActiveTasks] = useState<
    { id: string; value: string; todo: string; completed: boolean }[]
  >([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState<{
    [taskId: string]: boolean;
  }>({});
  //const [isLogged, setIslogged] = useState<boolean>(false);

  useEffect(() => {
    const tasksData = data.todos
      .map((task) => task)
      .filter((filterData) => filterData.completed === false);
    setTasks(tasksData);
  }, [data]);

  useEffect(() => {
    chrome.storage.local.get(["activeTask"], (result) => {
      if (result.activeTask) {
        setActiveTasks(result.activeTask);
      }
    });
    chrome.storage.local.get(["isDisabled"], (result) => {
      if (result.isDisabled) {
        setIsBtnDisabled(result.isDisabled);
      }
    });
  }, []);

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
      id: selectedTask ? selectedTask.id.toString() : "",
      todo: selectedTask ? selectedTask.todo : "",
      completed: selectedTask ? selectedTask.completed : false,
    });
  };

  const addToActiveTasks = () => {
    if (selectTask.id) {
      //const updatedActiveTask = [...activeTasks, selectTask];
      const updatedActiveTask = [...activeTasks];
      updatedActiveTask.unshift(selectTask);

      setActiveTasks(updatedActiveTask);
      chrome.storage.local.set({ activeTask: updatedActiveTask });

      // fetch(`https://dummyjson.com/todos/${selectTask.id}`, {
      //   method: "DELETE",
      // })
      //   .then((response) => response.json())
      //   .then(() =>
      //     setTasks(
      //       tasks.filter((task) => task.id !== selectTask.id)
      //     )
      //   );
    }

    setSelectTask({ id: "", value: "", completed: false, todo: "" });
  };

  const onCheckedHandle = (taskId: string) => {
    const updatedTask = activeTasks.map((activeTask) =>
      activeTask.id.toString() === taskId
        ? { ...activeTask, completed: !activeTask.completed }
        : activeTask
    );
    setActiveTasks(updatedTask);
    chrome.storage.local.set({ activeTask: updatedTask });

    const isDisabledSelectTask = {
      ...isBtnDisabled,
      [taskId]: !isBtnDisabled[taskId],
    };
    setIsBtnDisabled(isDisabledSelectTask);
    chrome.storage.local.set({ isDisabled: isDisabledSelectTask });
  };

  const sendCompletedTask = (taskId: string) => {
    if (taskId !== null) {
      const updatedActiveTask = activeTasks.filter(
        (activeTask) => activeTask.id !== taskId
      );
      setActiveTasks(updatedActiveTask);
      chrome.storage.local.set({ activeTask: updatedActiveTask });
    }
  };

  // const logInHandle = () => {
  //   setIslogged((prevSetLogIn) => !prevSetLogIn );
  // }

  // const logOutHandle = () => {
  //   setIslogged((prevSetLogOut) => !prevSetLogOut );
  // }

  return (
    <div>
      <Header />
      <div className="popupContainer">
        {/* {isLogged ? (
        <div> 
        <LogInOut colorStyle="success" onLogInOut={logOutHandle} textBtn="Log Out" /> */}
        <div className="selectForm">
          <div style={{ width: "80%", marginRight: "2%" }}>
            <DropDown
              options={tasks.map((task) => task.todo)}
              value={selectTask.value}
              onChange={handleChange}
              label="Select a Task"
            />
          </div>

          <div style={{ width: "18%" }}>
            <Button
              onClick={addToActiveTasks}
              fullWidth={true}
              variant="contained"
              style={{
                display: "flex",
                flexDirection: "row",
                //justifyContent: "space-between",
                padding: "15px 16px",
              }}
              endIcon={<AddIcon sx={{ color: "white" }} />}
            >
              Add
            </Button>
          </div>
        </div>

        {activeTasks.map((activeTask, index) => (
          <CardBox
            key={activeTask.id ? `${activeTask.id}_${index}` : `no-id_${index}`}
            id={activeTask.id}
            value={activeTask.value}
            todo={activeTask.todo}
            completed={activeTask.completed}
            onChecked={() => onCheckedHandle(activeTask.id)}
            onClickSend={() => sendCompletedTask(activeTask.id)}
            disabled={!isBtnDisabled[activeTask.id]}
          />
        ))}
        {/* </div>
      ) : (
        <div>
          <LogInOut colorStyle="error" onLogInOut={logInHandle} textBtn="Log In" />
        </div>
        
      )} */}
      </div>
    </div>
  );
}

export default Popup;
