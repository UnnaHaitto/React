import { useState, useEffect } from "react";

import(useState);

const Likes = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(0);

  useEffect(() => {
    const getLikeCount = () => {
      return likeCount;
    };

    getLikeCount();
  }, []);

  const addLike = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <>
      <button
        onClick={() => {
          addLike;
        }}
      >
        ❤︎⁠ {likeCount}
      </button>
    </>
  );
};

export default Likes;
