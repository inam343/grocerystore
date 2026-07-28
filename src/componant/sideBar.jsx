    "use client"
    import React, { useState } from 'react'
    import { LiaAngleDoubleDownSolid, LiaAngleDoubleUpSolid } from 'react-icons/lia'
    import FormGroup from '@mui/material/FormGroup';
    import FormControlLabel from '@mui/material/FormControlLabel';
    import Checkbox from '@mui/material/Checkbox';
    import {Collapse} from 'react-collapse';

    const SideBar = () => {
        const [isopencatfilter , setisopencatfilter]=useState(true)
    return (
        <aside className='sticky top-[120px] flex flex-col gap-5 ml-3'>
            <div className="box">
                    <div className='flex gap-3 text-[16px] font-[600] text-gray-700'><h3>Shop by Catagory</h3>
                        <button className="!min-w-[30px] !w-[30px] !h-[30px] rounded-full hover:bg-gray-200" onClick={()=>setisopencatfilter(!isopencatfilter)}>
                            {isopencatfilter===true?<LiaAngleDoubleDownSolid/>:
                            <LiaAngleDoubleUpSolid/>} </button>
                    </div>
                    <Collapse isOpened={isopencatfilter }>
                      <div className="scroll overflow-scroll h-[280px] mt-2">
                        <FormGroup>
                         <FormControlLabel control={<Checkbox  />} label="Fruits & Vegetables" />
                         <FormControlLabel control={<Checkbox  />} label="Breaksfast & Dairy" />
                         <FormControlLabel control={<Checkbox  />} label="Meats & Seafood" />
                         <FormControlLabel control={<Checkbox  />} label="Breads & Bakery" />
                         <FormControlLabel control={<Checkbox  />} label="Beverages" />
                         <FormControlLabel control={<Checkbox  />} label="Frozen Foods" />
                         <FormControlLabel control={<Checkbox  />} label="Biscuits & Snacks" />
                        </FormGroup>
                      </div>
                     </Collapse>
            </div>
            
            <div className="box">
                <div className="flex items-center justify-between mb-4 mt-5">
                     <div className='text-[16px] font-[600] text-gray-600'><h3>Filter By Price</h3>
                     </div>
                </div>
            </div>
        </aside>
    )
    }

    export default SideBar
