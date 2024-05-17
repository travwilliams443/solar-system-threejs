import React from 'react';

const SpeedSlider = ({ speed, onSpeedChange }) => {
  return (
    <div className="speed-slider">
      <input
        type="range"
        min="0.01"
        max="1"
        step="0.1"
        value={speed}
        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default SpeedSlider;
