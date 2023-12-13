"use client";

import { useState } from "react";
import GooglePlacesAutoComplete from "react-google-places-autocomplete";

import { useLatLngPicker } from "../../../store/maps/use-location-picker";

export const DriverLocationPicker = () => {
  const [driverLocation, setDriverLocation] = useState(null);

  const addDriverInfo = useLatLngPicker((state) => state.addDriverInfo);
  const latLngPicker = useLatLngPicker();

  const handleDLChange = (target) => {
    if (!target) {
      // console.log("No Target");
      setDriverLocation(null);
    } else {
      // console.log("Yes Target");
      getLatLng(target);
      setDriverLocation(target);
    }
  };

  const getLatLng = (target) => {
    const placeId = target.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        // console.log(place.geometry.location.lat());
        addDriverInfo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.formatted_address,
          label: place.name,
        });
      }
    });
    // console.log("IsDriver Store:", latLngPicker.isDriver);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col space-y-1 space-x-1">
        <div className="flex flex-row items-center justify-start">
          <GooglePlacesAutoComplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
              driverLocation,
              onChange: (target) => {
                handleDLChange(target);
              },
              placeholder: "Location",
              isClearable: true,
              className:
                "h-10 w-[300px] text-[#0f172a] rounded-md bg-transparent text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#0f172a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              components: {
                DropdownIndicator: false,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
