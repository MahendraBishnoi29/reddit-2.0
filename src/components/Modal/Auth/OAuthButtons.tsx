import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex
      direction="column"
      width="100%"
      mb={1}
      onClick={() => signInWithGoogle()}
    >
      <Button variant="oauth" mb={2} isLoading={loading}>
        <Image
          src="/images/googlelogo.png"
          alt="googleLogo"
          height="22px"
          mr={4}
        />
        Continue with Google
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};

export default OAuthButtons;
