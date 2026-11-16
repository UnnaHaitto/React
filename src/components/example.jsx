import { useState, useEffect, useRef } from "react";
import HooksExample from "./HooksExample";

const Example = () => {
  const [count, setCount] = useState(0);

  //let traditionalCount = 0;

  console.log("component rendered");

  // tämä ei triggeröi uudelleen renderöintiä
  /*
  const addWithoutState = () => {
    traditionalCount++;
    console.log(traditionalCount);
  };*/

  const addWithState = () => {
    setCount(count + 1);
    console.log(count);
  };

  // 1. Ilman riippuvuustaulukkoa
  // useEffect(function)

  // 2. Komponentin mount vaiheessa
  // useEffect(function, [])

  // 3. Mount vaiheessa sekä count arvon muuttuessa
  // useEffect(function, [count])

  useEffect(() => {
    console.log("useEffect triggered");
  }, [count]);

  // Käytetään useRef
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
    console.log(inputRef.current);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={addWithState}>Add one</button>
      <h3>useRef demo</h3>
      <input type="text" name="name" id="name" ref={inputRef} />
      <button onClick={handleFocus}>Focus input</button>
      <HooksExample />
    </div>
  );
};

export default Example;
