import React from "react";
import { IoIosSearch } from "react-icons/io";
const Search=()=>
{
    return(
<div className='search bg-[#E6E6E6] h-[30px] sm:w-[500px] md:h-[40] md:w-[600px] w-[100px] rounded-md px-4 relative border border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.5)]'>
    <input type="text"  className="h-full w-full outline-none border-0 " placeholder="search " />
  <button><IoIosSearch  className="size-[20] sm:size-[25] md:size-[35] absolute top-1 right-1  cursor-pointer" /></button>
</div>
    )
}

export default Search