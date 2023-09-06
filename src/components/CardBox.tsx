import React from "react";
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
  id: string;
  value: string;
  todo: string;
  completed: boolean;
  onChecked: () => void;
  onClickSend: () => void;
}

export const CardBox: React.FC<ITaskItem> = ({
  id,
  value,
  onChecked,
  todo,
  onClickSend,
}) => {
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
              //checked={completed} // v prípade keby som nechcela zaškrtávať
              onChange={onChecked}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            endIcon={<SendIcon color="primary" />}
            onClick={onClickSend}
          >
            Send taks as completed
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
