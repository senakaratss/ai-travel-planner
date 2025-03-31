import React from "react";
import ActivityCardItem from "./ActivityCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(
            ([dayKey, dayData], index) => (
              <div key={dayKey} className="mt-5">
                <h2 className="font-medium text-lg">
                  Day {index + 1}: {dayData.theme}
                </h2>
                {/* Aktiviteleri iki sütunlu gösteren grid sistemi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dayData.activities.map((activity, idx) => (
                    <div key={idx}>
                        <h2 className="font-medium text-sm text-orange-500">
                        {activity.bestTimeToVisit}
                      </h2>
                      <ActivityCardItem activity={activity} />
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
