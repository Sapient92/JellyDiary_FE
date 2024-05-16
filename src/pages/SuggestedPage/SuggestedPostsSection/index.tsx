import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import api from '../../../api/index.ts';
import { PostsSection } from './SuggestedPostsSection.styles.ts';

const fetchJellyDiaries = async ({ pageParam = 5 }) => {
  const response = await api.get(`/api/jellyDiary?size=5&lastPostId=${pageParam}`);
  console.log(response.data.data.snsList[0]);
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
      <div>
        {data.pages.map((page, index) => (
          <div key={index}>
            {page.items.map((item) => (
              <div key={item.postId}>
                <img src={item.postImg} alt={item.postId} />
                <p>{item.userId}</p>
              </div>
            ))}
          </div>
        ))}
        <div ref={ref} style={{ height: 1 }} />
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </PostsSection>
  );
};

export default SuggestedPostsSection;
