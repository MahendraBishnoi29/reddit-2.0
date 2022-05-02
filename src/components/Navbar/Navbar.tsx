import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

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
      {/* <Directory />*/}
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
