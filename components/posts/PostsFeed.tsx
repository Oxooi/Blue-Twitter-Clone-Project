import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostsFeedProps {
    userId?: string;
}

const PostsFeed: React.FC<PostsFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId);

    return (
        <>
            {posts.map((post: Record<string, any>) => (
                <PostItem
                    userId={userId}
                    key={post.id}
                    data={post}
                />
            ))}
        </>
    );
}

export default PostsFeed;