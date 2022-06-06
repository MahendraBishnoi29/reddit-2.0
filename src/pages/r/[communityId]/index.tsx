import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import React from "react";
import { firestore } from "../../../firebase/clientApp";

type CommunityPageProps = {
  // communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = () => {
  return <div>CommunityPage</div>;
};

//Server Side Rendering
export async function getServerSideProps(context: GetServerSideProps) {
  //get community data and pass it to client side
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.data(),
      },
    };
  } catch (error) {
    console.log("getServerSide Error: ", error);
  }
}

export default CommunityPage;
