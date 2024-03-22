"use client"
import { useEffect, useRef } from 'react';

const InfiniteScroll = ({ loadMore, hasMore }) => {
    const observer = useRef();

    useEffect(() => {
        if (!hasMore) return;

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        });

        observer.current.observe(document.querySelector('.end-of-content'));

        return () => {
            observer.current.disconnect();
        }
    },[loadMore, hasMore]);

}

export default InfiniteScroll