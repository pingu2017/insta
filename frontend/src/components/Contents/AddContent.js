import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddContent.module.css";
import Wrapper from "../Helpers/Wrapper";
import ErrorModal from "../UI/ErrorModal";

const AddContent = (props) => {
  const [error, setError] = useState();
  const [imgFile, setImgFile] = useState("");

  const titleRef = useRef();
  const passwordRef = useRef();
  const imgRef = useRef();

  const addContentHandler = (event) => {
    event.preventDefault();
    const enteredTitle = titleRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredImg = imgFile;

    if (enteredTitle.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid title.",
      });
      return;
    }

    if (enteredPassword.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid password.",
      });
      return;
    }

    if (enteredImg.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid image.",
      });
      return;
    }
    
    props.onAddContent(enteredTitle, enteredImg, enteredPassword);
    titleRef.current.value = "";
    passwordRef.current.value = "";
    imgRef.current.value = "";
    setImgFile('');
  };

  const errorHandler = () => {
    setError(null);
  };

  const onLoadFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgFile(reader.result);
    };
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addContentHandler}>
          <input id="title" type="text" placeholder="title" ref={titleRef} />
          <input
            id="password"
            type="password"
            placeholder="password"
            ref={passwordRef}
          />
          <div className="preview">
            {imgFile && <img alt="sample" src={imgFile} />}
          </div>
          <label htmlFor="file">Choose File</label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={onLoadFile}
            ref={imgRef}
          />
          <Button type="submit">Posting</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddContent;
