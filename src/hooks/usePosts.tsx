import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";
import { Post, postState } from "../atoms/postsAtom";
import { firestore, storage } from "../firebase/clientApp";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};

  const onSelectPost = async () => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      //check if there is an image

      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post?.id}/image`);
        await deleteObject(imageRef);
      }
      //delete the post document
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);
      //update recoil state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  };
};

export default usePosts;
