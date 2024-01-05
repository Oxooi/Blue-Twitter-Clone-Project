import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";
import Button from "../Button";
import useFollow from "@/hooks/useFollow";
import useCurrentUser from "@/hooks/useCurrentUser";

// Create a composant for the user list elements
const UserItem = ({ user }) => {
    const { isFollowing, toggleFollow } = useFollow(user.id);

    return (
        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer">
            <Avatar userId={user.id} />
            <div className="flex-grow">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
            </div>
            {/* Show the button follow if the user is connected */}
            <Button
                label={isFollowing ? "Unfollow" : "Follow"}
                secondary
                thin
                onClick={toggleFollow}
            />
        </div>
    );
};

const FollowBar = () => {
    const { data: users = [] } = useUsers();
    const { data: currentUser } = useCurrentUser();

    if (users.length === 0 || !currentUser) {
        return null;
    }

    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="flex items-center space-x-2">
                <div className="flex-grow flex-col bg-neutral-800 rounded-xl p-4">
                    <h2 className="text-white text-xl font-semibold">Who to follow</h2>
                    <div className="flex flex-col gap-6 mt-4">
                        {users.map((user) => {
                            // Dont show the button if the user is not connected
                            if (currentUser.id !== user.id) {
                                return <UserItem key={user.id} user={user} />;
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowBar;