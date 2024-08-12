const ProfilePopover = () => {
    return (
        <div className="flex flex-col w-64">
            <div className="flex flex-col gap-2 mb-3 px-2">
                <div className="font-semibold text-sm">Jin Eu</div>
                <div className="text-xs">a11718trannhuy@gmail.com</div>
            </div>
            <div className="w-full h-[1px] border-t"></div>
            <div
                className="mt-3 cursor-pointer hover:bg-[#F1F5F9] transition-colors duration-300 rounded-md"
                // onClick={handleSignOut}
            >
                <div className="text-sm p-2 flex items-center font-medium">Sign out</div>
            </div>
        </div>
    );
};

export default ProfilePopover;