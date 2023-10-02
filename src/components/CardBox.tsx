import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
  IconButton,
} from "@mui/material";
//import {SendIcon, PlayCircleFilledWhiteOutlinedIcon,PauseCircleOutlineOutlinedIco  } from '@mui/icons-material';
import SendIcon from "@mui/icons-material/Send";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import { red } from "@mui/material/colors";

interface ITaskItem {
  id: number;
  value: string;
  todo: string;
  completed: boolean;
  disabled: boolean;
  onChecked: () => void;
  //onStartTimer: () => void;
  onClickSend: () => void;
}
interface ITimerData {
  hours: string;
  minutes: string;
  seconds: string;
}
type Timer = ReturnType<typeof setTimeout>;

export const CardBox: React.FC<ITaskItem> = ({
  id,
  disabled,
  onChecked,
  completed,
  todo,
  //onStartTimer,
  onClickSend,
}) => {
  const [buttonColor, setButtonColor] = useState("primary");
  const [time, setTime] = useState<ITimerData>({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [timerValue, setTimerValue] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(
      ["timerValue", "timerData", "isTimerRunning"],
      (res) => {
        if (res.timerValue) setTimerValue(res.timerValue);
        if (res.timerData) setTime(res.timerData);
        if (res.isTimerRunning) setIsTimerRunning(res.isTimerRunning);
      }
    );
  }, []);

  useEffect(() => {
    let timerValue: Timer;
    if (isTimerRunning) {
      timerValue = setInterval(() => {
        setTimerValue((prevValue) => prevValue + 1);
      }, 1000);
    }

    return () => {
      if (timerValue !== undefined) {
        clearInterval(timerValue);
      }
    };
  }, [isTimerRunning]);

  useEffect(() => {
    chrome.storage.local.set({ timerData: time });
  }, [time]);

  useEffect(() => {
    // Calculate hours, minutes, and seconds from timerValue
    const hours = Math.floor(timerValue / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timerValue % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timerValue % 60).toString().padStart(2, "0");

    setTime({ hours: hours, minutes: minutes, seconds: seconds });

    chrome.storage.local.set({ timerValue: timerValue });
  }, [timerValue]);

  const onStartTimer = () => {
    setIsTimerRunning(true);

    chrome.storage.local.set({ isTimerRunning: true });
  };

  const onTimerStop = () => {
    setIsTimerRunning(false);

    chrome.storage.local.set({ isTimerRunning: false });
  };

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
            Timer: {`${time.hours}:${time.minutes}:${time.seconds}`}
            {!isTimerRunning ? (
              <IconButton aria-label="" onClick={onStartTimer}>
                <PlayCircleFilledWhiteOutlinedIcon color="primary" />
              </IconButton>
            ) : (
              <IconButton aria-label="" onClick={onTimerStop}>
                <PauseCircleOutlineOutlinedIcon sx={{ color: red[800] }} />
              </IconButton>
            )}
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
