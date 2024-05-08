function ProfileCard() {
  return (
    <div className="w-full h-48 mt-5 flex flex-col items-center justify-center cursor-pointer">
      <img
        src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001884.png"
        alt=""
        className="min-w-20 max-w-44 w-[30%]  bg-white rounded-full drop-shadow-2xl"
      />
      <h3 className="font-bold italic tab:text-sm laptop:text-lg">Admin Joshal</h3>
    </div>
  );
}

export default ProfileCard;
