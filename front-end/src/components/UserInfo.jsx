import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserInfo = ({ sectors, type, existData = {}, userId, setUserId, setExistData }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ e: e.target.name.value })
    console.log({ e: e.target.selectors.value })
    console.log({ e: e.target.checkbox.checked })
    if (!e.target.name.value && !e.target.selectors.value && !e.target.checkbox.checked) return;

    const data = {
      name: e.target.name.value,
      selector_id: Number(e.target.selectors.value),
      agree_of_terms: e.target.checkbox.checked
    };

    if (userId) data["_id"] = userId;

    fetch('/users', {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.err) {
          console.log(res.err);

          toast.error('failed to upload!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          });
          throw new Error('failed to update');
        }

        setExistData(res.response);

        //update with getting user information
        e.target.name.value = ''
        e.target.selectors.value = ''
        e.target.checkbox.checked = false

        // e.target.name.value = res.response?.name
        // e.target.selectors.value = res.response?.selector_id
        // e.target.checkbox.checked = res.response?.agree_of_terms

        if (res.response?._id) setUserId(() => res.response._id)

        //success message
        toast.success('upload Successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });

        console.log({ res })
      })
      .catch((err) => console.log({ err }))
  }

  return <>
    <ToastContainer />
    <div className="w-full max-w-lg">
      <div className=" shadow-md text-lg md:text-xl font-medium text-center bg-white py-2 mb-2 uppercase">{(type === "edit" ?  existData.keys?.length ? type: 'create' : '') + ' user info'}</div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-2 xs:px-8 pt-6 pb-8 mb-4 duration-150 hover:scale-[1.005]">
        <div className="text-center py-2 md:text-lg h-16 capitalize">
          {type === "edit" ?
            `Please enter your name and pick the Sectors you are currently
          involved in.`:
            'Databases Stored User Information'
          }
        </div>
        {type === "edit" ?

          <>
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
                required={true}
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
                {sectors}
              </select>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="checkbox"
                type="checkbox"
                required={true}
                disabled={type === "previous" && true}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="checkbox"
                className="ml-2 text-sm font-semibold text-gray-900 "

              >
                Agree to terms
              </label>
            </div>

            <div className="flex items-center justify-between h-10">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </>
          :
          <>
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
                required={true}
                disabled={true}
                value={existData?.name}
              />
            </div>
            <div className="mb-6 text-sm md:text-base h-40">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="selectors"
              >
                Sectors:
              </label>
              <select
                className="w-full focus:outline-sky-600 "
                id="selectors"
                size="6"
                required={true}
                value={existData?.selector_id}
                disabled={true}
              >
                {/* import sectors */}
                {sectors}
              </select>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="checkbox"
                type="checkbox"
                required={true}
                disabled={true}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                checked={existData?.agree_of_terms}
              />
              <label
                htmlFor="checkbox"
                className="ml-2 text-sm font-semibold text-gray-900 "

              >
                Agree to terms
              </label>
            </div>

            <div className="flex items-center justify-between h-10">
              {/* {
              type === "current" && <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            } */}
            </div>
          </>
        }
      </form>
    </div>
  </>
}