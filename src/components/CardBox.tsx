import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ITaskItem {
  id: number;
  value: string;
  todo: string;
  completed: boolean;
  disabled: boolean;
  onChecked: () => void;
  onClickSend: () => void;
}

export const CardBox: React.FC<ITaskItem> = ({
  id,
  disabled,
  onChecked,
  completed,
  todo,
  onClickSend,
}) => {
  const [buttonColor, setButtonColor] = useState("primary");

  const handleButtonClick = () => {
    setButtonColor("info");
    onClickSend();
  };
  return (
    <>
      <Card
        variant="outlined"
        style={{ margin: "15px 0", background: "#f5f5f5" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }} component="div">
            {todo}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            ID: {id}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Timer: 00:00:00
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Total worked time: 00:00:00
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Completed:
            <Checkbox
              checked={completed}
              onChange={onChecked}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            endIcon={<SendIcon sx={{ color: buttonColor }} />}
            onClick={handleButtonClick}
            disabled={disabled}
          >
            Send taks as completed
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
