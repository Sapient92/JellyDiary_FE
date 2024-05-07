import React from "react";

import PostPageDiaryInfo from "./PostPageDiaryInfo";

import { WriteInputType } from "../../../types/postType.ts";

import { PostPageDiaryContainer } from "./PostPageDiary.styles.ts";

interface PostPageDiaryProps {
  data: WriteInputType;
}

const PostPageDiary: React.FC<PostPageDiaryProps> = ({ data }) => {
  const {
    meal,
    snack,
    water,
    walk,
    toiletRecord,
    shower,
    weight,
    specialNote,
  } = data;

  const diaryData = [
    { label: "식사", value: meal },
    { label: "간식", value: snack },
    { label: "물", value: water },
    {
      label: `  산책\n(일광욕)`,
      value: walk,
    },
    { label: "배변", value: toiletRecord },
    { label: "목욕", value: shower },
    { label: "체중", value: weight },
    { label: "행동\n/특이사항", value: specialNote },
  ].filter((data) => data.value !== null && data.value !== undefined);

  return (
    <PostPageDiaryContainer>
      {diaryData.map((data) => (
        <PostPageDiaryInfo
          key={data.label}
          title={data.label}
          content={typeof data.value === "string" ? data.value : ""}
        />
      ))}
    </PostPageDiaryContainer>
  );
};

export default PostPageDiary;
