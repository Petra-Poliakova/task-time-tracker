import React from 'react';
import { Button } from "@mui/material";

interface LogInProps {
    onLogInOut: () => void;
    textBtn: string;
    colorStyle: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

export const LogInOut: React.FC<LogInProps> = ({onLogInOut, colorStyle, textBtn}) => {
  return (
    <Button onClick={onLogInOut} color={colorStyle}>{textBtn}</Button>
  )
}
 