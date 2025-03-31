export const SelectTravelesList = [
    {
        id:1,
        title:'Just Me',
        desc:'A solo traveleres in exploration mode',
        icon:'🌍',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travelers in tandem',
        icon:'🥂',
        people:'2 people'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 people'
    },
]
export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Budget friendly options',
        icon:'💴',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Mid-range options',
        icon:'💸',
    },
    {
        id:3,
        title:'Luxury',
        desc:'High-end options',
        icon:'💰',
    },
    {
        id:4,
        title:'No Budget',
        desc:'Sky is the limit',
        icon:'🤑',
    }
]
export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address,Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details,Place Image Url, Geo Coordinates, ticket price, rating, Time travel(indicate how much time should be spent at the location, e.g., 45 minutes, 2 hours) each of the location for {totalDays} days with each day plan with best time to visit (include a specific time range, e.g., 09:00 - 11:00) in JSON format'