import { PostPageContainer, PostPageContent } from "./PostPage.styles.ts";
import PostPageHeader from "./PostPageHeader/PostPageHeader.tsx";
import PostPageDetail from "./PostPageDetail/PostPageDetail.tsx";
import PostPageDiary from "./PostPageDiary/PostPageDiary.tsx";

const PostPage = () => {
  return (
    <PostPageContainer>
      <PostPageContent>
        <PostPageHeader />
        <PostPageDetail />
        <PostPageDiary />
      </PostPageContent>
    </PostPageContainer>
  );
};

export default PostPage;
