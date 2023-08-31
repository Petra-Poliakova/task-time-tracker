import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox
} from "@mui/material";

interface ITaskItem {
  id: number;
  value: string;
  todo: string;
  //completed: boolean;
  onChecked: () => void
}

export const CardBox: React.FC<ITaskItem> = ({id, value, onChecked, todo}) => {

  return (
    <>
      <Card variant="outlined" style={{margin:'15px 0'}}>
        <CardContent>
          <Typography variant="h5" component="div">
           {todo}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID: {id}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Timer: 00:00:00
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total worked time: 00:00:00
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Completed:
            <Checkbox
              //checked={completed} v prípade keby som nechcela zaškrtávať
              onChange={onChecked}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">SEND TASK AS COMPLETED</Button>
        </CardActions>
      </Card>
    </>
  );
};
