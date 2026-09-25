import react from 'react';
function App() {

  let count = 0;

  function increaseCount() {
    count = count + 1;
    console.log(count);
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increaseCount}>Click me</button>
    </div>
  );
}