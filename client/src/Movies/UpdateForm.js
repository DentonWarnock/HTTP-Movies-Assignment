import React, { useState } from "react";

const UpdateForm = props => {
  const [input, setInput] = useState();

  return (
    <div className="form-container">
      <form>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={input.title}
          onChange={handleChange}
        />
        <input
          name="title"
          type="text"
          placeholder="title"
          value={input.title}
          onChange={handleChange}
        />
        <input
          name="title"
          type="text"
          placeholder="title"
          value={input.title}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default UpdateForm;
