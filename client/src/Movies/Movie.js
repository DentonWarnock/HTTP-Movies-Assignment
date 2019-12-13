import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areYouSure: false,
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log(res);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  handleDelete = () => {
    this.setState({ areYouSure: !this.state.areYouSure });
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    if (this.state.areYouSure) {
      return (
        <div className="areYouSure">
          <h2>
            Are you sure you want to delete{" "}
            <span>{this.state.movie.title}</span> from the movie list?
          </h2>
          <button
            className="yes-btn"
            onClick={() => {
              this.setState({ areYouSure: !this.state.areYouSure });
              this.deleteMovie();
            }}
          >
            Yes
          </button>
          <button
            className="no-btn"
            onClick={() => {
              this.setState({ areYouSure: !this.state.areYouSure });
              this.props.history.push(`/movies/${this.state.movie.id}`);
            }}
          >
            No
          </button>
        </div>
      );
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link
          className="edit-button"
          to={`/update-movie/${this.state.movie.id}`}
        >
          Edit
        </Link>
        <div className="delete-button" onClick={() => this.handleDelete()}>
          Delete
        </div>
      </div>
    );
  }
}
