import React, { useState } from "react";
import FloodEventDropdown from "./floodeventdropdown";
import floodEvents from "./data/floodevents";

const FloodExplorer = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div>
      <h1>Flood Trend Explorer</h1>
      <FloodEventDropdown
        events={floodEvents}
        onSelect={event => setSelectedEvent(event)}
      />
      {selectedEvent && (
        <div className="event-details">
          <h3>{selectedEvent.name}</h3>
          <p><strong>Date Range:</strong> {selectedEvent.dateRange.join(" to ")}</p>
          <p><strong>Fatalities:</strong> {selectedEvent.fatalities}</p>
          <p><strong>Impact Summary:</strong> {selectedEvent.summary}</p>
        </div>
      )}
    </div>
  );
};

export default FloodExplorer;
