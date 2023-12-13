"use client";

import {
  DirectionsRenderer,
  MarkerF,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import {
  useMainMapModalTools,
  useMainTaskDistance, 
} from "../../../../store/maps/use-meta-maps";
import { useMainMapSwitcher } from "../../../../store/use-general";
import { faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export const TaskItem = ({ task }) => {
  const routeToggle = useMainMapModalTools();
  const [taskDRPs, setTaskDRPs] = useState([]);
  const { isMainMap } = useMainMapSwitcher();
  const { addTaskDistance, isTaskDistance } = useMainTaskDistance();

  const source = {
    lat: task.source.lat,
    lng: task.source.lng,
  };
  const destination = {
    lat: task.destination.lat,
    lng: task.destination.lng,
  };

  useEffect(() => {
    directionRoute();
    distanceMatrix();

    // console.log("Task-Swtch, Object:", isTaskDistance)
  }, [isMainMap]);

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
          // console.log("DirectionsService Result:", result);
          setTaskDRPs(result);
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
        destinations: [
          { lat: destination.lat, lng: destination.lng },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          // console.log("DistanceMatrixService Driver Result:", result);
          // console.log(
          //   "Rows Distance",
          //   result.rows[0].elements[0].distance.text
          // );
          addTaskDistance({
            originAddress: result.originAddresses[0],
            destinationAddress: result.destinationAddresses[0],
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
            task: task.task
          });
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  return (
    <>
      <MarkerF
        position={source}
        icon={{
          path: faHouse.icon[4],
          fillColor: "#B10F0F",
          fillOpacity: 1,
          anchor: new google.maps.Point(
            faHouse.icon[0] / 2, // width
            faHouse.icon[1] // height
          ),
          strokeWeight: 1,
          strokeColor: "#ffffff",
          scale: 0.065,
        }}
      >
        <OverlayViewF
          position={source}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="px-2 py-1 rounded-md shadow bg-white/90 font-semibold inline-block">
            <p className="text-[#0f172a] text-sm">
              {task.source.label != "home" ? task.source.label : ""}
              {/* {task.source.address  != "" && } */}
            </p>
          </div>
        </OverlayViewF>
      </MarkerF>
      <MarkerF
        position={destination}
        icon={{
          path: faLocationDot.icon[4],
          fillColor: "#B10F0F",
          fillOpacity: 1,
          anchor: new google.maps.Point(
            faLocationDot.icon[0] / 2, // width
            faLocationDot.icon[1] // height
          ),
          strokeWeight: 1,
          strokeColor: "#ffffff",
          scale: 0.065,
        }}
      >
        <OverlayViewF
          position={destination}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="px-2 py-1 rounded-md shadow bg-white/90 font-semibold inline-block">
            <p className="text-[#0f172a] text-sm">
              {task.destination.label != "home" ? task.destination.label : ""}
              {/* {task.source.address  != "" && } */}
            </p>
          </div>
        </OverlayViewF>
      </MarkerF>
      {routeToggle.isRoute && (
        <DirectionsRenderer
          directions={taskDRPs}
          options={{
            polylineOptions: {
              strokeColor: task.teamColor,
              strokeWeight: 5,
            },
            suppressMarkers: true,
          }}
        />
      )}
    </>
  );
};
