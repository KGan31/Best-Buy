import React from 'react'
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext';
//import { useItemsContext } from '../hooks/useItemsContext';
import { BASE_URL } from '../components/helper';

export default function ItemDetails() {
    const {id} = useParams();
    const [item, setItem] = useState('');
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchItem = async () => {
            try{
                setIsLoading(true);
                setError(null);
                const response = await fetch(`${BASE_URL}/api/shop/${id}` , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                // if(response.ok){
                //     dispatch({type: 'GET_ITEM', payload: data})
                // }
                if(!response.ok){
                    setError(data.error);
                }
                else{
                    setItem(data)
                }
                setIsLoading(false);
            }
            catch(error){
                console.error('Error finding Item: ', error)
            }
        }
        fetchItem();
    }, []);
    const handleClick = () => {
        const addToCart = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(`${BASE_URL}/api/cart/${id}`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const msg = await response.json()
                if(!response.ok){
                    setError(msg.error);
                }
                // else{
                //     setItem(msg);
                // }
                // console.log(msg);
                setIsLoading(false);
            }
            catch(error){
                console.error('Error Deleting Items')
                
                setIsLoading(false);
            }
        } 
        addToCart();
    }
  return ( 
    <div>
        {isLoading && 
                <p className='flex justify-center items-center min-h-screen'>Loading...</p>
        }
        {!isLoading && item &&
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
                {item.image && <img src={BASE_URL+ "/" + item.image}  alt="Product" className="w-full h-64 object-cover" />}
            </div>
            <div className="px-6 py-4">
                <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center mb-4">
                <span className="text-green-500 font-bold mr-2">Rs.{item.price}</span>
                <span className="text-sm text-gray-500">(Free shipping)</span>
                </div>
                <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Add to Cart
                </button>
            </div>
            </div>
        </div>}
        {error &&
        <p>{error}</p>
        }
    </div>
  )
}
