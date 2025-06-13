//HomeButtons.jsx
import React from 'react'

const HomeButtons = ({title}) => {
  return (
    <div>
        <button className='bg-[#5F35F5] duration-300 transition-all hover:bg-sky-400 rounded-[5px] cursor-pointer text-xl text-white font-semibold px-3 py-1' >{title?title:"Join"}</button>
    </div>
  )
}

export default HomeButtons