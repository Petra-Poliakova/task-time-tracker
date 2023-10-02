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
  const [selectTask, setSelectTask] = useState<ITaskItem | null>(null);
  const [activeTasks, setActiveTasks] = useState<ITaskItem[]>([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState<{
    [taskId: string]: boolean;
  }>({});
  //const [isLogged, setIslogged] = useState<boolean>(false);

  useEffect(() => {
    const tasksData = data.todos.filter(
      (filterData) => filterData.completed === false
    );
    setTasks(tasksData);
    //SetTasksData();
  }, [data]);
  //  const SetTasksData = () => {
  //    setTasks(
  //      data.todos.filter((filterData) => filterData.completed === false)
  //    );
  //  };

  useEffect(() => {
    chrome.storage.local.get(
      ["activeTask", "isDisabled", "deleteTasks"],
      (result) => {
        if (result.activeTask) {
          setActiveTasks(result.activeTask);
        }
        if (result.isDisabled) {
          setIsBtnDisabled(result.isDisabled);
        }
        if (result.deleteTasks) {
          setTasks(result.deleteTasks);
        }
      }
    );
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
    if (selectedTask) {
      setSelectTask(selectedTask);
    }
  };

  const addToActiveTasks = async () => {
    if (selectTask) {
      const updatedActiveTask = [selectTask, ...activeTasks];

      setActiveTasks(updatedActiveTask);
      //chrome.storage.local.set({ activeTask: updatedActiveTask });

      await new Promise<void>((resolve) => {
        chrome.storage.local.set({ activeTask: updatedActiveTask }, () => {
          resolve();
        });
      });

      //   await fetch(`https://dummyjson.com/todos/${selectTask.id}`, {
      //     method: "DELETE",
      //   }).then((response) => response.json());
      //   // .then(() =>
      //   //   setTasks(tasks.filter((task) => task.id !== selectTask.id))
      //   // );
      //   const updatedTasks = tasks.filter((task) => task.id !== selectTask.id);
      //   setTasks(updatedTasks);
      //   chrome.storage.local.set({ sendTasks: updatedTasks });
      // }
      deleteSelectedTaskFromDropDown();
    }
  };

  const deleteSelectedTaskFromDropDown = async () => {
    if (selectTask) {
      await fetch(`https://dummyjson.com/todos/${selectTask.id}`, {
        method: "DELETE",
      }).then((response) => response.json());

      const updatedTasks = tasks.filter((task) => task.id !== selectTask.id);
      setTasks(updatedTasks);

      setSelectTask(null);

      chrome.storage.local.set({ deleteTasks: updatedTasks });

      // await new Promise<void>((resolve) => {
      //   chrome.storage.local.set({ deleteTasks: updatedTasks }, () => {
      //     resolve();
      //   });
      // });
    }
  };

  const onCheckedHandle = (taskId: number) => {
    const updatedTask = activeTasks.map((activeTask) =>
      activeTask.id === taskId
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

  const sendCompletedTask = (taskId: number) => {
    if (taskId !== null) {
      const updatedActiveTask = activeTasks.filter(
        (activeTask) => activeTask.id !== taskId
      );
      setActiveTasks(updatedActiveTask);
      chrome.storage.local.set({ activeTask: updatedActiveTask });
    }
  };

  const clearAllCompletedTask = () => {
    //   const updatedActiveTask = activeTasks.filter(
    //     (activeTask) => activeTask.completed === false
    //   );
    //   setActiveTasks(updatedActiveTask);
    //   chrome.storage.local.set({ activeTask: updatedActiveTask });
    // }
    setActiveTasks([]);
    chrome.storage.local.clear();
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
              value={selectTask ? selectTask.todo : ""}
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
            value={activeTask.todo}
            todo={activeTask.todo}
            completed={activeTask.completed}
            onChecked={() => onCheckedHandle(activeTask.id)}
            onClickSend={() => sendCompletedTask(activeTask.id)}
            disabled={!isBtnDisabled[activeTask.id]}
          />
        ))}
        <div>
          <Button onClick={clearAllCompletedTask}>Clear All</Button>
        </div>
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
