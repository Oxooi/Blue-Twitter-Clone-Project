import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";
import Button from "../Button";
import useFollow from "@/hooks/useFollow";

const FollowBar = () => {
    const { data: users = [] } = useUsers();

    if (users.lenght === 0) {
        return null;
    }

    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="flex items-center space-x-2">
                <div className="flex-grow flex-col bg-neutral-800 rounded-xl p-4">
                    <h2 className="text-white text-xl font-semibold">Who to follow</h2>
                    <div className="flex flex-col gap-6 mt-4">
                        {users.map((user: Record<string, any>) => {
                            const { isFollowing, toggleFollow } = useFollow(user.id);
                            return (
                                <div key={user.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer">
                                    <Avatar userId={user.id} />
                                    <div className="flex flex-col">
                                        <p className="text-white font-semibold text-sm">{user.name}</p>
                                        <p className="text-neutral-400 text-sm">@{user.username}</p>
                                    </div>
                                    <Button
                                        label={isFollowing ? "Unfollow" : "Follow"}
                                        secondary
                                        thin
                                        onClick={() => toggleFollow()}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowBar;