import {useEffect, useState} from 'react'
//import { useItemsContext } from '../hooks/useItemsContext';

//components
import ItemList from '../components/ItemList'
import useAuthContext from '../hooks/useAuthContext'

const Home = () => {
    const [ items, setItems ] = useState('')
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(null);
    useEffect(()=>{
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/shop/orders', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                // console.log(data)
                // if(response.ok){
                //     dispatch({type: 'SET_ITEMS', payload: data})
                // }
                if(data.length){
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
            {!isLoading && !items &&
                <p>You have not made any purchases</p>
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
