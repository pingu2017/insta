import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./ControlModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  const [mode, setMode] = useState(props.type);
  const [title, setTitle] = useState(props.title);
  const [password, setPassword] = useState(props.password);
  const [imgFile, setImgFile] = useState(props.image);
  let content = null;

  const titleRef = useRef();
  const passwordRef = useRef();
  const imgRef = useRef();

  const updateContentHandler = (event) => {
    event.preventDefault();
    const enteredTitle = titleRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredImg = imgFile;

    if(enteredTitle.trim().length === 0 || enteredPassword.trim().length === 0 || enteredImg.trim().length === 0) {
      setMode("FAIL");
    }

    props.onUpdate(enteredTitle, enteredImg, enteredPassword, props.id);
    titleRef.current.value = "";
    passwordRef.current.value = "";
    imgRef.current.value = "";
    setImgFile('');
    setMode("SUCCESS");
  }

  const deleteContentHandler = (event) => {
    event.preventDefault();
    props.onDelete(props.id);
    setMode("SUCCESS");
  }

  const updateConfirm = (event) => {
    event.preventDefault();
    const enteredPassword = passwordRef.current.value;
    if (enteredPassword === password) {
      setMode("DO_UPDATE");
    } else {
      setMode("FAIL");
    }
  };

  const deleteConfirm = (event) => {
    event.preventDefault();
    const enteredPassword = passwordRef.current.value;
    if (enteredPassword === password) {
      setMode("DO_DELETE");
    } else {
      setMode("FAIL");
    }
  };

  const onLoadFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgFile(reader.result);
    };
  };

  if (mode === "UPDATE") {
    content = (
      <div>
        <h2>UPDATE</h2>
        <form onSubmit={updateConfirm}>
          <input
            className={classes.input} 
            type="password"
            placeholder="confirm password"
            ref={passwordRef}
          />
          <Button type="submit">Confirm</Button>
        </form>
      </div>
    );
  } else if(mode === "DELETE") {
    content = (
      <div>
        <h2>DELETE</h2>
        <form onSubmit={deleteConfirm}>
          <input
            className={classes.input} 
            type="password"
            placeholder="confirm password"
            ref={passwordRef}
          />
          <Button type="submit">Confirm</Button>
        </form>
      </div>
    );
  } else if (mode === "FAIL") {
    content = <b>Fail to "UPDATE" or "DELETE".</b>;
  } else if (mode === "DO_UPDATE") {
    content = (
      <form onSubmit={updateContentHandler} className={classes.form}>
        <input id="title" type="text" placeholder="title" value={title} ref={titleRef} onChange={event=> {
          setTitle(event.target.value);
        }} />
        <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            ref={passwordRef}
            onChange={event=> {
              setPassword(event.target.value);
            }}
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
          <Button type="submit">Update</Button>
      </form>
    );
  }else if(mode === 'DO_DELETE') {
    content = (
      <div>
        <b>Confirm if you want to delete content.</b>
        <Button onClick={deleteContentHandler}>Delete</Button>
      </div>
    );
  }
  else if(mode === 'SUCCESS') {
    content = <b>Succeded to "UPDATE" or "DELETE".</b>;
  } 

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.type}</h2>
      </header>
      <div className={classes.content}>{content}</div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Cancel</Button>
      </footer>
    </Card>
  );
};

const ControlModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          id={props.id}
          title={props.title}
          type={props.type}
          onConfirm={props.onConfirm}
          password={props.password}
          image={props.image}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ControlModal;
