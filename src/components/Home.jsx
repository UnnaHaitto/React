import MediaRow from "./MediaRow";
import SingleView from "./SingleView";
import { useState } from "react";
import PropTypes from "prop-types";

const mediaArray = [
  {
    media_id: 8,
    user_id: 5,
    filename: "https://placehold.co/800?text=Pic1&font=roboto.jpg",
    thumbnail: "https://placehold.co/200?text=Thumb1&font=roboto.jpg",
    filesize: 170469,
    media_type: "image/jpeg",
    title: "Picture 1",
    description: "This is a placeholder picture.",
    created_at: "2024-01-07T20:49:34.000Z",
  },
  {
    media_id: 9,
    user_id: 7,
    filename: "https://placehold.co/800?text=Pic2&font=oswald.png",
    thumbnail: "https://placehold.co/200?text=Thumb2&font=oswald.png",
    filesize: 1002912,
    media_type: "image/png",
    title: "Pic 2",
    description: "",
    created_at: "2024-01-07T21:32:27.000Z",
  },
  {
    media_id: 17,
    user_id: 2,
    filename: "https://placeholdervideo.dev/1920x1080",
    thumbnail: "https://placehold.co/200?text=Video&font=oswald.png",
    filesize: 1236616,
    media_type: "video/mp4",
    title: "Video 1",
    description: "Placeholder video.",
    created_at: "2024-01-07T20:48:13.000Z",
  },
];

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

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
            <th>Description</th>
            <th>Date</th>
            <th>File size</th>
            <th>Type</th>
            <th>Open element</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
