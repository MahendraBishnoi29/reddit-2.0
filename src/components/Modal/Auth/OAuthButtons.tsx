import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const useDocRef = doc(firestore, "users", user.uid);
    await setDoc(useDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

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
