import { useState, useEffect } from "react";
import { useLikes } from "../hooks/apiHooks";

const Likes = ({ mediaId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(0);
  const { getLikeCountByMediaId, postLike, deleteLike, getLikeByUser } =
    useLikes();
  const [isActive, setIsActive] = useState(false);
  const token = localStorage.getItem("token");

  //LAITA USE EFFECT TOIMIMAAN JA JATKA KLIKKI TEHTÄVÄÄ

  useEffect(() => {
    const fillSetLikeCount = async () => {
      const response = await getLikeCountByMediaId(mediaId);

      setLikeCount(response.count);
    };

    fillSetLikeCount();
  }, []);

  const likeClick = async () => {
    setLikeCount(likeCount + 1);

    setIsActive(isActive ? false : true);

    if (!isActive) {
      const response = await getLikeByUser(token);
      console.log(response);
      await deleteLike(token);
    }

    await postLike(token, mediaId);
  };

  return (
    <>
      <button onClick={likeClick}>
        {isActive ? "♥" : "♡"} Likes: ⁠{likeCount}
      </button>
    </>
  );
};

export default Likes;
