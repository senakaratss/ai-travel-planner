import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { getPlaceDetails } from '@/service/GlobalApi';
function HotelCardItem({hotel}) {
     const [photoUrl, setPhotoUrl] = useState();
    
      useEffect(() => {hotel&&getHotelPhoto()}, [hotel]);
    
      const normalizeText = (text) =>
        text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
      
      const getHotelPhoto = async () => {
        let textQuery = hotel?.hotelName;
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
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src={photoUrl} className="h-[170px] w-full object-cover rounded-xl" alt={hotel.hotelName}/>
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                        <h2 className='text-sm'>💰{hotel?.pricePerNight} per night</h2>
                        <h2 className='text-sm'>⭐{hotel?.rating} stars</h2>
                    </div>
                </div>
                </Link>
  )
}

export default HotelCardItem
