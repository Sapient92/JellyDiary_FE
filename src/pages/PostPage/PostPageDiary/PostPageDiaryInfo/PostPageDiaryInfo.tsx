import { PostPageDiaryInfoContainer } from "./PostPageDiaryInfo.styles.ts";
import { FC } from "react";

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
