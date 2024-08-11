import React from "react";

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  loadingMessage: React.ReactNode;
  endingMessage: React.ReactNode;
}

// eslint-disable-next-line react/display-name
export const InfiniteScroller = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollProps
>(
  (
    {
      fetchNextPage,
      hasNextPage,
      endingMessage,
      loadingMessage,
      children,
      ...props
    },
    ref
  ) => {
    const observerTarget = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          console.log("IntersectionObserver");
          if (entries[0]?.isIntersecting) fetchNextPage();
        },
        { threshold: 1 }
      );

      if (observerTarget.current) {
        observer.observe(observerTarget.current);
      }

      return () => observer.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={ref}
        {...props}
        style={{ overflowAnchor: "none" }}
        className="space-y-4"
      >
        {children}
        <div ref={observerTarget} />
        <div className="my-2 text-center">
          {hasNextPage ? loadingMessage : endingMessage}
        </div>
      </div>
    );
  }
);
