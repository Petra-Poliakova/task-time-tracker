import React from 'react'
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import {SelectChangeEvent} from '@mui/material/Select'


interface DropDownProps {
    options: string[],
    value: string ,
    onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void, 
    label: string,
}

export const DropDown: React.FC<DropDownProps> = ({options, value, onChange, label}) => {

  return (
    <>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">{label}</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={value}
    label={label}
    onChange={onChange}
  >
    {options.map((item, index)=> {
        return <MenuItem key={index} value={item}>{item}</MenuItem>
    })}
  </Select>
</FormControl>
</>
  )
}
