import React, { useState } from "react";

import AddContent from "./components/Contents/AddContent";
import ContentsList from "./components/Contents/ContentsList";

import "./App.css";

function App() {
  const [contentsList, setContentsList] = useState([]);

  const addContentHandler = (title, image, password) => {
    setContentsList((prevContentsList) => {
      return [
        ...prevContentsList,
        {
          title: title,
          image: image,
          password: password,
          id: Math.random().toString(),
        },
      ];
    });
  };

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

  return (
    <div className="root">
      <AddContent onAddContent={addContentHandler} />
      <ContentsList contents={contentsList} onUpdateContent={updateContentHandler} />
    </div>
  );
}

export default App;
