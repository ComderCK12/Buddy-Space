import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./post.css";
import { useEffect, useState } from "react";

export const Post = (props) => {
  const { post } = props;

  const [user] = useAuthState(auth);

  const [likeAmount, setLikeAmount] = useState(null);
  const [userLiked, setUserLiked] = useState(false); // New state to track if the user has already liked the post

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));


  const addLike = async () => {
    // Check if the user has already liked the post before adding a like
    if (!userLiked) {
      await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      setUserLiked(true); // Set userLiked to true after adding the like
    }
  };

  useEffect(() => {
    const getLikes = async () => {
      const unsubscribe = onSnapshot(likesDoc, (snapshot) => {
        const newLikeAmount = snapshot.docs.length;
        setLikeAmount(newLikeAmount);

        const likedByUser = snapshot.docs.some(
          (doc) => doc.data().userId === user?.uid
        );
        setUserLiked(likedByUser);
      });

      return unsubscribe;
    };

    getLikes();
  }, [likesDoc, user]);

  return (
    <div className="post-container">
      <div className="post-bar">
        <p> @{post?.username} </p>
        <img
          src={user.photoURL}
          alt=""
          className="post-bar-photo"
        />
      </div>
      <div className="title">
        <h1> {post.title} </h1>
      </div>
      <div className="body">
        <p> {post.description} </p>
      </div>
      <div className="footer">
        <button onClick={addLike} disabled={userLiked}>
          &#128077;
        </button>
        {likeAmount && <p> Likes: {likeAmount} </p>}
      </div>
    </div>
  );
  
};
