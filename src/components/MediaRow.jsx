import PropTypes from "prop-types";
import { Link } from "react-router";
import { useUserContext } from "../hooks/contextHooks";

// src/components/MediaRow.jsx
const MediaRow = (props) => {
  const { item, deleteMedia, modifyMedia } = props;

  const { user } = useUserContext();

  const token = localStorage.getItem("token");

  return (
    // TODO: move <tr> element in foreach from Home.jsx here
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.username}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString("fi-FI")}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <Link to="./single" state={item}>
          Show
        </Link>
      </td>
      <td>
        {user &&
          (user.user.level_name === "Admin" ||
            user.user.user_id === item.user_id) && (
            <>
              <button
                className="text-white no-underline bg-gray-700 border-none p-2"
                onClick={() => {
                  modifyMedia(
                    item.media_id,
                    {
                      title: "Modified",
                      description: "Modified truly.",
                    },
                    token,
                  );
                }}
              >
                Modify
              </button>
              <button
                className="mt-2.5 mb-2.5 ml-0 mr-0 p-2.5 rounded-[5px] bg-gray-700 text-white border-none cursor-pointer"
                onClick={() => {
                  deleteMedia(item.media_id, token);
                }}
              >
                Delete
              </button>
            </>
          )}
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
  }).isRequired,
};

export default MediaRow;
