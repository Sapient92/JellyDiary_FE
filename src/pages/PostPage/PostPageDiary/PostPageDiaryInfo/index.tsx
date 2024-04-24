import { FC } from "react";

import { PostPageDiaryInfoContainer } from "./PostPageDiaryInfo.styles.ts";

type PostPageDiaryInfoProps = {
  title: string;
  content: string;
};

const PostPageDiaryInfo: FC<PostPageDiaryInfoProps> = ({ title, content }) => {
  return (
    <PostPageDiaryInfoContainer>
      <div>
        <p>{title}</p>
      </div>
      <p>{content}</p>
    </PostPageDiaryInfoContainer>
  );
};

export default PostPageDiaryInfo;
