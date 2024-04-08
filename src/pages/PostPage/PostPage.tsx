import { PostPageContainer, PostPageContent } from "./PostPage.styles.ts";
import PostPageHeader from "./PostPageHeader/PostPageHeader.tsx";
import PostPageDetail from "./PostPageDetail/PostPageDetail.tsx";

const PostPage = () => {
  return (
    <PostPageContainer>
      <PostPageContent>
        <PostPageHeader />
        <PostPageDetail />
      </PostPageContent>
    </PostPageContainer>
  );
};

export default PostPage;
