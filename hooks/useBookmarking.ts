import { useState, useCallback, useEffect, useMemo } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import useSWR from 'swr'

import useCurrentUser from './useCurrentUser'

import fetcher from '@/libs/fetcher'

const useBookmarking = ({
  postId,
  userId,
}: {
  postId?: string
  userId?: string
}) => {
  const { data: currentUser } = useCurrentUser()
  const [hasBooked, setHasBooked] = useState(false)

  const url = userId ? `/api/bookmarks/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (postId && userId) {
        try {
          const response = await axios.get(`/api/bookmarks`, {
            params: { postId, userId },
          })
          setHasBooked(response.data.bookmarked)
        } catch (error) {
          console.error('Error fetching bookmark status:', error)
        }
      }
    }

    fetchBookmarkStatus()
  }, [postId, userId])

  const toggleBook = useCallback(async () => {
    if (!currentUser) {
      toast.error('You need to be logged in to bookmark a post.')
      return
    }

    try {
      let request

      if (hasBooked) {
        request = () =>
          axios.delete('/api/bookmarks', { data: { postId, userId } })
        toast.error('Bookmark removed')
      } else {
        request = () => axios.post('/api/bookmarks', { postId, userId })
        toast.success('Post bookmarked')
      }

      await request()
      setHasBooked(!hasBooked)
    } catch (error) {
      toast.error('Something went wrong while bookmarking.')
      console.error('Error toggling bookmark:', error)
    }
  }, [hasBooked, postId, userId, currentUser])

  return {
    hasBooked,
    toggleBook,
    data,
    error,
    isLoading,
    mutate
  }
}

export default useBookmarking
