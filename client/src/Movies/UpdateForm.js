import React, { useState } from "react";
import axios from "axios";

const UpdateForm = props => {
  const initialState = {
    title: "",
    director: "",
    metascore: "",
    stars: []
  };
  const [input, setInput] = useState(initialState);

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = e => {
    e.preventDefault();
    axios.put(``);
  };

  return (
    <div className="form-container">
      <form>
        <label>
          Title:
          <input
            name="title"
            type="text"
            value={input.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Director:
          <input
            name="director"
            type="text"
            value={input.director}
            onChange={handleChange}
          />
        </label>
        <label>
          Metascore:
          <input
            name="metascore"
            type="number"
            value={input.metascore}
            onChange={handleChange}
          />
        </label>
        <label>
          Stars:
          <input
            name="stars"
            className="stars"
            type="text"
            value={input.stars}
            onChange={handleChange}
          />
        </label>
        <button className="update-btn" onClick={handleUpdate}>
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
