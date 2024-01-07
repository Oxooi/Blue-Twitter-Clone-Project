import { formatDistanceToNow } from 'date-fns';
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { BsChat, BsHeart, BsPersonPlus, BsTwitter } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";

import Avatar from "./Avatar";

interface NotificationsFeedProps {
    datePosted: string;
}

const NotificationsFeed: React.FC<NotificationsFeedProps> = ({ datePosted }) => {
    const router = useRouter();
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

    const goToPost = useCallback((postId: string) => {
        if (!postId) return;

        router.push(`/posts/${postId}`);
    }, [router]);


    useEffect(() => {
        mutateCurrentUser();
    }, [mutateCurrentUser]);

    if (fetchedNotifications.length === 0) {
        return (
            <div className="text-neutral-600 text-center p-6 text-xl">
                No Notifications
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {fetchedNotifications.map((notification: Record<string, any>) => (
                <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
                    {/* Put custom icon depend of the notification type */}
                    {notification.type === "like" && (
                        <BsHeart className="text-red-500" />
                    )}
                    {notification.type === "comment" && (
                        <BsChat className="text-blue-500" />
                    )}
                    {notification.type === "follow" && (
                        <BsPersonPlus className="text-sky-500" />
                    )}
                    <Avatar userId={notification.target} />
                    <p
                        onClick={() => goToPost(notification.postUrl)}
                        className="text-white hover:underline cursor-pointer">
                        {notification.body}
                    </p>
                    <p className="text-neutral-500 text-sm">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default NotificationsFeed;