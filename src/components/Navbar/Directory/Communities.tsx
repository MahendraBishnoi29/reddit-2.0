import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />

      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="8pt" fontWeight={500} color="gray.500">
          MODERATING
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              imageURL={snippet.imageURL}
              displayText={`r/${snippet?.communityId}`}
              link={`/r/${snippet.communityId}`}
              icon={FaReddit}
              iconColor="brand.100"
            />
          ))}
      </Box>

      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="8pt" fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>
        <MenuItem
          onClick={() => setOpen(true)}
          fontSize="10pt"
          width="100%"
          _hover={{ bg: "gray.100" }}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={3} as={GrAdd} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            imageURL={snippet.imageURL}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            icon={FaReddit}
            iconColor="brand.100"
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;
