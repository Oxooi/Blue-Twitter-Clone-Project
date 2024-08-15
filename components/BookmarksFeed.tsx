import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { BsChat, BsHeart, BsPersonPlus, BsTwitter } from 'react-icons/bs'

import useCurrentUser from '@/hooks/useCurrentUser'
import Avatar from './Avatar'
import useBookmarking from '@/hooks/useBookmarking'

const BookmarksFeed = () => {
  const router = useRouter()
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
  const { data: fetchedBookmarks = [] } = useBookmarking({
    userId: currentUser?.id,
  })

  const goToPost = useCallback(
    (postId: string) => {
      if (!postId) return

      router.push(`/posts/${postId}`)
    },
    [router],
  )

  useEffect(() => {
    mutateCurrentUser()
  }, [mutateCurrentUser])

  if (fetchedBookmarks.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No Bookmarks
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {fetchedBookmarks.map((bookmark: Record<string, any>) => (
        <div
          key={bookmark.id}
          onClick={() => goToPost(bookmark.postId)}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800 hover:bg-neutral-800 hover:cursor-pointer"
        >
          <Avatar userId={bookmark.post.user.userId} />
          <div className="flex flex-col cursor-default">
            <p className="text-white text-xl font-semibold">
              {bookmark.post.user.name} <span className='text-neutral-500 text-sm font-light'>@{bookmark.post.user.username}</span>
            </p>
            {/* <p className='text-neutral-500 text-sm'>
                @{bookmark.post.user.username}
            </p> */}
            <p className="text-white">{bookmark.post.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookmarksFeed
