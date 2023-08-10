import {useEffect, useState} from 'react'
//import { useItemsContext } from '../hooks/useItemsContext';
import { BASE_URL } from '../components/helper'
//components
import ItemList from '../components/ItemList'
import useAuthContext from '../hooks/useAuthContext'

const Home = () => {
    const [ itemsForSale, setItemsForSale ] = useState('')
    const [ itemsSold, setItemsSold ] = useState('')

    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const fetchItemsForSale = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/api/shop/sales`, {
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
                    setItemsForSale(data);
                }
                setIsLoading(false);
            }
            catch(error){
                console.error('Error finding items: ', error);
            }
        }
        const fetchItemsSold = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/api/shop/sold`, {
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
                    setItemsSold(data);
                }
                setIsLoading(false);
            }
            catch(error){
                console.error('Error finding items: ', error);
            }
        }
        if(user){
            fetchItemsSold();
            fetchItemsForSale();
        }
    }, [user]);
    
    return(
        <div className="">
            {isLoading && 
                <p className='flex justify-center items-center min-h-screen'>Loading...</p>
            }
            {!isLoading && !itemsForSale && !itemsSold &&
                <p>You have not uploaded any items to sell</p>
            }
            {!isLoading && 
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 pl-6 pt-6'>
                {itemsForSale && itemsForSale.map((item) => (
                    <ItemList key = {item._id} item = {item} from="forSale"/>
                ))}
                {itemsSold && itemsSold.map((item) => (
                    <ItemList key = {item._id} item = {item} from="sold"/>
                ))}
            </div>}
        </div>
    )
}

export default Home
