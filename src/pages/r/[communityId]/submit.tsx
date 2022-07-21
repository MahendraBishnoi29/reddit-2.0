import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PageContent from "../../../components/Layout/PageContent";

const SubmitPostPage: React.FC = () => {
  return (
    <PageContent>
      <>
        <Box p="16px 0px" border="1px solid" borderColor="white">
          <Text>Create A Submit Form</Text>
        </Box>
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
