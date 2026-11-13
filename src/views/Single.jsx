import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const Single = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state;
  const { setSelectedItem } = props;
  return (
    <dialog open={item !== null}>
      <h2>{item.title}</h2>
      <h3>User:</h3>
      <p>{item.username}</p>
      <h3>Description:</h3>
      <p>{item.description}</p>
      {item.media_type === "video/mp4" ? (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
      <button onClick={() => navigate(-1)}>Go back</button>
    </dialog>
  );
};

Single.propTypes = {};

export default Single;
