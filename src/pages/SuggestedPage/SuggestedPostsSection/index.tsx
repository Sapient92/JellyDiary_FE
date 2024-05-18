import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import api from '../../../api/index.ts';
import { PostsSection, PostWrap } from './SuggestedPostsSection.styles.ts';
import SuggestedPost from './SuggestedPost/index.tsx';

interface snsListProps {
  userId: number;
  userName: string;
  userProfileImg: string;
  postId: number;
  postImg: string;
  diaryId: number;
  diaryProfileImage: string;
  like: boolean;
}

const fetchJellyDiaries = async ({ pageParam = 5 }) => {
  const response = await api.get(`/api/jellyDiary?size=5&lastPostId=${pageParam}`);
  return {
    items: response.data.data.snsList,
    lastPostId: response.data.data.snsList[0]?.postId,
  };
};

const SuggestedPostsSection = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['jellyDiaries'],
      queryFn: fetchJellyDiaries,
      getNextPageParam: (lastPage) => {
        return lastPage.lastPostId ?? 0;
      },
    });

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading data</p>;

  return (
    <PostsSection>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.items.map((item: snsListProps) => (
            <PostWrap key={item.postId}>
              <SuggestedPost item={item} />
            </PostWrap>
          ))}
        </React.Fragment>
      ))}
      <div ref={ref} style={{ height: 1 }} />
      {isFetchingNextPage && <div>Loading more...</div>}
    </PostsSection>
  );
};

export default SuggestedPostsSection;
