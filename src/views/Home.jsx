import MediaRow from "../components/MediaRow";
import SingleView from "../components/SingleView";
import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const json = await fetchData(import.meta.env.VITE_MEDIA_API + "/media");

        const newArray = await Promise.all(
          json.map(async (item) => {
            const result = await fetchData(
              import.meta.env.VITE_AUTH_API + "/users/" + item.user_id,
            );
            return { ...item, username: result.username };
          }),
        );

        setMediaArray(newArray);
      } catch (error) {
        console.log(error.message);
      }
    };

    getMedia();
  }, []);

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
