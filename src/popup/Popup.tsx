import React,{useState} from 'react';
import './Popup.css';
import { useFetch } from '../hooks/useFetch';
import { DropDown } from '../components/DropDown';
import { SelectChangeEvent } from '@mui/material';

interface ITaskItem {
      id: number,
      todo: string,
      completed: boolean,
      userId: number
} 

export interface ITasks {
  todos: ITaskItem[]
}

function Popup() {
  const [data, loading] = useFetch<ITasks>('https://dummyjson.com/todos',  { todos: [] });
  const [selectValue, setSelectValue] = useState ('');
  
  if(loading) return <p>Loading...</p>;

  if (!data || !data.todos) {
    return <p>Data not available.</p>;
  }


  const handleChange = (e: SelectChangeEvent<string>, child: React.ReactNode) => {
      setSelectValue(e.target.value)
  }

  console.log('data', data)
  return (
    <div>
      <DropDown options={data.todos.map((task) => task.todo)} value={selectValue} onChange={handleChange} label='Select a Task'/>
    </div>
  );
}

export default Popup;
