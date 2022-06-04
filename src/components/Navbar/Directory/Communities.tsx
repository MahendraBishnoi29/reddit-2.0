import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
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
    </>
  );
};

export default Communities;
