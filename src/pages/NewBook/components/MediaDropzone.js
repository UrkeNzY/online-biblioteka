import { useState, useEffect, useCallback, Fragment } from "react";
import { useDropzone } from "react-dropzone";

import classes from "../../../styles/MediaDropzone.module.css";

function MediaDropzone({ photo }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Check if the photo prop is available and set it in the files state
    if (photo) {
      setFiles([{ name: photo, preview: photo }]);
    }
  }, [photo]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    // maxSize: 1024 * 1000,
    onDrop,
  });

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  return (
    <Fragment>
      <div className={classes.outerBorder}>
        <div className={classes.dropzoneContainer} {...getRootProps()}>
          <input {...getInputProps()} />
          <img src="/images/icons/dropzone-image.svg" alt="dropzone icon" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag your files here, or click to select files</p>
          )}
        </div>

        <ul className={classes.previewContainer}>
          {files.map((file) => (
            <li key={file.name} className={classes.imagePreview}>
              <img
                src={file.preview}
                alt={file.name}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
              <div className={classes.fileInfo}>
                <p>{file.name}</p>
                <img
                  src="/images/icons/trash-icon.svg"
                  onClick={() => removeFile(file.name)}
                  alt="trash icon"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default MediaDropzone;
