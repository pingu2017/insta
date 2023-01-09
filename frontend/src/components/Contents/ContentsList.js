import React, { useState } from "react";
import Wrapper from "../Helpers/Wrapper";
import Button from "../UI/Button";

import Card from "../UI/Card";
import ControlModal from "../UI/ControlModal";
import classes from "./ContentsList.module.css";

const ContentsList = (props) => {
  const [control, setControl] = useState();

  console.log(props);
  const updateHandler = (data, event) => {
    setControl({
      id: data.id,
      title: data.title,
      image: data.image,
      password: data.password,
      type: "UPDATE",
    });
  };

  const deleteHandler = (data, event) => {
    setControl({
      id: data.id,
      title: data.title,
      image: data.image,
      password: data.password,
      type: "DELETE",
    });
  };

  const controlHandler = () => {
    setControl(null);
  };

  const onUpdate = (title, image, password, id) => {
    props.onUpdateContent(title, image, password, id);
  }

  const onDelete = (id) => {
    props.onDeleteContent(id);
  }

  return (
    <Wrapper>
      {control && (
        <ControlModal
          id={control.id}
          title={control.title}
          image={control.image}
          password={control.password}
          type={control.type}
          onConfirm={controlHandler}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
      <Card className={classes.contents}>
        <ul>
          {props.contents.map((content) => (
            <li key={content.uid}>
              <b>{content.title}</b>
              <img alt="sample" src={content.path} />
              <Button
                className={"update"}
                onClick={(event) => {
                  updateHandler(content, event);
                }}
              >
                update
              </Button>
              <Button
                className={"delete"}
                onClick={(event) => {
                  deleteHandler(content, event);
                }}
              >
                delete
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </Wrapper>
  );
};

export default ContentsList;
