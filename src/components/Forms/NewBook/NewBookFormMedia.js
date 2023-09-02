import React from "react";

const NewBookFormMedia = () => {
  return (
    <form>
      <label htmlFor="fileInput" className={classes.customFileInput}>
        {/* <BsCameraFill className={classes.icon} /> */}
        Add files
      </label>
      <input
        id="fileInput"
        // className={classes.fileInput}
        type="file"
        accept="image/*"
        // onChange={changeUserImageHandler}
      />
      <div className={classes.userImageHolder}>
        {userImage && <img src={URL.createObjectURL(userImage)} />}
      </div>
    </form>
  );
};

export default NewBookFormMedia;
