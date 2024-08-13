import { Select } from "antd";

interface SortProps {
    sort: 'latest' | 'comment';
    handleChangeSort: (value: 'latest' | 'comment') => void;
}

const Sort = (props: SortProps) => {

    const { sort } = props;
    const { handleChangeSort } = props;

    return (
        <div className="w-full flex justify-end">
            <Select
                defaultValue="comment"
                style={{ width: 150 }}
                value={sort}
                onChange={handleChangeSort}
                options={[
                  { value: 'latest', label: 'Latest post' },
                  { value: 'comment', label: 'Top comment' },
                ]}
            />
        </div>
    );
};

export default Sort;