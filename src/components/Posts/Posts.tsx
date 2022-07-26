import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Community } from "../../atoms/communitiesAtom";
import { Post } from "../../atoms/postsAtom";
import { auth, firestore } from "../../firebase/clientApp";
import usePosts from "../../hooks/usePOsts";
import PostItem from "./PostItem";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts();

  const getPosts = async () => {
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData?.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
      console.log(posts);
    } catch (error: any) {
      console.log("get Post error", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Stack>
      {postStateValue.posts.map((item, k) => (
        <PostItem
          key={k}
          post={item}
          userIsCreator={user?.uid === item.creatorId}
          userVoteValue={undefined}
          onVote={onVote}
          onDeletePost={onDeletePost}
          onSelectPost={onSelectPost}
        />
      ))}
    </Stack>
  );
};

export default Posts;
