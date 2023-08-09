import React from 'react';
import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [ items, setItems ] = useState('')
    const {user} = useAuthContext();
    const [totalAmount, setTotalAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch('/api/cart', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                // console.log(data)
                // if(response.ok){
                //     dispatch({type: 'SET_ITEMS', payload: data})
                // }
                if(!response.ok){
                  setError(data.error);
                }
                else{
                  setTotalAmount(data.reduce((total, item)=>total+item.price, 0));
                  setItems(data); 
                }          
                setIsLoading(false);
            }
            catch(error){
                console.error('Error finding items: ', error);
            }
        }
        if(user){
            fetchItems()
        }
    }, [user]);
    
    const handleClick = () => {
      const del_ids = items.map(item => item._id)
      const deleteItem = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`/api/cart`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(del_ids)
            })
            const data = await response.json();
            if(response.ok){
              navigate('/');
            }
            else{
              setError(data.error);
            }
            setIsLoading(false);
        }
        catch(error){
            console.error('Error Deleting Items')       
        }
      } 
      deleteItem();
    }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex flex-col mb-8">
        {items && items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center py-2 border-b border-gray-300"
          >
            <p>{item.title}</p>
            <p>Rs.{item.price}</p>
          </div>
        ))}
      </div>
      {isLoading && 
          <p className='flex justify-center items-center min-h-screen'>Loading...</p>
      }
      {error && 
        <p>{error}</p>
      }
      {items &&
      <div>
        <h2 className="text-xl font-medium mb-4">Items</h2>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Total Amount:</h2>
          <p className="text-2xl font-bold">Rs.{totalAmount}</p>
        </div>
        <button
          type="submit"
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleClick}>
          Place Order
        </button>
      </div>}
    </div>
  );
};

export default Checkout;
