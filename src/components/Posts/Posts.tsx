import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData?.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(posts);
    } catch (error: any) {
      console.log("get Post error", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <div>Have A Good Coding....</div>;
};

export default Posts;
