import { adminColumns } from "@/components/dataTable/Columns";
import { AdminDataTable } from "../dataTable/DataTables";
import { UserWithRelations } from "@/types/types";
import { Separator } from "../ui/separator";

export const ProfileAdmin = async ({
  users,
}: {
  users: UserWithRelations[];
}) => {
  return (
    <section>
      {users.length > 0 ? (
        <div className="mt-4">{`Пользователи: ${users.length}`}</div>
      ) : (
        <div className="mt-4">{`Пользователи: ${users.length}`}</div>
      )}
      <Separator className="my-4" />
      <AdminDataTable columns={adminColumns} data={users} />
    </section>
  );
};
