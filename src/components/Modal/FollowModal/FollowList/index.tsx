import Follow from "./Follow";

import { FollowListContainer } from "./FollowList.styles.ts";
import { FollowType } from "../../../../types/feedType.ts";
import React from "react";

interface FollowListProps {
  data: FollowType[];
  title?: string;
}

const FollowList: React.FC<FollowListProps> = ({ data, title }) => {
  return (
    <FollowListContainer>
      {data?.length === 0 ? (
        <p>{title}가 없습니다.</p>
      ) : (
        data?.map((user) => (
          <Follow key={user.userId} data={user} title={title} />
        ))
      )}
    </FollowListContainer>
  );
};

export default FollowList;
