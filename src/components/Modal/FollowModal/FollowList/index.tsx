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
        data?.map((data) => (
          <Follow key={data.userId} data={data} title={title} />
        ))
      )}
    </FollowListContainer>
  );
};

export default FollowList;
