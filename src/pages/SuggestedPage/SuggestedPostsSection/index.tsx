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
  diaryName: string;
  diaryProfileImage: string;
  like: boolean;
}

const fetchJellyDiaries = async ({ pageParam = 0 }) => {
  const endpoint =
    pageParam === 0 ? `/api/jellyDiary?size=3` : `/api/jellyDiary?size=3&lastPostId=${pageParam}`;

  const response = await api.get(endpoint);
  const hasNext = response.data.data.hasNext;

  return {
    items: response.data.data.snsList,
    nextPageParam: hasNext
      ? response.data.data.snsList[response.data.data.snsList.length - 1].postId
      : null,
  };
};

const SuggestedPostsSection = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['jellyDiaries'],
      queryFn: fetchJellyDiaries,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPageParam,
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
      {data?.pages.map((page, pageIndex) => (
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
