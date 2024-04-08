import { PostPageDiaryContainer } from "./PostPageDiary.styles.ts";
import PostPageDiaryInfo from "./PostPageDiaryInfo/PostPageDiaryInfo.tsx";

const PostPageDiary = () => {
  return (
    <PostPageDiaryContainer>
      <PostPageDiaryInfo
        title={"라리 일지"}
        content={`오늘 하루 종일 잠이 늘었다
        놀이 반응이 좋아서 재밌게 놀았다`}
      />
      <PostPageDiaryInfo
        title={"식사"}
        content={"내가 먹다 남은 것 조금 나눠줌"}
      />
      <PostPageDiaryInfo title={"간식"} content={"나도 못 먹는걸 줄리가"} />
      <PostPageDiaryInfo title={"물"} content={"변기물 마시는거 봤음"} />
      <PostPageDiaryInfo title={"산책"} content={"A 코스"} />
      <PostPageDiaryInfo title={"목욕"} content={"일단 나부터"} />
    </PostPageDiaryContainer>
  );
};

export default PostPageDiary;
