import { Separator } from "../ui/separator";
import { Follows } from "@/types/types";

import { followsColumns } from "@/components/dataTable/Columns";
import { FollowsDataTable } from "@/components/dataTable/DataTables";

export const ProfileFollows = ({ author }: Follows) => {
  const followsData = author.follows.map((follower) => ({
    id: follower.followed.id,
    image: follower.followed.image,
    name: follower.followed.name,
    coursesCount: follower.followed.courses.length,
  }));
  return (
    <section>
      {author.follows.length > 0 ? (
        <div className="mt-4">{`Подписан на: ${author.follows.length}`}</div>
      ) : (
        <div className="mt-4">{`Подписан на: ${author.follows.length}`}</div>
      )}
      <Separator className="my-4" />
      <FollowsDataTable columns={followsColumns} data={followsData} />
    </section>
  );
};
