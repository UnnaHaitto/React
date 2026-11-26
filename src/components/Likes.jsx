import { useState, useEffect } from "react";
import { useLikes, useUser } from "../hooks/apiHooks";

const Likes = ({ mediaId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(0);
  const { getLikeCountByMediaId, postLike, deleteLike, getLikeByUser } =
    useLikes();
  const { getUserByToken } = useUser();
  const [isActive, setIsActive] = useState(false);
  const token = localStorage.getItem("token");

  //LAITA USE EFFECT TOIMIMAAN JA JATKA KLIKKI TEHTÄVÄÄ

  useEffect(() => {
    const fillSetLikeCount = async () => {
      const response = await getLikeCountByMediaId(mediaId);

      console.log("use Effect: ", response.count);

      setLikeCount(response.count);
    };

    fillSetLikeCount();
  }, []);

  const likeClick = async () => {
    if (!isActive) {
      setIsActive(true);

      await postLike(token, mediaId);

      return;
    }

    console.log(isActive);

    const userData = await getUserByToken(token);
    const userId = userData.user.user_id;
    const response = await getLikeByUser(token, userId);
    console.log(response);
    const likeId = response[0].like_id;
    await deleteLike(token, likeId);
    setIsActive(false);
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
