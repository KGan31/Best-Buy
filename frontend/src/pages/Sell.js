import React from 'react'
import { useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
//import { useItemsContext } from '../hooks/useItemsContext';
import {BASE_URL} from '../components/helper';
function Sell() {
  //const {dispatch} = useItemsContext()
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const {user} = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const cloudinary_formdata = new FormData();
    cloudinary_formdata.append('file', img);
    cloudinary_formdata.append('upload_preset', 'best-buy'); 
    const cloudinary_response = await fetch(`https://api.cloudinary.com/v1_1/dyyx9zotu/image/upload`, {
      method: 'POST',
      body: cloudinary_formdata
    })
    const cloudinary_json = await cloudinary_response.json();
    // console.log(cloudinary_json.secure_url);
    if(cloudinary_response.ok){
      console.log(cloudinary_json);
      const item = {
        'title' : name,
        'description': desc,
        'price' : price,
        'image' : {
          'public_id': cloudinary_json.public_id,
          'url': cloudinary_json.secure_url
        }
      }
      console.log(item)
      const response = await fetch(`${BASE_URL}/api/shop`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(item),
      })
      const json = await response.json()
      if(response.ok) {
          setName('')
          setDesc('')
          setPrice('')
          setImg('')
          console.log('New Item added', json)
          //dispatch({type: 'CREATE_ITEM', payload: json})
      }
      else{
        setError(json.error);
      }
    }
    else{
      setError(cloudinary_json.error);
    }
    
    setIsLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='max-w-md mx-auto p-5'>
        <div>
          <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Name of Item:</label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
            
          <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
            <input 
                type="text" 
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className='w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500" placeholder="Enter the item description'
            />
          </div>
            
          <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Price</label>
            <input type="number" 
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className='w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500" placeholder="Enter the item description'
            />
          </div>
            
          <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Upload Image of Product</label>
            <input type="file" 
                onChange={(e) => setImg(e.target.files[0])}
                className='w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500" placeholder="Enter the item description'
            />
          </div>
            {!isLoading && <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Add Item</button>}
        </div>
      </form>
      {isLoading && 
        <p className='flex justify-center items-center min-h-screen'>Adding Item...</p>
      }
      {error &&
        <p>{error}</p>
      }
    </div>
  )
}

export default Sell
