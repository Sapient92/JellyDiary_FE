import {
  FollowModalContainer,
  FollowModalContent,
  TitleContainer,
} from "./FollowModal.styles.ts";
import { FC } from "react";
import FollowList from "./FollowList/FollowList.tsx";

interface FollowModal {
  title: string;
}

const FollowModal: FC<FollowModal> = ({ title }) => {
  return (
    <FollowModalContainer>
      <FollowModalContent>
        <TitleContainer>
          <p>{title}</p>
        </TitleContainer>
        <FollowList />
      </FollowModalContent>
    </FollowModalContainer>
  );
};

export default FollowModal;
