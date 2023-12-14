"use client";

import {
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import * as Geocode from "react-geocode";
import React, { useContext, useEffect, useState } from "react";

import { UserLocationContext } from "../../../lib/context/context";
import { TDMapTools } from "../tools/mobile-td-tools";

import {
  useLatLngPicker,
  useDistance,
} from "../../../store/maps/use-location-picker";
import { useMediaQuery } from "react-responsive";

export const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  Geocode.setDefaults({
    key: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
    language: "en",
    region: "ke",
  });

  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  const latLngPicker = useLatLngPicker();
  const addTeamGeoInfo = useDistance((state) => state.addTeamGeoInfo);
  const addTeamInfo = useLatLngPicker((state) => state.addTeamInfo);
  const { userLocation } = useContext(UserLocationContext);

  const [teamLocation, setTeamLocation] = useState({
    lat: -1.2921,
    lng: 36.8219,
    label: "driver",
  });
  const [teamInfo, setTeamInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (latLngPicker.isTeam !== null) {
      setTeamLocation({
        lat: latLngPicker.isTeam.lat,
        lng: latLngPicker.isTeam.lng,
        label: latLngPicker.isTeam.label,
      });
    } else {
      setTeamLocation(userLocation);
    }
  }, [latLngPicker.isTeam]);

  const onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    let draggedMarker = { lat, lng };
    setTeamLocation(draggedMarker);
    addTeamInfo({
      lat: lat,
      lng: lng,
    });

    Geocode.fromLatLng(lat, lng)
      .then(({ results }) => {
        const address = results[0].formatted_address;
        const { city, state, country } = results[0].address_components.reduce(
          (acc, component) => {
            if (component.types.includes("locality"))
              acc.city = component.long_name;
            else if (component.types.includes("administrative_area_level_1"))
              acc.state = component.long_name;
            else if (component.types.includes("country"))
              acc.country = component.long_name;
            return acc;
          },
          {}
        );

        let draggedGeoInfo = { address, city, state, country };
        setTeamInfo(draggedGeoInfo);
        setTeamLocation((prevState) => ({
          ...prevState,
          label: draggedGeoInfo.address,
        }));
        addTeamGeoInfo(draggedGeoInfo);
      })
      .catch(console.error);
  };

  return isLoaded ? (
    <>
      <div className="z-[125]">{isTabletMid && <TDMapTools />}</div>
      {isTabletMid ? (
        <div className="object-cover bg-transparent z-[120]">
          <GoogleMap
            mapContainerStyle={{
              width: "100vh",
              height: "100vh",
              borderRadius: "12px",
            }}
            center={teamLocation}
            zoom={15}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {/* Child components, such as markers, info windows, etc. */}

            <>
              <MarkerF
                position={{ lat: teamLocation.lat, lng: teamLocation.lng }}
                draggable={true}
                onDragEnd={(coord) => onMarkerDragEnd(coord)}
              >
                <OverlayViewF
                  position={{ lat: teamLocation.lat, lng: teamLocation.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="px-2 py-1 rounded-md shadow bg-white/90 font-semibold inline-block">
                    <p className="text-[#0f172a] text-sm">
                      {teamLocation?.label != "driver"
                        ? teamLocation?.label
                        : ""}
                      {teamInfo?.address != "" &&
                      teamLocation?.label != latLngPicker.isTeam?.label
                        ? teamInfo?.address
                        : ""}
                    </p>
                  </div>
                </OverlayViewF>
              </MarkerF>
            </>
          </GoogleMap>
        </div>
      ) : (
        <div className="object-cover bg-transparent z-[120]">
          <GoogleMap
            mapContainerStyle={{
              width: "650px",
              height: "100%",
              borderBottomLeftRadius: "12px",
              borderTopLeftRadius: "12px",
            }}
            center={teamLocation}
            zoom={15}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {/* Child components, such as markers, info windows, etc. */}

            <>
              <MarkerF
                position={{ lat: teamLocation.lat, lng: teamLocation.lng }}
                draggable={true}
                onDragEnd={(coord) => onMarkerDragEnd(coord)}
              >
                <OverlayViewF
                  position={{ lat: teamLocation.lat, lng: teamLocation.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="px-2 py-1 rounded-md shadow bg-white/90 font-semibold inline-block">
                    <p className="text-[#0f172a] text-sm">
                      {teamLocation?.label != "driver"
                        ? teamLocation?.label
                        : ""}
                      {teamInfo?.address != "" &&
                      teamLocation?.label != latLngPicker.isTeam?.label
                        ? teamInfo?.address
                        : ""}
                    </p>
                  </div>
                </OverlayViewF>
              </MarkerF>
            </>
          </GoogleMap>
        </div>
      )}
    </>
  ) : (
    <>
      <div className="h-full w-full rounded-[12px] flex items-center justify-center bg-primary/50 ">
        Subiri! Let it Load!!
      </div>
    </>
  );
};
