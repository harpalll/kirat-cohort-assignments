import React, { useEffect, useRef, useState } from "react";
import { convertSecondsToHMS } from "../utils/convertSecondsToHMS";
import { formatTime, calculateTime } from "../utils/auxiliaryFunctions";
import style from "./Timer.module.css";

const Timer = () => {
  const [time, setTime] = useState(7200);
  const [initialTime, setInitialTime] = useState(0);

  // const [convertedTime, setConvertedTime] = useState({
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });
  const [isRunning, setIsRunning] = useState(true);
  const [editState, setEditState] = useState({ field: null, value: "" });
  const formatedTime = formatTime(time);

  useEffect(() => {
    const progress = initialTime > 0 ? (time / initialTime) * 100 : 0;
    document.documentElement.style.setProperty("--progress", `${progress}%`);
  }, [time, initialTime]);

  // const timer = useRef();

  // const calculateTime = () => {
  //   const { convertedTime, formattedTime } = convertSecondsToHMS(time); // 1 hour, 1 minute, 5 seconds
  //   // "01:01:05".split(":")
  //   // convertedTime.split(":");
  //   // "01:01:05".split(":").map((n) => Number(n));
  //   console.log(convertedTime);
  //   setConvertedTime(convertedTime);
  // };

  useEffect(() => {
    // if (isRunning) {
    //   timer.current = setTimeout(() => {
    //     console.log(`updating time: ${time}`);
    //     setTime((t) => t + 1);
    //   }, 1000);
    // }
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  const handleReset = () => {
    setIsRunning(false);
    setInitialTime(0);
    setTime(0);
  };

  const handleEditField = (field) => {
    console.log("field:" + editState.field);
    console.log("formated time:" + JSON.stringify(formatedTime));
    console.log("value:" + editState.value);

    if (editState.field === field) {
      const newTime = {
        ...formatedTime,
        [field]: editState.value.padStart(2, "0"),
      };

      const calculatedTime = calculateTime(
        newTime.hours,
        newTime.minutes,
        newTime.seconds
      );

      setTime(calculatedTime);
      setInitialTime(calculatedTime);

      setEditState({
        field: null,
        value: "",
      });
    } else {
      setIsRunning(false);
      console.log("getting formattedtime for " + field);

      console.log(`formatTime: ${formatTime(time)[field]}`);

      setEditState({
        field,
        value: formatTime(time)[field].replace(/^0+/, ""),
      });
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setEditState((prevState) => ({ ...prevState, value }));
  };

  return (
    <div className={style.timerApp}>
      <div className={style.timerDisplay}>
        <div className={style.timerCircle}>
          <div className={style.timerTime}>
            {editState.field === "hours" ? (
              <input
                className={style.timeInput}
                type="text"
                name="hours"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField("hours")}
                autoFocus
              />
            ) : (
              <span
                className={style.timeUnit}
                onClick={() => handleEditField("hours")}
              >
                {formatedTime.hours}
              </span>
            )}
            :
            {editState.field === "minutes" ? (
              <input
                className={style.timeInput}
                type="text"
                name="minutes"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField("minutes")}
                autoFocus
              />
            ) : (
              <span
                className={style.timeUnit}
                onClick={() => handleEditField("minutes")}
              >
                {formatedTime.minutes}
              </span>
            )}
            :
            {editState.field === "seconds" ? (
              <input
                className={style.timeInput}
                type="text"
                name="seconds"
                value={editState.value}
                onChange={handleInputChange}
                onBlur={() => handleEditField("seconds")}
                autoFocus
              />
            ) : (
              <span
                className={style.timeUnit}
                onClick={() => handleEditField("seconds")}
              >
                {formatedTime.seconds}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={style.actionButtons}>
        <button
          className={style.actionButton}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className={style.actionButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
