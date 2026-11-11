const SingleView = (props) => {
  const { item, selectedItem, setSelectedItem } = props;
  return (
    <dialog open={selectedItem !== null}>
      <title>{item.title}</title>
      <p>{item.description}</p>
      {item.media_type === "video/mp4" ? (
        <video>
          <source src={item.tumbnail} alt={item.title} />
        </video>
      ) : (
        <img src={item.tumbnail} alt={item.title} />
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
