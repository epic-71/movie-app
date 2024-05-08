import { memo } from "react";

const UserCard = memo(function UserCard({ name }) {
  return (
    <div className="rounded-full w-20 flex flex-col items-center justify-center gap-2">
      <img
        className="w-"
        src="https://cdn-icons-png.flaticon.com/512/147/147129.png"
        alt=""
      />
      <h2 className="text-sm">{name}</h2>
    </div>
  );
});

export default UserCard;
