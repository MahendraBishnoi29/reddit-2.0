import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import About from "../../../components/Community/About";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/PostForm/NewPostForm";
import { auth } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();

  return (
    <PageContent>
      <>
        <Box p="16px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create A Post</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={communityStateValue.currentCommunity?.imageURL}
          />
        )}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
