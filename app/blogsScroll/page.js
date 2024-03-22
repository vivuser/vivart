import axios from "axios";
import PostPageData from "../components/postData";
import InfiniteScroll from "../components/InfiniteScroll";

const fetchData = async (searchParams) => {
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    try {
         const response = await axios.get('http://localhost:3001/blogs', {
            params: { query, page }
        });
console.log(response.data.data.values, 'response..')
        
        return response.data.data
    } catch (error) {
        console.error("Error fetching data:", error);
        return []
    }
};


export default async function Page({ searchParams }) {
const getData = await fetchData(searchParams);
const query = searchParams?.query || '';
const page = searchParams?.page || 1;

console.log(page, query, 'jjdjd')
console.log(getData?.values.length, 'count of doc')

    return (
        <div className="mb-20">
            <InfiniteScroll />
            <PostPageData query={query} page={page} data={getData?.values || []}/>
        </div>
    )
}   