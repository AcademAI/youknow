import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { ProfileSettings } from "./ProfileSettings";
import {
  FollowButton,
  UnFollowButton,
} from "@/components/buttons/FollowButtons";
import { AuthorCoursesFollows } from "@/types/types";

const ProfileUserCard = ({ author, session }: AuthorCoursesFollows) => {
  const isFollowing = author.followers.some(
    (follower) => follower.follower.id === session?.user?.id
  );

  return (
    <div className="flex sm:flex-row flex-col items-center gap-x-8">
      <div className="flex items-center justify-center ">
        <Avatar className="w-24 h-24 rounded-full">
          {author.image ? (
            <Image
              fill
              src={author.image}
              alt="author profile"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="text-gray-500">No Image</div>
            </div>
          )}
        </Avatar>
      </div>
      <div>
        {author?.name ? (
          <div className="text-3xl font-bold sm:text-start text-center">
            {author.name}
          </div>
        ) : (
          <div className="text-3xl font-bold sm:text-start text-center">
            No Name
          </div>
        )}
        {author?.email && (
          <div className="text-sm sm:text-start text-center">
            {author.email}
          </div>
        )}
        {author?.bio ? (
          <div className="text-sm sm:text-start text-center">{author.bio}</div>
        ) : null}

        <div className="flex sm:items-start sm:justify-start items-center justify-center mt-4">
          {isFollowing ? (
            <UnFollowButton
              userId={session?.user?.id || ""}
              authorId={author.id}
            />
          ) : (
            <FollowButton
              userId={session?.user?.id || ""}
              authorId={author.id}
            />
          )}
          {session?.user?.id === author.id ? (
            <ProfileSettings author={author} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileUserCard;
