import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Avatar from "../Avatar";

interface UserLogoProps {
    userId: string;
}

const UserLogo: React.FC<UserLogoProps> = ({ userId }) => {
    const { data: fetchedUser } = useUser(userId);
    const router = useRouter();
    return (
        <div className="flex lg:justify-start sm:justify-start md:justify-end rounded-full">
            <div
                onClick={() => router.push(`/users/${userId}`)}
                className="flex items-center space-x-2 mb-[15px] ml-6 mt-6 hover:bg-slate-300 lg:p-4 hover:bg-opacity-10 cursor-pointer transition rounded-full"
            >
                <div className="h-14 w-14 rounded-full">
                    <Avatar userId={userId} />
                </div>
                <div className="flex-col justify-center hidden lg:block">
                    <p className='text-white font-semibold'>
                        {fetchedUser?.name}
                    </p>
                    <p className="text-neutral-500">
                        @{fetchedUser?.username}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserLogo;