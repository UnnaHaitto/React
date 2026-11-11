const SingleView = (props) => {
  const { item, setSelectedItem } = props;
  return (
    <dialog>
      <title>{item.title}</title>
      <p>{item.description}</p>
      {item.media_type === "image/jpeg" ? (
        <img src={item.tumbnail} alt={item.title} />
      ) : (
        <video>
          <source src={item.tumbnail} alt={item.title} />
        </video>
      )}
    </dialog>
    // TODO: Add JSX for displaying a mediafile here
    // - use e.g. a <dialog> element for creating a modal
    // - use item prop to render the media item details
    // - use img tag for displaying images
    // - use video tag for displaying videos
  );
};

export default SingleView;
