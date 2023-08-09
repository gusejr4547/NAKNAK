import React, { useState, useRef } from "react";

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(e.target.files),
    ]);
  };

  const handleRemove = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const renderSelectedFiles = () => {
    return (
      <div>
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              style={{ maxWidth: "100px", maxHeight: "100px", margin: "10px" }}
              onClick={() => handleRemove(index)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        <label htmlFor="fileInput">
          <img
            src="/assets/cats/cat.png"
            alt="Select Images"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              margin: "10px",
              cursor: "pointer",
            }}
          />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
      </div>

      {renderSelectedFiles()}
    </div>
  );
}

export default ImageUpload;
