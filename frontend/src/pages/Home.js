import {useEffect, useState} from 'react'
//import { useItemsContext } from '../hooks/useItemsContext';
import { useNavigate } from 'react-router-dom'

//components
import ItemList from '../components/ItemList'
import useAuthContext from '../hooks/useAuthContext'

const Home = () => {
    const [ items, setItems ] = useState('')
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/shop', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if(response.ok){
                    const data = await response.json();
                    console.log(data)
                    // if(response.ok){
                    //     dispatch({type: 'SET_ITEMS', payload: data})
                    // }
                    setItems(data);
                    setIsLoading(false);
                }
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
            {!isLoading && 
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 pl-6 pt-6'>
                {items && items.map((item) => (
                    <ItemList key = {item._id} item = {item} from = "home" />
                ))}
            </div>
            }
        </div>
    )
}

export default Home
