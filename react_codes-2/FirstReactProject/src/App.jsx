import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1); // prevent negative
  const wholeSqaure = () => setCount(count * count);
  const reset = () => setCount(0);
  
  return (
    <div className="app-container">
      <h1> Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>+ increment</button>
      <button onClick={decrement}>- decrement</button>
      <button onClick={ wholeSqaure}>whole square</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
 