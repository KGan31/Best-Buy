import React from 'react'
import { Link } from 'react-router-dom';


export default function ItemList({item}) {

  return (
    <div>
        <div className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg'>
            <Link to = {`/items/${item._id}`}>
                <img src={item.image} alt="" className='h-32 sm:h-[15em] w-full object-cover'/>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <p className="text-green-500 font-semibold">Rs.{item.price}</p>
                </div>
            </Link>
        </div>
    </div>
  )
}
