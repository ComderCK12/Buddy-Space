import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./form.css";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Title is needed."),
    description: yup.string().required("Description is needed."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data) => {
    try {
      await addDoc(postsRef, {
        ...data,
        username: user?.displayName,
        userId: user?.uid,
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <h1 style={{color: "white"}}>Post Details</h1>
      <input placeholder="Title..." {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <input type="text" placeholder="Description..." {...register("description")} />

      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input type="submit" className="submitButton"/>
    </form>
  );
};
