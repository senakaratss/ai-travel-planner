import { Button } from "@/components/ui/button";
import { getPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect,useState} from "react";
import { FaShareAlt } from "react-icons/fa";


function InfoSection({ trip }) {

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
    <div>
      <img
        src={photoUrl}
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💵{trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 Number of Traveler:{trip?.userSelection?.traveler}{" "}
            </h2>
          </div>
        </div>
        <Button><FaShareAlt />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
