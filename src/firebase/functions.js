import {
  browserSessionPersistence,
  setPersistence,
  signInWithRedirect,
} from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase";
import {
  getDocs,
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
export const signInWithGoogle = async () => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    await signInWithRedirect(auth, googleAuthProvider);
  } catch (error) {
    console.log(error);
  }
};

export const getMovies = async () => {
  const user = auth.currentUser;

  if (user) {
    const moviesRef = collection(db, "movies");
    const moviesQuery = query(moviesRef, where("userId", "==", user.uid));
    const data = await getDocs(moviesQuery);
    console.log("data: ", data);
    const filteredData = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return filteredData;
  } else {
    return [];
  }
};

export const addMovie = async (movie) => {
  try {
    const moviesRef = collection(db, "movies");
    await addDoc(moviesRef, movie);
    console.log("Movie Added: ", movie);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = async (id) => {
  try {
    const movieRef = doc(db, "movies", id);
    await deleteDoc(movieRef);
    console.log("Movie Deleted: ", id);
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = async (id, updatedMovie) => {
  try {
    const movieRef = doc(db, "movies", id);

    await updateDoc(movieRef, updatedMovie);
    console.log("Movie Updated: ", updatedMovie);
  } catch (error) {
    console.log(error);
  }
};
