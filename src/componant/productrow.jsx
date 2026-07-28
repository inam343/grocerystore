"use client"
import React from "react"
import { MdOutlineArrowRightAlt } from "react-icons/md"
import Productslider from "./productslider"
import Link from "next/link"


const Productrow=(props)=>
{
    return(
        <section className="bg-white py-1">
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-[20px] text-gray-800 font-[600]">{props?.tittle}</h2>
                    <Link href="/" className="flex items-center gap-1 text-[16px] text-gray-800 font-[600] hover:text-green-600">View All<MdOutlineArrowRightAlt size={25}/></Link>
                </div>
                <Productslider products={props?.product} />
            </div>
        </section>
    )
}
export default Productrow