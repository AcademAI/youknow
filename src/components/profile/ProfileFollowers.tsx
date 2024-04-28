import { Separator } from "../ui/separator";
import { Follower } from "@/types/types";
import { followersColumns } from "@/components/dataTable/Columns";
import { FollowersDataTable } from "@/components/dataTable/DataTables";

export const ProfileFollowers = ({ author }: Follower) => {
  const followersData = author.followers.map((follower) => ({
    id: follower.follower.id,
    image: follower.follower.image,
    name: follower.follower.name,
    coursesCount: follower.follower.courses.length,
  }));
  return (
    <section>
      {author.followers.length > 0 ? (
        <div className="mt-4">{`Подписчики: ${author.followers.length}`}</div>
      ) : (
        <div className="mt-4">{`Подписчики: ${author.followers.length}`}</div>
      )}
      <Separator className="my-4" />
      <FollowersDataTable columns={followersColumns} data={followersData} />
    </section>
  );
};
