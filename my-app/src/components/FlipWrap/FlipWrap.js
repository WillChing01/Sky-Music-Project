import { useState } from "react";

import FlipSide from "../FlipSide/FlipSide";

import './FlipWrap.css';

const FlipWrap = ({front, back}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
      setIsFlipped(!isFlipped);
  };

  const getFlipWrapClassName = () => {
    const flippedClass = isFlipped ? 'flipped': '';
    const flipWrapClassName = `flippers ${flippedClass}`;
    return flipWrapClassName;
  };

  return (
    <div className={getFlipWrapClassName()}>
      <FlipSide side='front' handleFlip={handleFlip}>
        {front}
      </FlipSide>
      <FlipSide side='back' handleFlip={handleFlip}>
        {back}
      </FlipSide>
    </div>
  );
};
 
export default FlipWrap;