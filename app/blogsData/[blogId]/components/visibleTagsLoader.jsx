const VisibleTagsLoader = () => {

    return (
        <div className="flex space-x-2">
        {/* Adjust the number of loaders by duplicating the div */}
        <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
        {/* Add more divs as needed */}
    </div>

    )
}

export default VisibleTagsLoader;