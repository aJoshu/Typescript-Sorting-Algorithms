import useSound from "use-sound";
import click from "./sounds/click.mp3";
import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";
import { Button } from "@mui/material";
import { generateRandomArray } from "../utils/generateRandomArray";
import { getColorForNumber } from "../utils/getColorForNumber";

interface Props {}
const BubbleSort: React.FC<Props> = () => {
  const [playActive] = useSound(click, { volume: 0.025 });
  const [arrayLength, setArrayLength] = useState<number>(20);
  const [sortSpeed, setSortSpeed] = useState<number>(10);
  const [numbers, setNumbers] = useState<number[]>([]);
  const DELAY_TIME_MS = sortSpeed;

  const bubbleSortArray = (arr: number[]): number[] => {
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        setTimeout(() => {
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setNumbers([...arr]);
          }
        }, (j + i) * DELAY_TIME_MS);
      }
    }
    return arr;
  };

  const handleSliderChange = (e: Event, newValue: number | number[]) => {
    setArrayLength(newValue as number);
  };

  const handleSliderSpeedChange = (e: Event, newValue: number | number[]) => {
    setSortSpeed(newValue as number);
  };

  useEffect(() => {
    regenerate();
  }, [arrayLength]);

  useEffect(() => {
    playActive();
  }, [numbers]);

  const regenerate = () => {
    const randomArray = generateRandomArray(arrayLength);
    setNumbers(randomArray);
  };

  const handleSort = () => {
    const sortedArray = bubbleSortArray([...numbers]);
    setNumbers(sortedArray);
  };

  return (
    <div>
      <h1>Bubble Sort</h1>
      <div className="graph">
        {numbers.map((number, index) => (
          <Tooltip title={number} placement="top" key={index}>
            <div
              className="bar"
              style={{
                height: `${number}px`,
                backgroundColor: getColorForNumber(number),
              }}
            />
          </Tooltip>
        ))}
      </div>
      <div className="graph-buttons">
        <p>Number of values: {arrayLength}</p>
        <Slider
          value={arrayLength || 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          max={200}
          min={10}
        />
        <p>Sorting Speed MS: {sortSpeed}</p>
        <Slider
          value={sortSpeed || 0}
          onChange={handleSliderSpeedChange}
          aria-labelledby="input-slider"
          max={200}
          min={0}
        />
        <Button onClick={handleSort} variant="outlined">
          Sort
        </Button>
        <Button onClick={regenerate} variant="outlined">
          Regenerate
        </Button>
      </div>
    </div>
  );
};

export default BubbleSort;
