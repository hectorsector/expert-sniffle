import React, { useState } from 'react';

const Counter = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prevCount => prevCount + step);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - step);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return (
    <div className="counter" data-testid="counter">
      <h2>Counter: {count}</h2>
      <div className="counter-controls">
        <button 
          onClick={increment}
          data-testid="increment-btn"
        >
          + {step}
        </button>
        <button 
          onClick={decrement}
          data-testid="decrement-btn"
        >
          - {step}
        </button>
        <button 
          onClick={reset}
          data-testid="reset-btn"
        >
          Reset
        </button>
      </div>
      <p data-testid="counter-value">Current value: {count}</p>
    </div>
  );
};

export default Counter;