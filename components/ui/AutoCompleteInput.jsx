"use client";
import React, { useEffect, useRef, useState } from "react";

const loadGoogleMapsScript = (apiKey, callback) => {
  if (window.google) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
};

const AutoCompleteInput = ({ setCoordinates, setAddress }) => {
  const autocompleteInputRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsScript("AIzaSyAmFrhx_j1xZogDmH0gUls0pEgwLJBdz4I", () => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        { types: ["geocode"] }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setAddress(place.formatted_address);
        setCoordinates([lat, lng]);
      });
    });
  }, []);

  return (
    <input
      ref={autocompleteInputRef}
      type="text"
      placeholder="Enter a location"
      className="w-80 p-2 border border-gray-300 rounded-md"
    />
  );
};

export default AutoCompleteInput;
