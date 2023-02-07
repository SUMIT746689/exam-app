import { useEffect, useState } from 'react';
import { UserInfo } from './components/UserInfo';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [userId, setUserId] = useState('');
  const [sectors, setSectors] = useState([]);
  const [data, setData] = useState([]);
  const [existData, setExistData] = useState({});

  useEffect(() => {
    fetch('/sectors')
      .then((res) => res.json())
      .then((res) => setSectors(res.responseParent))
      .catch((err) => console.log({ err }))

    fetch('/users')
      .then((res) => res.json())
      .then((res) => {
        if (res.response) setExistData(res.response);
        else { console.log({ res }) }
      })
      .catch((err) => console.log({ err }))
  }, [])

  // const funchilds = (child, index) => {
  //   console.log(child)
  //   data.push(<option key={child._id} className=' pl-6 md:pl-14 hover:bg-sky-100 cursor-pointer' value={child.value}>{child.name}</option>);
  //   child.childs.length > 0 && child.childs.forEach((child) => {
  //     data.push(<option key={child._id} className={`index pl-${6 * index + 1} md:pl-14 hover:bg-sky-100 cursor-pointer`} value={child.value}>{child.name}</option>);
  //     funchilds(child)
  //   });
  // }
  // const dynamicChild = (child, index) => {
  //   child.childs.length > 0 && child.childs.forEach((child) => {
  //     data.push(<option key={child._id} className={`index pl-${6 * index + 1} md:pl-14 hover:bg-sky-100 cursor-pointer`} value={child.value}>{child.name}</option>);
  //     // console.log(child.childs.length)
  //     funchilds(child, index)
  //   });
  // }
  // console.log(data.length)
  useEffect(() => {
    const data = []
    sectors?.forEach((section) => {
      data.push(<option key={section._id} className=' pl-2 md:pl-5 font-bold hover:bg-sky-100 cursor-pointer' value={section.value}>{section.name}</option>);
      // section.childs.length > 0 && section.childs.forEach((child, index) => {
      //   dynamicChild(child, index + 1)
      section.childs.length > 0 && section.childs.forEach((child) => {
        data.push(<option key={child._id} className=' pl-6 md:pl-14 hover:bg-sky-100 cursor-pointer' value={child.value}>{child.name}</option>);
        child.childs.length > 0 && child.childs.forEach((child) => {
          data.push(<option key={child._id} className=' pl-12 md:pl-24 hover:bg-sky-100 cursor-pointer' value={child.value}>{child.name}</option>);
          child.childs.length > 0 && child.childs.forEach((child) => {
            data.push(<option key={child._id} className=' pl-20 md:pl-32 hover:bg-sky-100 cursor-pointer ' value={child.value}>{child.name}</option>);
            child.childs.length > 0 && child.childs.forEach((child) => {
              data.push(<option key={child._id} className=' pl-24 md:pl-40 hover:bg-sky-100 cursor-pointer ' value={child.value}>{child.name}</option>);
            });
          });
        });
      })
    });

    setData(() => data)

  }, [sectors]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <div className=" text-md text-sky-600 w-full md:w-screen md:h-screen flex justify-center items-center bg-slate-100 p-4 ">
                <div className='flex flex-col md:flex-row gap-6 justify-center'>
                  <UserInfo sectors={data} type="edit" userId={userId} setUserId={setUserId} setExistData={setExistData} />
                  <UserInfo sectors={data} existData={existData} />
                </div>
              </div>
            </>
          }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
