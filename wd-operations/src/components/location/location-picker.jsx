"use client";

import { useState } from "react";
import GooglePlacesAutoComplete from "react-google-places-autocomplete";

import {
  useLocationPicker,
  useLatLngPicker,
} from "../../store/maps/use-location-picker";

import { TaskMapModal } from "../modals/task/task-map-modal";

export const LocationPicker = () => {
  const [fromValue, setFromValue] = useState();

  const [toValue, setToValue] = useState(null);
  const [placeholderLabel, setPlaceholderLabel] = useState({
    from: "Location",
    to: "Location",
  });

  const { isLocationPicker, onInitialFalse } = useLocationPicker();
  const isLocation = useLocationPicker();
  const addFromInfo = useLatLngPicker((state) => state.addFromInfo);
  const addToInfo = useLatLngPicker((state) => state.addToInfo);
  const latLngPicker = useLatLngPicker();

  // useEffect(() => {
  //   if (latLngPicker.isFrom !== null) {
  //     setPlaceholderLabel({
  //       from: latLngPicker.isFrom.label,
  //     });
  //   }
  // }, [latLngPicker.isFrom]);

  // useEffect(() => {
  //   if (latLngPicker.isTo !== null) {
  //     setPlaceholderLabel({
  //       to: latLngPicker.isTo.label,
  //     });
  //   }
  // }, [latLngPicker.isTo]);

  const handleFromChange = (target) => {
    if (!target) {
      // console.log("No Target");
      setFromValue(null);
    } else {
      // console.log("Yes Target");
      getLatLngSource(target);
      setFromValue(target);
    }
  };

  const handleToChange = (target) => {
    if (!target) {
      setToValue(null);
    } else {
      // console.log("Any Autocomplete Desty")
      getLatLngDestination(target);
      setToValue(target);
    }
  };

  const getLatLngSource = (target, type) => {
    const placeId = target.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        // console.log(place.geometry.location.lat());
        // console.log("Source Location details:", place)
        addFromInfo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.formatted_address,
          label: place.name,
        });
      }
    });
    // console.log("IsForm Store:", latLngPicker.isFrom);
    // console.log("IsTo Store:", latLngPicker.isTo);
  };

  const getLatLngDestination = (target, type) => {
    const placeId = target.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        // console.log(place.geometry.location.lat());
        addToInfo({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.formatted_address,
          label: place.name,
        });
      }
    });
    // console.log("IsForm Store:", latLngPicker.isFrom);
    // console.log("IsTo Store:", latLngPicker.isTo);
  };
  
  return (
    <div className="space-y-3">
      <div className="flex flex-col space-y-1 space-x-1">
        <span className="text-muted-foreground text-sm">From:</span>
        <div className="flex flex-row items-center justify-between">
          <GooglePlacesAutoComplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
              fromValue,
              onChange: (target) => {
                handleFromChange(target);
              },
              placeholder: "Location",
                // placeholderLabel.from != "Location" && latLngPicker.isFrom.label != null
                //   ? latLngPicker.isFrom.label
                //   : "Location",
              isClearable: true,
              className:
                "h-10 w-[250px] md:w-[300px] rounded-md bg-transparent text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium text-[#0f172a] placeholder:text-[#0f172a]focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              components: {
                DropdownIndicator: false,
              },
            }}
          />
          <TaskMapModal />
        </div>
      </div>

      <div className="flex flex-col space-y-1 space-x-1">
        <span className="text-muted-foreground text-sm">To:</span>
        <div className="flex flex-row items-center justify-between">
          <GooglePlacesAutoComplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
              toValue,
              onChange: (target) => {
                handleToChange(target);
              },
              placeholder: "Location",
                // placeholderLabel.to != "Location" && latLngPicker.isTo.label != null
                //   ? latLngPicker.isTo.label
                //   : "Location",
              isClearable: true,
              className:
                "h-10 w-[250px] md:w-[300px] rounded-md bg-transparent text-[#0f172a] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#0f172a]focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              components: {
                DropdownIndicator: false,
              },
            }}
          />
          <TaskMapModal />
        </div>
      </div>
    </div>
  );
};
