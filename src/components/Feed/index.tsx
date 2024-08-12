import WelcomePost from "./WelcomePost";
import Content from "./Content";

const Feed = () => {
    return (
        <section className="w-full h-full min-w-[524px] max-w-[672px] pt-6">
            <div className="w-full bg-white rounded-lg mb-4">
                <WelcomePost />
            </div>
            <div className="">
                <Content />
            </div>
        </section>
    );
};

export default Feed;