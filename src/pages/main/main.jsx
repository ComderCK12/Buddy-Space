import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export const Main = () => {
  const [postsList, setPostsList] = useState(null);
  const postsRef = collection(db, "posts");

  const getPost = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //   getPost();

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};
