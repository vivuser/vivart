const HomepageLoader = () => {

    return (<>
        <div className="h-8 w-60 m-4 bg-gray-200 animate-pulse"></div>
        <div className="flex flex-wrap justify-center max-w-4xl mx-auto">
        {/* Adjust the number of loaders by duplicating the div */}
        <div className="h-40 w-60 m-1 bg-gray-200 animate-pulse md:m-2 w-80"></div>
        <div className="h-40 w-60 m-1 bg-gray-200 animate-pulse md:m-2 w-80"></div>
        <div className="h-40 w-60 m-1 bg-gray-200 animate-pulse md:m-2 w-80"></div>
        <div className="h-40 w-60 m-1 bg-gray-200 animate-pulse md:m-2 w-80"></div>
        <div className="h-40 w-60 m-1 bg-gray-200 animate-pulse md:m-2 w-80"></div>
        <div className="h-40 w-60 m-1 bg-gray-200 animate-pulse md:m-2 w-80"></div>

    </div>

    </>  )
}

export default HomepageLoader;