    import axios from "axios";
    // import Search from "../../app/components/SearchFunctionality/SearchFeature";
    import Pagination from "../components/Pagination";
    import PostPageData from "../components/postData";

    const fetchData = async (searchParams) => {
        const query = searchParams?.query || '';
        const page = searchParams?.page || 1;
        const limit = 10;
        const skip  = (page-1)*10
        try {
            const response = await axios.get('http://localhost:3001/blogs', {
                params: { query, page, skip}
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
                {/* <Search /> */}
                <PostPageData query={query} page={page} data={getData?.values || []}/>
                <Pagination totalPages={Math.ceil(getData.total/10)}  />
            </div>
        )
    }   