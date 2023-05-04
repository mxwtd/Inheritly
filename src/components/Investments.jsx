const Investments = () => {

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
            <div>
              <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8">Investments</h1>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center rounded-xl bg-gradient-to-b from-cyan-500 to-blue-300 h-48">
                  <p className="text-md lg:text-2xl text-gray-200 dark:text-gray-600">Stocks</p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-md lg:text-2xl text-gray-400 dark:text-gray-500">Bonds</p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-md lg:text-2xl text-gray-400 dark:text-gray-500">Funds</p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-md lg:text-2xl text-gray-400 dark:text-gray-500">Commodities</p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-md lg:text-2xl text-gray-400 dark:text-gray-500">Crypto</p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-md lg:text-2xl text-gray-400 dark:text-gray-500">Property</p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-md lg:text-2xl text-gray-400 dark:text-gray-500">Vehicles</p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-md lg:text-2xl text-gray-400 dark:text-gray-500">Jewelery</p>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-md lg:text-2xl text-gray-400 dark:text-gray-500">Miscellaneous</p>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Investments;
