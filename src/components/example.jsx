import { useState, useEffect, useRef } from "react";

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

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={addWithState}>Add one</button>
    </div>
  );
};

export default Example;
