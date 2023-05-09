const AssetDetailPage = () => {

  return (
    <>
      <div className="p-4 sm:ml-64 h-[100%]">
        <div className="p-4 mt-14">
          <div>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8">
              {"{"} Vanguard S&P 500 {"}"}
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 mb-4">
            <div className="flex justify-start rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
              <p className="text-md lg:text-xl px-4 py-2 text-gray-400 dark:text-gray-500">
                Total Asset Balance
              </p>
            </div>
            <div className="flex justify-start rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
              <p className="text-md lg:text-xl px-4 py-2 text-gray-400 dark:text-gray-500">
                Quarterly Report
              </p>
            </div>
            <div className="flex justify-start rounded-xl bg-gray-50 h-full col-span-2 row-span-2 dark:bg-gray-800">
              <p className="text-md lg:text-xl px-4 py-2 text-gray-400 dark:text-gray-500">
                Asset Distribution
              </p>
            </div>
            <div className="flex justify-start rounded-xl bg-gray-50 h-full col-span-2 md:col-start-3 md:row-start-1 row-span-2 dark:bg-gray-800">
              <p className="text-md lg:text-xl px-4 py-2 text-gray-400 dark:text-gray-500">Best Performers</p>
            </div>
            <div className="flex justify-start rounded-xl col-span-2 bg-gray-50 h-48 dark:bg-gray-800">
              <p className="text-md lg:text-xl px-4 py-2 text-gray-400 dark:text-gray-500">
                My Digital Will
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssetDetailPage;
