import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/NewPostForm";

const SubmitPostPage: React.FC = () => {
  return (
    <PageContent>
      <>
        <Box p="16px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create A Submit Form</Text>
        </Box>
        <NewPostForm />
      </>
      <></>
    </PageContent>
  );
};

export default SubmitPostPage;
