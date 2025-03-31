import { getPlaceDetails } from '@/service/GlobalApi';
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
      const [photoUrl, setPhotoUrl] = useState();
    
      useEffect(() => {trip&&getPlacePhoto()}, [trip]);
    
      const normalizeText = (text) =>
        text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
      
      const getPlacePhoto = async () => {
        let textQuery = trip?.userSelection?.location?.label;
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
    <Link to={`/view-trip/${trip.id}`}>
    <div className='hover:scale-105 transition-all'>
      <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='h-[250px] w-full object-cover rounded-xl'/>

      <div>
        <h2 className='font-bold text-lg'>
            {trip?.userSelection?.location?.label}
        </h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days with {trip?.userSelection?.budget} Budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem

