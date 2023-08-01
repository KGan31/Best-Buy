import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
//import { useItemsContext } from '../hooks/useItemsContext';

//components
import useAuthContext from '../hooks/useAuthContext'

const Home = () => {
    const [ items, setItems ] = useState('')
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(null);
    useEffect(()=>{
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/cart', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                console.log(data)
                // if(response.ok){
                //     dispatch({type: 'SET_ITEMS', payload: data})
                // }
                if(data.length){
                    setItems(data)
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
    function handleClick(id) {
        console.log(id)
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/cart/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                console.log(data)
                // if(response.ok){
                //     dispatch({type: 'SET_ITEMS', payload: data})
                // }
                setItems(data)
            }
            catch(error){
                console.error('Error finding items: ', error);
            }
        }
        fetchItems();
    }
    return(
        <div className="">
            {isLoading && 
                <p className='flex justify-center items-center min-h-screen'>Loading...</p>
            }
            {!isLoading && items &&
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 pl-6 pt-6'>
                {items && items.map((item) => (
                    <div key = {item._id} className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg'>
                    <Link to = {`/items/${item._id}`}>
                        <img src={item.image} alt="" className='h-32 sm:h-[15em] w-full object-cover'/>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-700 mb-4">{item.description}</p>
                            <p className="text-green-500 font-semibold">Rs.{item.price}</p>
                            <button onClick={() => handleClick(item._id)} className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Remove from Cart</button>
                        </div>
                    </Link>
                    </div>
                ))}
            </div>}
            {!isLoading && !items && 
            <div>
                No items in Cart
            </div>}
        </div>
    )
}

export default Home
