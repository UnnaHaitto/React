import MediaRow from "../components/MediaRow";
import SingleView from "../components/SingleView";
import { useState } from "react";
import { useMedia } from "../hooks/apiHooks.js";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { mediaArray, deleteMedia, modifyMedia } = useMedia();

  //console.log(mediaArray);

  return (
    <>
      {selectedItem !== null && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Username</th>
            <th>Description</th>
            <th>Date</th>
            <th>File size</th>
            <th>Type</th>
            <th>Open element</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((mediaItem) => (
            <MediaRow
              key={mediaItem.media_id}
              item={mediaItem}
              setSelectedItem={mediaItem}
              deleteMedia={deleteMedia}
              modifyMedia={modifyMedia}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
