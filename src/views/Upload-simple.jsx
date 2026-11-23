import { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("File: ", file);
  };

  const handleFileChange = (event) => {
    const browserFile = event.target.files[0];
    console.log("event: ", event.target.files[0]);
    setFile(browserFile);
    setFileUrl(URL.createObjectURL(browserFile));
  };

  return (
    <>
      <h2>Upload single image DEMO</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="file"
          type="file"
          id="file"
          accept="image/*, video/*"
          onChange={handleFileChange}
        />
        <button type="submit">Lähetä</button>
      </form>

      {file && (
        <>
          <h2>Upattu tiedosto</h2>

          <img src={fileUrl} alt="Uploaded image" width={200} height={200} />
        </>
      )}
    </>
  );
};

export default Upload;
