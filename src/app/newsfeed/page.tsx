import Header from "@/components/Header";
import Feed from "@/components/Feed";

const NewsFeed = () => {
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-[3.75rem] px-24 flex items-center justify-center border-b bg-white shadow-sm">
                <Header />
            </div>
            <div
                className="bg-[#eaedf2]"
                style={{
                    height: 'calc(100vh - 60px)'
                }}
            >
                <Feed />
            </div>
        </div>
    );
};

export default NewsFeed;