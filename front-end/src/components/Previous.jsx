export const Previous = ({ data }) => {

  return <>
    <div className="w-full max-w-lg">
      <div className=" text-xl text-center bg-white py-2 mb-2 shadow-md">Previous</div>
      <form
        // onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 duration-150 hover:scale-[1.005]">
        <div className="text-center py-2 font-bold text-xl">
          Please enter your name and pick the Sectors you are currently
          involved in.
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="name"
            required
          />
        </div>
        <div className="mb-6 text-sm md:text-base">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="selectors"
          >
            Sectors:
          </label>
          <select
            className="w-full focus:outline-sky-600 "
            id="selectors"
            multiple=""
            size="6"
            required={true}
          >
            {/* import sectors */}
            {data}
          </select>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="checkbox"
            type="checkbox"
            required={true}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="checkbox"
            className="ml-2 text-sm font-semibold text-gray-900 "
            value={1}
          >
            Agree to terms
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </>
}