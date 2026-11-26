import { useState } from "react";

import(useState);

const Likes = () => {
  const [likeAmount, setLikeAmount] = useState("0");

  const addLike = () => {
    setLikeAmount(likeAmount + 1);
  };

  return (
    <>
      <button
        onClick={() => {
          addLike;
        }}
      >
        ❤︎⁠ {likeAmount}
      </button>
    </>
  );
};

export default Likes;
