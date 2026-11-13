const SingleView = (props) => {
  const { item, setSelectedItem } = props;
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
      <button onClick={() => setSelectedItem(null)}>Close</button>
    </dialog>
    // TODO: Add JSX for displaying a mediafile here
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos
  );
};

export default SingleView;
