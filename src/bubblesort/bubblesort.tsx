import useSound from "use-sound";
import click from './sounds/click.mp3';
import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import "./style.css";

interface Props {}


const BubbleSort: React.FC<Props> = () => {
    const [playActive] = useSound(
        click,
        { volume: 0.025 }
      );
    const [arrayLength, setArrayLength] = useState<number>(20);
  const [sortSpeed, setSortSpeed] = useState<number>(10);
  const [numbers, setNumbers] = useState<number[]>([]);
  const DELAY_TIME_MS = sortSpeed;

  const generateRandomArray = (length: number): number[] => {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 101));
    }
    return arr;
  };

  const bubbleSortArray = (arr: number[]): number[] => {
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        setTimeout(() => {
            playActive();
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setNumbers([...arr]); // update the state with the new array after each swap
          }
        }, (j + i) * DELAY_TIME_MS); // add a delay for each comparison
      }
    }
    return arr;
  };

  const getColorForNumber = (number: number): string => {
    const colorScale = ["#3182ce", "#2c7a7b", "#90be6d", "#f6e05e", "#f9c74f"];
    const valueScale = [0, 25, 50, 75, 100];
    const index = Math.round((number / 100) * (valueScale.length - 1));
    return colorScale[index];
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setArrayLength(newValue as number);
  };

  const handleSliderSpeedChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setSortSpeed(newValue as number);
  };

  useEffect(() => {
    const randomArray = generateRandomArray(arrayLength);
    setNumbers(randomArray);
  }, [arrayLength]);

  const handleSort = () => {
    const sortedArray = bubbleSortArray([...numbers]);
    setNumbers(sortedArray);
  };


  return (
    <div>
      <h1>Bubble Sort</h1>
      <p>Number of values: {arrayLength}</p>
      <Slider
        value={typeof arrayLength === "number" ? arrayLength : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        max={300}
        min={0}
      />
      <p>Sorting Speed MS: {sortSpeed}</p>
      <Slider
        value={typeof sortSpeed === "number" ? sortSpeed : 0}
        onChange={handleSliderSpeedChange}
        aria-labelledby="input-slider"
        max={2000}
        min={0}
      />
      <div className="graph">
        {numbers.map((number, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${number}px`,
              backgroundColor: getColorForNumber(number),
            }}
          />
        ))}
      </div>
      <button onClick={handleSort}>Sort</button>
    </div>
  );
};

export default BubbleSort;
