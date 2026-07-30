import React from "react";
import { IoIosSearch } from "react-icons/io";
const Search=()=>
{
    return(
<div className='search bg-[#E6E6E6] h-[30px] sm:w-[500px] w-[100px] rounded-md px-4 relative border border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.5)]'>
    <input className="text-black" type="text"  className="h-full w-full outline-none border-0 " placeholder="search " />
  <button><IoIosSearch size={20} className="absolute top-1 right-1  cursor-pointer" /></button>
</div>
    )
}

export default Search