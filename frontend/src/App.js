import React, { useEffect, useState } from "react";
import axios from "axios";

import AddContent from "./components/Contents/AddContent";
import ContentsList from "./components/Contents/ContentsList";

import "./App.css";

function App() {
  const [contentsList, setContentsList] = useState([]);

  useEffect(() => {
    axios.get("/content/").then((response) => {
      setContentsList(response.data);
    })
  }, []);

  // const addContentHandler = (title, image, password) => {
  //   setContentsList((prevContentsList) => {
  //     return [
  //       ...prevContentsList,
  //       {
  //         title: title,
  //         image: image,
  //         password: password,
  //         id: Math.random().toString(),
  //       },
  //     ];
  //   });
  // };

  const addContentHandler = (title, image, password) => {
    axios.post("/content/", {
      pic: image,
      title: title,
      password: password
    }).then((response) => {
      console.log(response);
    })
  }

  const updateContentHandler = (title, image, password, id) => {
    setContentsList((prevContentsList) => {
      const list = [...prevContentsList];
      const updatedContent = {
        title: title,
        image: image,
        password: password,
        id: id,
      };
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list[i] = updatedContent;
          break;
        }
      }
      return list;
    });
  };

  const deleteContentHandler = (id) => {
    setContentsList((prevContentsList) => {
      const updatedContent = prevContentsList.filter(
        (content) => content.id !== id
      );
      return updatedContent;
    });
  };

  return (
    <div className="root">
      <AddContent onAddContent={addContentHandler} />
      <ContentsList
        contents={contentsList}
        onUpdateContent={updateContentHandler}
        onDeleteContent={deleteContentHandler}
      />
    </div>
  );
}

export default App;
