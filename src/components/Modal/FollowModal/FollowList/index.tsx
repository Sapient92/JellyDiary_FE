import Follow from "./Follow";

import { FollowListContainer } from "./FollowList.styles.ts";
import { FollowType } from "../../../../types/feedType.ts";
import React, { Dispatch, SetStateAction } from "react";

interface FollowListProps {
  data: FollowType[];
  title?: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

const FollowList: React.FC<FollowListProps> = ({ data, closeModal, title }) => {
  return (
    <FollowListContainer>
      {data?.length === 0 ? (
        <p>{title}가 없습니다.</p>
      ) : (
        data?.map((user) => (
          <Follow
            key={user.userId}
            data={user}
            title={title}
            closeModal={closeModal}
          />
        ))
      )}
    </FollowListContainer>
  );
};

export default FollowList;
