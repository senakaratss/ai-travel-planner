import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { getPlaceDetails } from '@/service/GlobalApi'

function ActivityCardItem({activity}) {
  const [photoUrl, setPhotoUrl] = useState();
      
        useEffect(() => {activity&&getActivityPhoto()}, [activity]);
      
        const normalizeText = (text) =>
          text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
        
        const getActivityPhoto = async () => {
          let textQuery = activity?.placeName;
          textQuery = normalizeText(textQuery); // Normalize text
          const data = { textQuery };
        
          console.log("📤 Sending request with:", data);
        
          try {
            const response = await getPlaceDetails(data);
            console.log("✅ Full API Response:", response.data);
        
            if (!response.data.places || response.data.places.length === 0) {
              console.error("❌ No places found!");
              return;
            }
        
            const place = response.data.places[0];
        
            if (!place.photos || place.photos.length === 0) {
              console.error("❌ No photo found for this place.");
              return;
            }
        
            // Fotoğraf Referansını Al
            const photoReference = place.photos[0].name;
            console.log("🖼️ Photo Reference:", photoReference);
        
            // Fotoğraf URL'sini Doğru API ile Kullan
            const photoUrl = `https://places.googleapis.com/v1/${photoReference}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
            
            console.log("🌐 Photo URL:", photoUrl);
            setPhotoUrl(photoUrl);
          } catch (error) {
            console.error("❌ API Error:", error.response?.data || error.message);
          }
        };
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+activity?.placeName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all'>
      <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='w-[130px] h-[130px]  rounded-xl' alt={activity.placeName}/> 
      <div>
        <h2 className='font-bold text-lg'>{activity.placeName}</h2>
        <p className='text-sm text-gray-400'>{activity.placeDetails}</p>
       <p className='mt-2'>🕙{activity.timeTravel}</p>
       {activity.ticketPrice > 0 ? (
  <p className='mt-2'>Ticket price: ${activity.ticketPrice}</p>
) : (
  <p className='mt-2'>Free</p>
)}


      </div>
    </div>
    </Link>
  )
}

export default ActivityCardItem
