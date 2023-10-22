import React, { useEffect, useState } from "react";
import {
  addMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../../firebase/functions";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";

function Movie() {
  const [movies, setMovies] = React.useState([]);
  const [authCheck, setAuth] = React.useState(null);
  useEffect(() => {
    fetching();
    auth?.onAuthStateChanged((user) => {
      setAuth(user);
    });
  }, []);
  const fetching = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  //TODO:// Adding New Movie
  const [newMovieName, setNewMovieName] = useState("");
  const [newMovieReview, setNewMovieReview] = useState("");
  const [newMovieRating, setNewMovieRating] = useState(0);
  const [newMoviePublishYear, setNewMoviePublishYear] = useState(0);

  const inserting = async () => {
    await addMovie({
      movieName: newMovieName,
      review: newMovieReview,
      rating: newMovieRating,
      publishYear: newMoviePublishYear,
      userId: auth?.currentUser?.uid,
    });
    fetching();
  };
  const deleting = async (id) => {
    await deleteMovie(id);
    fetching();
  };

  //TODO:// Updating
  const [updatedMovieName, setUpdatedMovieName] = useState("");
  const [updatedMovieReview, setUpdatedMovieReview] = useState("");
  const [updatedMovieRating, setUpdatedMovieRating] = useState(0);
  const [updatedMoviePublishYear, setUpdatedMoviePublishYear] = useState(0);
  const updating = async (id) => {
    await updateMovie(id, {
      movieName: updatedMovieName,
      review: updatedMovieReview,
      rating: updatedMovieRating,
      publishYear: updatedMoviePublishYear,
    });
    fetching();
  };
  return (
    <div>
      <div className="container-fluid " style={{}}>
        {authCheck ? (
          <div className="container-background">
            <div className="container-gradient">
              <div className="container" style={{ marginTop: "100px" }}>
                <div className="display-1 text-start">Your movies,</div>
                <br />
                <div className="row">
                  {movies.map((movie) => (
                    <div className="col-md-4" key={movie.id}>
                      <div className="card text-center">
                        <div className="card-header">{movie.publishYear}</div>
                        <div className="card-body">
                          <h4 className="card-title">{movie.movieName}</h4>
                          <p className="card-text">{movie.review}</p>
                        </div>
                        <div className="card-footer">{movie.rating}/10</div>
                        <div className="card-footer">
                          <button
                            className="btn btn-danger"
                            onClick={() => deleting(movie.id)}
                          >
                            Delete Movie
                          </button>
                          <br />
                          <br />
                          <button
                            className="btn btn-light"
                            onClick={() => {
                              updating(movie.id);
                            }}
                          >
                            {" "}
                            Edit Movie
                          </button>
                          <div className="form my-5">
                            <input
                              type="text"
                              placeholder="Movie Name"
                              onChange={(e) =>
                                setUpdatedMovieName(e.target.value)
                              }
                            />
                            <input
                              type="text"
                              placeholder="Review"
                              onChange={(e) =>
                                setUpdatedMovieReview(e.target.value)
                              }
                            />
                            <input
                              type="number"
                              placeholder="Rating"
                              onChange={(e) =>
                                setUpdatedMovieRating(Number(e.target.value))
                              }
                            />
                            <input
                              type="number"
                              placeholder="Publish Year"
                              onChange={(e) =>
                                setUpdatedMoviePublishYear(
                                  Number(e.target.value)
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className="display-1 text-start">Add a movie,</div>
                  <br />
                  <div
                    className="form d-flex align-items-start justify-content-center flex-column "
                    style={{ gap: "20px" }}
                  >
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          placeholder="Movie Name"
                          onChange={(e) => setNewMovieName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          placeholder="Review"
                          onChange={(e) => setNewMovieReview(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <input
                          type="number"
                          placeholder="Rating"
                          onChange={(e) =>
                            Number(setNewMovieRating(Number(e.target.value)))
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <input
                          type="number"
                          placeholder="Publish Year"
                          onChange={(e) =>
                            Number(
                              setNewMoviePublishYear(Number(e.target.value))
                            )
                          }
                        />
                      </div>
                    </div>
                    <button className="btn btn-light" onClick={inserting}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="container "
            style={{
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card shadow">
                    <div className="card-body text-center">
                      <h1 className="card-title display-4 text-warning">
                        You are not logged in
                      </h1>
                      <p className="card-text">
                        To access this content, please log in or create an
                        account.
                      </p>
                      <Link to="/login" className="btn btn-primary btn-lg">
                        Log In
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Movie;
