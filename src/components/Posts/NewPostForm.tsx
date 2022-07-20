import { Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { User } from "firebase/auth";

import { useRouter } from "next/router";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRecoilState, useSetRecoilState } from "recoil";

type NewPostFormProps = {};

function NewPostForm({}: NewPostFormProps) {
  const formTabs = [
    {
      title: "Post",
      icon: IoDocumentText,
    },
    {
      title: "Images & Video",
      icon: IoImageOutline,
    },
    {
      title: "Link",
      icon: BsLink45Deg,
    },
    {
      title: "Poll",
      icon: BiPoll,
    },
    {
      title: "Talk",
      icon: BsMic,
    },
  ];

  export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <></>
        ))}
      </Flex>
    </Flex>
  );
}

export default NewPostForm;
