import {useEffect, useState} from 'react'
//import { useItemsContext } from '../hooks/useItemsContext';

//components
import ItemList from '../components/ItemList'
import useAuthContext from '../hooks/useAuthContext'
import { BASE_URL } from '../components/helper'

const Home = () => {
    const [ items, setItems ] = useState('')
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(`${BASE_URL}/api/shop/orders`, {
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
    
    return(
        <div className="">
            {isLoading && 
                <p className='flex justify-center items-center min-h-screen'>Loading...</p>
            }
            {error &&
                <p>{error}</p>
            }
            {!isLoading && items &&
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 pl-6 pt-6'>
                {items && items.map((item) => (
                    <ItemList key = {item._id} item = {item} from={"orders"}/>
                ))}
                </div>
            }
        </div>
    )
}

export default Home
