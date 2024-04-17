import { PostPageDiaryContainer } from "./PostPageDiary.styles.ts";
import PostPageDiaryInfo from "./PostPageDiaryInfo/PostPageDiaryInfo.tsx";

const PostPageDiary = ({ data }) => {
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
  ].filter((data) => data.value !== null);

  return (
    <PostPageDiaryContainer>
      {diaryData.map((data) => (
        <PostPageDiaryInfo
          key={data.label}
          title={data.label}
          content={data.value}
        />
      ))}
    </PostPageDiaryContainer>
  );
};

export default PostPageDiary;
