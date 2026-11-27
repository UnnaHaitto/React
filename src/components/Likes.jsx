import { useState, useEffect } from "react";
import { useLikes, useUser } from "../hooks/apiHooks";

const Likes = ({ mediaId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(false);

  const { getLikeCountByMediaId, postLike, deleteLike, getLikeByUser } =
    useLikes();

  const { getUserByToken } = useUser();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLikes = async () => {
      const countResponse = await getLikeCountByMediaId(mediaId);

      setLikeCount(countResponse.count);

      if (!token) {
        return;
      }

      const userData = await getUserByToken(token);
      const userId = userData.user.user_id;

      const response = await getLikeByUser(token, userId);

      console.log("get like by user use effect", response.media_id);

      const likedMedia = response.filter(
        (like) => like.media_id === Number(mediaId),
      );

      likedMedia.length > 0 ? setUserLike(true) : setUserLike(false);
    };

    fetchLikes();
  }, [mediaId]);

  const likeClick = async () => {
    if (!userLike) {
      await postLike(token, mediaId);

      setUserLike(true);

      setLikeCount(likeCount + 1);

      return;
    }

    const userData = await getUserByToken(token);
    const userId = userData.user.user_id;

    const response = await getLikeByUser(token, userId);
    console.log("get like by user: ", response);

    const likedMedia = response.filter(
      (like) => like.media_id === Number(mediaId),
    );

    console.log("liked media:", likedMedia);

    const likeId = likedMedia[0].like_id;

    await deleteLike(token, likeId);

    setUserLike(false);

    setLikeCount(likeCount - 1);
  };

  return (
    <>
      <button onClick={likeClick} disabled={!token}>
        {token && (userLike ? "♥" : "♡")} Likes: ⁠{likeCount}
      </button>
    </>
  );
};

export default Likes;
