import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding="4px 12px">
      <Flex>
        <Image src="/images/redditFace.svg" height="35px" alt="redditFace" />
        <Image
          src="/images/redditText.svg"
          height="37px"
          alt="redditText"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <SearchInput />
      <RightContent />
      {/* <Directory />*/}
    </Flex>
  );
};

export default Navbar;
