import React from "react";
import { useRecoilState } from "recoil";
import { communityState } from "../atoms/communitiesAtom";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const joinCommunity = () => {};
  const leaveCommunity = () => {};

  return {
    communityStateValue,
    joinCommunity,
    leaveCommunity,
  };
};

export default useCommunityData;
