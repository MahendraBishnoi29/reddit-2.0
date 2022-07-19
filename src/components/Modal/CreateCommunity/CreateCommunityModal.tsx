import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import React, { useState } from "react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { async } from "@firebase/util";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charRemaining, setCharRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //for Limiting Characters to 21
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharRemaining(21 - event.target.value.length);
  };

  //Check That Only 1 CheckBox Is Checked
  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  //Create Community Logic
  const handleCreateCommunity = async () => {
    if (error) setError("");
    //validate community
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community name must be between 3-21 characters, and can only contain letters, numbers or undescores"
      );
      return;
    }
    setLoading(true);

    try {
      //if Name is Uniue then create a community doc in firestore
      const communityDocRef = doc(firestore, "communities", communityName);
      const communityDoc = await getDoc(communityDocRef);

      if (communityDoc.exists()) {
        throw new Error(`Sorry, r/${communityName} is taken, Try another.`);
      }

      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });

      // await runTransaction(firestore, async (transaction) => {
      //   const communityDoc = await transaction.get(communityDocRef);
      //   //checks that community name is uniQue
      //   // if (communityDoc.exists()) {
      //   //   throw new Error(`Sorry, r/${communityName} is taken, Try another.`);
      //   // }

      //   //if all above conditions passes create a community in database
      //   transaction.set(communityDocRef, {
      //     creatorId: user?.uid,
      //     createdAt: serverTimestamp(),
      //     numberOfMembers: 1,
      //     privacyType: communityType,
      //   });
      //   //Create communitySnippet on User
      //   transaction.set(
      //     doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
      //     {
      //       communityId: communityName,
      //       isModerator: true,
      //     }
      //   );
      // });
    } catch (error) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" flexDirection="column">
            Modal Title
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={12} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                color={charRemaining === 0 ? "red" : "gray.500"}
                fontSize="9pt"
              >
                {charRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="red">
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Communtiy Type
                </Text>
                {/* CheckBox */}
                <Stack spacing={2}>
                  <Checkbox
                    isChecked={communityType === "public"}
                    name="public"
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon color="gray.500" mr={2} as={BsFillPersonFill} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view post, comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    isChecked={communityType === "restricted"}
                    name="restricted"
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon color="gray.500" mr={2} as={BsFillEyeFill} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view post, comment to this community, but
                        only approved user can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    isChecked={communityType === "private"}
                    name="private"
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon color="gray.500" mr={2} as={HiLockClosed} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved user can view and submit to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
