import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import React from "react";
import { Community } from "../../../atoms/communitiesAtom";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  return <div>Welcome To: {communityData.id}</div>;
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
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    };
  } catch (error) {
    console.log("getServerSide Error: ", error);
  }
}

export default CommunityPage;
