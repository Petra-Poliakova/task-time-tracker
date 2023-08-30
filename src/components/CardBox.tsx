import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

interface ITaskItem {
  id: string;
  value: string;
  completed: boolean;
}

export const CardBox = ({}) => {
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Nazov Tasku
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Id: 000
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Timer: 00:00:00
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total worked time: 00:00:00
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Completed: false
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">DELETE</Button>
        </CardActions>
      </Card>
    </>
  );
};
