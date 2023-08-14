import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import {BASE_URL} from './helper'

export default function ItemList({item , from}) {
  const {user} = useAuthContext();
  const navigate = useNavigate()
  //console.log(from);
  function handleClick(id) {
    const deleteItem = async () => {
      try{
        const response = await fetch(`${BASE_URL}/api/shop/`+ id ,{
          method :'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        console.log(data);
        if(response.ok){
          navigate('/');
        }
      }
      catch(error){
        console.error('Error deleting Item', error)
      }

    }
    deleteItem()
  }
  return (
    <div>
        {(from==="forSale" || from==="home"  )&& <div className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg'>
            <Link to = {`/items/${item._id}`}>
                <img src={item.image.url} alt="" className='h-32 sm:h-[15em] w-full object-cover'/>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <p className="text-green-500 font-semibold">Rs.{item.price}</p>
                </div>
            </Link>
          { (from==="forSale") && <button onClick={() => handleClick(item._id)} className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Remove from Sale</button>}
        </div>}
        {(from==="orders" || from==="sold")  &&<div className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg'>
            <Link to = {`/items/sold/${item._id}`}>
                <img src={item.image.url} alt="" className='h-32 sm:h-[15em] w-full object-cover'/>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <p className="text-green-500 font-semibold">Rs.{item.price}</p>
                    {from==="sold" && <p className="text-red-500 mt-1">Sold</p>}
                </div>
            </Link>
        </div>}
    </div>
  )
}
