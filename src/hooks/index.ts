export interface IUseInfiniteScroll {
  isLoading: boolean;
  loadMoreCallback: (el: HTMLDivElement) => void;
  hasDynamicPosts: boolean;
  dynamicPosts: any[];
  isLastPage: boolean;
}
