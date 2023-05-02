const Dashboard = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
            <div>
              <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 my-8">Dashboard</h1>
            </div>
            <div className="flex items-center justify-center h-60 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-48 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-60 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
      </div>
    </>
  );
}

export default Dashboard;
