import { useState, useEffect } from "react";
import { useLikes } from "../hooks/apiHooks";

const Likes = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(0);
  const { getLikeCountByMediaId } = useLikes();
  const [isActive, setIsActive] = useState(false);

  //LAITA USE EFFECT TOIMIMAAN JA JATKA KLIKKI TEHTÄVÄÄ

  useEffect(() => {
    getLikeCountByMediaId(mediaId);
  }, []);

  const likeClick = () => {
    setLikeCount(likeCount + 1);

    setIsActive(isActive ? false : true);
  };

  return (
    <>
      <button onClick={likeClick}>
        (isActive ? ♡ : ♥) Likes: ⁠{likeCount}
      </button>
    </>
  );
};

export default Likes;
