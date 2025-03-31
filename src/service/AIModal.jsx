import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location:Antalya, for 3 Days for Couple with a Cheap budget,Give me a Hotels options list with HotelName, Hotel address,Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details,Place Image Url, Geo Coordinates, ticket price, rating, Time travel(indicate how much time should be spent at the location, e.g., 45 minutes, 2 hours) each of the location for 3 days with each day plan with best time to visit(include a specific time range, e.g., 09:00 - 11:00)** in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `
{
  "tripDetails": {
    "location": "Antalya",
    "duration": "3 Days",
    "budget": "Cheap",
    "travelers": "Couple"
  },
  "hotelOptions": [
    {
      "hotelName": "Minyon Hotel",
      "hotelAddress": "Selcuk Mahallesi, 46. Sokak No:22, Kaleici, Antalya, Turkey",
      "pricePerNight": 30,
      "hotelImageURL": "https://example.com/minyon_hotel.jpg",
      "geoCoordinates": {
        "latitude": 36.8841,
        "longitude": 30.7056
      },
      "rating": 4.2,
      "description": "A cozy and budget-friendly hotel located in the heart of Kaleici (Old Town). Offers simple but clean rooms and a great location for exploring historical sites."
    },
    {
      "hotelName": "Kaleici Marina Hotel",
      "hotelAddress": "Kilicarslan Mah. Hesapci Gecidi No:21 Kaleici, Antalya, Turkey",
      "pricePerNight": 35,
      "hotelImageURL": "https://example.com/kaleici_marina_hotel.jpg",
      "geoCoordinates": {
        "latitude": 36.8845,
        "longitude": 30.7074
      },
      "rating": 4.0,
      "description": "A charming hotel with views of the marina, located in Kaleici. Offers affordable rooms and easy access to restaurants and shops."
    },
    {
      "hotelName": "Route Hotel Kaleici",
      "hotelAddress": "Barbaros Mah. Hesapci Gecidi Sok. No:21 Kaleici, Antalya, Turkey",
      "pricePerNight": 28,
      "hotelImageURL": "https://example.com/route_hotel_kaleici.jpg",
      "geoCoordinates": {
        "latitude": 36.8843,
        "longitude": 30.7070
      },
      "rating": 3.8,
      "description": "Simple hotel in the Kaleici area, near local attractions."
    }
  ],
  "itinerary": {
    "day1": {
      "theme": "Exploring Kaleici (Old Town)",
      "activities": [
        {
          "placeName": "Hadrian's Gate",
          "placeDetails": "A historic Roman triumphal arch built in the 2nd century AD.",
          "placeImageURL": "https://example.com/hadrians_gate.jpg",
          "geoCoordinates": {
            "latitude": 36.8838,
            "longitude": 30.7082
          },
          "ticketPrice": 0,
          "rating": 4.6,
          "bestTimeToVisit": "08:00 - 09:00 (to avoid crowds)",
          "timeTravel": "45 minutes"
        },
        {
          "placeName": "Kaleici Marina",
          "placeDetails": "A picturesque marina with boats, cafes, and restaurants.",
          "placeImageURL": "https://example.com/kaleici_marina.jpg",
          "geoCoordinates": {
            "latitude": 36.8833,
            "longitude": 30.7088
          },
          "ticketPrice": 0,
          "rating": 4.5,
          "bestTimeToVisit": "10:00 - 12:00 (for boat tours)",
          "timeTravel": "2 hours",
          "transportationDetails": "5-minute walk from Hadrian's Gate."
        },
        {
          "placeName": "Hidirlik Tower",
          "placeDetails": "A historic tower offering panoramic views of the city and coastline.",
          "placeImageURL": "https://example.com/hidirlik_tower.jpg",
          "geoCoordinates": {
            "latitude": 36.8807,
            "longitude": 30.7115
          },
          "ticketPrice": 15,
          "rating": 4.3,
          "bestTimeToVisit": "17:00 - 18:00 (for sunset views)",
          "timeTravel": "1 hour 30 minutes",
          "transportationDetails": "15-minute walk from Kaleici Marina."
        }
      ]
    },
    "day2": {
      "theme": "Beaches and Waterfalls",
      "activities": [
        {
          "placeName": "Mermerli Beach",
          "placeDetails": "A small, secluded beach located within Kaleici.  Offers clear water and a relaxed atmosphere.",
          "placeImageURL": "https://example.com/mermerli_beach.jpg",
          "geoCoordinates": {
            "latitude": 36.8824,
            "longitude": 30.7086
          },
          "ticketPrice": 30,
          "rating": 4.1,
          "bestTimeToVisit": "09:00 - 11:00 (for quiet time before it gets crowded)",
          "timeTravel": "3 hours"
        },
        {
          "placeName": "Lower Duden Waterfall",
          "placeDetails": "A stunning waterfall cascading directly into the Mediterranean Sea.",
          "placeImageURL": "https://example.com/lower_duden_waterfall.jpg",
          "geoCoordinates": {
            "latitude": 36.8322,
            "longitude": 30.7711
          },
          "ticketPrice": 0,
          "rating": 4.7,
          "bestTimeToVisit": "15:00 - 17:00 (for the best light for photos)",
          "timeTravel": "2 hours",
          "transportationDetails": "Take the Tram from Kaleici to Ismetpasa and then take Bus VF66 or VF01 to the waterfall. This will take approximately 45 minutes."
        }
      ]
    },
    "day3": {
      "theme": "Culture and Shopping",
      "activities": [
        {
          "placeName": "Antalya Museum",
          "placeDetails": "One of Turkey's largest museums, showcasing artifacts from the region's rich history.",
          "placeImageURL": "https://example.com/antalya_museum.jpg",
          "geoCoordinates": {
            "latitude": 36.8792,
            "longitude": 30.6856
          },
          "ticketPrice": 60,
          "rating": 4.4,
          "bestTimeToVisit": "10:00 - 12:00 (to avoid the afternoon heat)",
          "timeTravel": "2 hours",
          "transportationDetails": "Take the tram from the Old Town area to Müze Durağı station."
        },
        {
          "placeName": "Republic Square",
          "placeDetails": "Central square with a statue and a great place for people-watching.",
          "placeImageURL": "https://example.com/republic_square.jpg",
          "geoCoordinates": {
            "latitude": 36.8872,
            "longitude": 30.7063
          },
          "ticketPrice": 0,
          "rating": 4.2,
          "bestTimeToVisit": "18:00-19:00",
          "timeTravel": "1 hour",
          "transportationDetails": "Walking from museum will be around 15 minutes. The museum will be in the south and the square in the north."
        },
        {
          "placeName": "Local Bazaar",
          "placeDetails": "Explore local culture and find souveniers.",
          "placeImageURL": "https://example.com/local_bazaar.jpg",
          "geoCoordinates": {
            "latitude": 36.8820,
            "longitude": 30.7100
          },
          "ticketPrice": 0,
          "rating": 3.9,
          "bestTimeToVisit": "14:00-16:00",
          "timeTravel": "2 hours",
          "transportationDetails": "Walking from Republic Square will be around 10 minutes in the south."
        }
      ]
    }
  }
}
`,
        },
      ],
    },
  ],
});
