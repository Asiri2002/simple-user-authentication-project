import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getImages");
      setAllImages(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // preview before upload
  };

  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/uploadImage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      if (res.data.status === 200) {
        alert("Image Uploaded");
        setImage(null);
        setPreview(null);
        getImages();
      }
    } catch (err) {
      alert("Upload Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Image Upload</h1>

      <form onSubmit={uploadImage}>
        <input
          type="file"
          accept="image/*"
          required
          onChange={handleImageChange}
        />
        <br /><br />

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: "200px", marginBottom: "10px" }}
          />
        )}

        <br />
        <button type="submit">Upload</button>
      </form>

      <hr />

      <h2>Uploaded Images</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {allImages.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000/images/${img.image}`}
            alt="uploaded"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;