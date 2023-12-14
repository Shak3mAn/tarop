"use client";

import {
  DirectionsRenderer,
  DistanceMatrixService,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import * as Geocode from "react-geocode";
import React, { useContext, useEffect, useState } from "react";

import { UserLocationContext } from "../../../lib/context/context";
import { SelectedTeamContext } from "../../../lib/context/context";
import { Separator } from "../../ui/separator";
import { TDMapTools } from "../tools/mobile-td-tools";

import {
  useLocationPicker,
  useLatLngPicker,
  useRouteToggle,
  useDistance,
} from "../../../store/maps/use-location-picker";
import { useMediaQuery } from "react-responsive";

//TODO: Alter the Markers to include the Place API, introduce the Markers for distance difference matrix API, and Live Tracking API.
//TODO: Ensures UI between Markers is color dependent on the team "COLOR"
//TODO: Add Icon Marker in `MarkerF`
//TODO: Change the Google Maps center configuration to be inclusive of the selected teams, as before.

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
  const routeToggle = useRouteToggle();
  const isDistance = useDistance();
  const addDistance = useDistance((state) => state.addDistance);
  const addSourceGeoInfo = useDistance((state) => state.addSourceGeoInfo);
  const addDestinationGeoInfo = useDistance(
    (state) => state.addDestinationGeoInfo
  );
  const addFromInfo = useLatLngPicker((state) => state.addFromInfo);
  const addToInfo = useLatLngPicker((state) => state.addToInfo);

  const [source, setSource] = useState({
    lat: -1.2822,
    lng: 36.8219,
    label: "source",
  });
  const [sourceInfo, setSourceInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const [destination, setDestination] = useState({
    lat: -1.3076,
    lng: 36.8264,
    label: "destination",
  });
  const [destinationInfo, setDestinationInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const [map, setMap] = useState();
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [distanceMatrixInfo, setDistanceMatrixInfo] = useState([]);

  const { userLocation } = useContext(UserLocationContext);

  // useEffect(() => {
  //   setSource(userLocation);
  //   setDestination(userLocation);
  // }, []);

  useEffect(() => {
    routeToggle.onClose();
  }, [])
  useEffect(() => {
    if (latLngPicker?.isFrom !== null) {
      setSource({
        lat: latLngPicker.isFrom?.lat,
        lng: latLngPicker.isFrom?.lng,
        label: latLngPicker.isFrom?.label,
      });
    } else {
      setSource({
        lat: -1.2822,
        lng: 36.8219,
        label: "source",
      });
    }

    if (latLngPicker?.isTo !== null) {
      setDestination({
        lat: latLngPicker.isTo?.lat,
        lng: latLngPicker.isTo?.lng,
        label: latLngPicker.isTo?.label,
      });
    } else {
      setDestination({
        lat: -1.3076,
        lng: 36.8264,
        label: "destination",
      });
    }
  }, [latLngPicker?.isFrom, latLngPicker?.isTo]);

  useEffect(() => {
    if (source?.lat && destination?.lat) {
      // console.log(distanceMatrixInfo);
      directionRoute();
      distanceMatrix();
    }
  }, [ latLngPicker?.isTo, latLngPicker?.isFrom]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          console.error("ERROR: `DirectionsService` route error!");
        }
      }
    );
  };

  const distanceMatrix = () => {
    const DistanceMatrixService = new google.maps.DistanceMatrixService();

    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [{ lat: source.lat, lng: source.lng }],
        destinations: [{ lat: destination.lat, lng: destination.lng }],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
      
          setDistanceMatrixInfo(result);
          addDistance({
            originAddress: result.originAddresses,
            destinationAddress: result.destinationAddresses,
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
          });
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  const onMarkerDragEndSource = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    let draggedMarker = { lat, lng };
    setSource(draggedMarker);
    addFromInfo({
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
        setSourceInfo(draggedGeoInfo);
        setSource((prevState) => ({
          ...prevState,
          label: draggedGeoInfo.address,
        }));

        addSourceGeoInfo(draggedGeoInfo);

      })
      .catch(console.error);
  };
  const onMarkerDragEndDestination = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    let draggedMarker = { lat, lng };
    setDestination(draggedMarker);
    addToInfo({
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
        setDestinationInfo(draggedGeoInfo);
        setDestination((prevState) => ({
          ...prevState,
          label: draggedGeoInfo.address,
        }));

        addDestinationGeoInfo(draggedGeoInfo);

      })
      .catch(console.error);
  };

  return isLoaded ? (
    <>
    <div className="z-[125]">{isTabletMid && <TDMapTools />}</div>
    {isTabletMid ? (
      <div className="object-cover bg-transparent z-[100]">
        <GoogleMap
          mapContainerStyle={{
            width: "100vh",
            height: "100vh",
            borderBottomLeftRadius: "12px",
            borderTopLeftRadius: "12px",
          }}
          center={source}
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
              position={{ lat: source.lat, lng: source.lng }}
              draggable={true}
              onDragEnd={(coord) => onMarkerDragEndSource(coord)}
            >
              <OverlayViewF
                position={{ lat: source.lat, lng: source.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="px-2 py-1 rounded-md shadow bg-white/90 font-semibold inline-block">
                  <p className="text-[#0f172a] text-sm">
                    {source?.label != "home" ? source?.label : ""}
                    {sourceInfo?.address != "" &&
                    source?.label != latLngPicker.isFrom?.label
                      ? sourceInfo?.address
                      : ""}
                  </p>
                </div>
              </OverlayViewF>
            </MarkerF>
            <MarkerF
              position={{ lat: destination.lat, lng: destination.lng }}
              draggable={true}
              onDragEnd={(coord) => onMarkerDragEndDestination(coord)}
            >
              <OverlayViewF
                position={{ lat: destination.lat, lng: destination.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="px-2 py-1 rounded-md shadow bg-white/90 font-semibold inline-block">
                  <p className="text-[#0f172a] text-sm">
                    {destination?.label != "destination"
                      ? destination?.label
                      : ""}
                    {destinationInfo?.address != "" &&
                    destination?.label != latLngPicker.isTo?.label
                      ? destinationInfo?.address
                      : ""}
                  </p>
                </div>
              </OverlayViewF>
            </MarkerF>

            {routeToggle.isOpen && (
              <DirectionsRenderer
                directions={directionRoutePoints}
                options={{
                  polylineOptions: {
                    strokeColor: "#0f172a",
                    strokeWeight: 5,
                  },
                  suppressMarkers: true,
                }}
              />
            )}
            {/* <DistanceMatrixService
              options={{
                origins: [{ lat: source.lat, lng: source.lng }],
                destinations: [{ lat: destination.lat, lng: destination.lng }],
                travelMode: "DRIVING",
              }}
              callback={(response) => {
                console.log("DistanceReact", response);
              }}
            /> */}
          </>
        </GoogleMap>
      </div>
    ): (
      <div className="object-cover bg-transparent z-[100]">
        <GoogleMap
          mapContainerStyle={{
            width: "750px",
            height: "100%",
            borderBottomLeftRadius: "12px",
            borderTopLeftRadius: "12px",
          }}
          center={source}
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
              position={{ lat: source.lat, lng: source.lng }}
              draggable={true}
              onDragEnd={(coord) => onMarkerDragEndSource(coord)}
            >
              <OverlayViewF
                position={{ lat: source.lat, lng: source.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="px-2 py-1 rounded-md shadow bg-white/90 font-semibold inline-block">
                  <p className="text-[#0f172a] text-sm">
                    {source?.label != "home" ? source?.label : ""}
                    {sourceInfo?.address != "" &&
                    source?.label != latLngPicker.isFrom?.label
                      ? sourceInfo?.address
                      : ""}
                  </p>
                </div>
              </OverlayViewF>
            </MarkerF>
            <MarkerF
              position={{ lat: destination.lat, lng: destination.lng }}
              draggable={true}
              onDragEnd={(coord) => onMarkerDragEndDestination(coord)}
            >
              <OverlayViewF
                position={{ lat: destination.lat, lng: destination.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="px-2 py-1 rounded-md shadow bg-white/90 font-semibold inline-block">
                  <p className="text-[#0f172a] text-sm">
                    {destination?.label != "destination"
                      ? destination?.label
                      : ""}
                    {destinationInfo?.address != "" &&
                    destination?.label != latLngPicker.isTo?.label
                      ? destinationInfo?.address
                      : ""}
                  </p>
                </div>
              </OverlayViewF>
            </MarkerF>

            {routeToggle.isOpen && (
              <DirectionsRenderer
                directions={directionRoutePoints}
                options={{
                  polylineOptions: {
                    strokeColor: "#0f172a",
                    strokeWeight: 5,
                  },
                  suppressMarkers: true,
                }}
              />
            )}
            {/* <DistanceMatrixService
              options={{
                origins: [{ lat: source.lat, lng: source.lng }],
                destinations: [{ lat: destination.lat, lng: destination.lng }],
                travelMode: "DRIVING",
              }}
              callback={(response) => {
                console.log("DistanceReact", response);
              }}
            /> */}
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
