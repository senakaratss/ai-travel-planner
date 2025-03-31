import { collection, getDocs, query,where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';


function MyTrips() {
  const navigate=useNavigate();
  const[userTrips,setUserTrips]=useState([]);

  useEffect(()=>{
    getUserTrips();
  },[])
  const getUserTrips=async()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(!user){
      navigate('/');
      return;
    }
    const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
    const querySnapshot=await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc)=>{
      console.log(doc.id,"=>",doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()])
    });
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-100 px5 mt-10'> 
      <h2 className='font-bold text-3xl'>MyTrips</h2>
      <div className='mt-10 grid grid-cols-2 md:grid-cols-3 gap-5'> 
        {userTrips.map((trip,index)=>(
          <UserTripCardItem trip={trip} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default MyTrips
