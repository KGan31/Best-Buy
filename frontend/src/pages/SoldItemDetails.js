import React from 'react'
import { useEffect, useState } from 'react';

import { useParams , useNavigate} from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext';
//import { useItemsContext } from '../hooks/useItemsContext';
import { BASE_URL } from '../components/helper';

export default function SoldItemDetails() {
    const {id} = useParams();
    const [item, setItem] = useState('');
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchItem = async () => {
            try{
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/api/shop/sold/${id}` , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                // if(response.ok){
                //     dispatch({type: 'GET_ITEM', payload: data})
                // }
                console.log(data)
                setItem(data)
                setIsLoading(false);
            }
            catch(error){
                console.error('Error finding Item: ', error)
            }
        }
        fetchItem();
    }, []);
  return ( 
    <div>
        {isLoading && 
            <p className='flex justify-center items-center min-h-screen'>Loading...</p>
        }
        {!isLoading && item && 
            <div className="container mx-auto py-8">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative">
                        {item.image && <img src={item.image.url}  alt="Product" className="w-full h-64 object-cover" />}
                    </div>
                    <div className="px-6 py-4">
                        <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex items-center mb-4">
                        <span className="text-green-500 font-bold mr-2">Rs.{item.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}
