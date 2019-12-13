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
  console.log("UpdateForm.js, input: BEFORE UPDATE: ", input);
  const [error, setError] = useState("");

  const id = Number(props.match.params.id);

  useState(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setInput(res.data))
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleStars = e => {
    setInput({
      ...input,
      stars: [e.target.value]
    });
  };

  const convertStarsArray = () => {
    const newStarsArray = input.stars.split(",");
    console.log("UpdateForm.js, newStarsArray: ", newStarsArray);
    setInput({ ...input, stars: newStarsArray });
    return newStarsArray;
  };

  const handleUpdate = e => {
    e.preventDefault();
    // const newStarsArray = input.stars.split(",");
    // console.log("UpdateForm.js, newStarsArray: ", newStarsArray);
    // setInput({ ...input, stars: newStarsArray });
    // convertStarsArray();
    // setInput({ ...input, stars: convertStarsArray() });
    console.log("UpdateForm.js, input: AFTER UPDATE: ", input);

    axios
      .put(`http://localhost:5000/api/movies/${id}`, input)
      .then(res => {
        console.log(res.data);
        props.history.push("/");
      })
      .catch(err => console.log(err));
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
            onChange={handleStars}
          />
        </label>
        <button className="update-btn" onClick={handleUpdate}>
          Update Movie
        </button>
        {error && <div className=".movie-warning">{error}</div>}
      </form>
    </div>
  );
};

export default UpdateForm;
