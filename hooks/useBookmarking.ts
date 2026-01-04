import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import useCurrentUser from './useCurrentUser';

const useBookmarking = ({
  postId,
}: {
  postId: string;
}) => {
  const { data: currentUser } = useCurrentUser();
  const [hasBooked, setHasBooked] = useState(false);

  // Utilisez useSWR pour vérifier l'état de chaque post individuellement
  const { data, error, isLoading, mutate } = useSWR(
    currentUser ? `/api/bookmarks/${postId}` : null
  );

  useEffect(() => {
    if (data) {
      setHasBooked(data.bookmarked);
    } else {
      setHasBooked(false);
    }
  }, [data]);

  const toggleBook = useCallback(async () => {
    if (!currentUser) {
      toast.error('You need to be logged in to bookmark a post.');
      return;
    }

    try {
      if (hasBooked) {
        await axios.delete('/api/bookmarks', { data: { postId, userId: currentUser.id } });
        toast.error('Bookmark removed');
      } else {
        await axios.post('/api/bookmarks', { postId, userId: currentUser.id });
        toast.success('Post bookmarked');
      }
      mutate(); // Revalider les données après une modification
    } catch (error) {
      toast.error('Something went wrong while bookmarking.');
      console.error('Error toggling bookmark:', error);
    }
  }, [hasBooked, postId, currentUser, mutate]);

  return {
    hasBooked,
    toggleBook,
    isLoading,
    error,
  };
};

export default useBookmarking;
