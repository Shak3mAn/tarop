"use client";

import {
  DirectionsRenderer,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import {
  faCarSide,
  faLocationDot,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

import {
  useDashMapModalTools,
  useTeamDistance,
  useTeamDirection,
} from "../../../../store/maps/use-meta-maps";
import { useDashMapSwitcher } from "../../../../store/use-general";

export const TeamItem = ({ team }) => {
  // const [distanceMatrixInfo, setDistanceMatrixInfo] = useState([]);
  const [taskDRPs, setTaskDRPs] = useState([]);
  const [driverDRPs, setDriverDRPs] = useState([]);
  const { isDashMap } = useDashMapSwitcher();

  const routeToggle = useDashMapModalTools();
  const addTaskDistance = useTeamDistance((state) => state.addTaskDistance);
  const addDriverDistance = useTeamDistance((state) => state.addDriverDistance);

  const { isTaskDistance, isDriverDistance } = useTeamDistance();

  const [dstTaskTemp, setDstTaskTemp] = useState({
    lat: 0,
    lng: 0,
  });
  const [dstDriverTemp, setDstDriverTemp] = useState({
    lat: 0,
    lng: 0,
  });

  const [dstDrv, setDstDrv] = useState(false);
  const [dstTsk, setDstTsk] = useState(false);

  const source = { lat: team.info.lat, lng: team.info.lng };
  const destinationTask = {
    lat: team.task.lat,
    lng: team.task.lng,
  };
  const destinationDriver = {
    lat: team.driver.lat,
    lng: team.driver.lng,
  };

  useEffect(() => {
    distanceMatrixTask();
    directionRouteTask();
    distanceMatrixDriver();
    directionRouteDriver();

  }, [isDashMap]);

  useEffect(() => {
    if (destinationDriver != dstDriverTemp) {
      const timer = setTimeout(() => setDstDrv(true), 5000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setDstDrv(false), 500);
      return () => clearTimeout(timer);
    }
  }, [destinationDriver]);

  useEffect(() => {
    if (destinationTask != dstTaskTemp) {
      const timer = setTimeout(() => setDstTsk(true), 5000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setDstTsk(false), 500);
      return () => clearTimeout(timer);
    }
  }, [destinationTask]);

  useEffect(() => {
    if (dstDrv) {
      distanceMatrixDriver();
      directionRouteDriver();
    }
    setDstDriverTemp(destinationDriver);
  }, [dstDrv]);

  useEffect(() => {
    if (dstTsk) {
      distanceMatrixTask();
      directionRouteTask();
    }
    setDstTaskTemp(destinationTask);
  }, [dstTsk]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        team.info.status == "Initial" ||
        team.info.status == "Pending"
      ) {
        distanceMatrixDriver();
        directionRouteDriver();
      }
      if (
        team.info.status == "Ongoing" ||
        team.info.status == "Delayed"
      ) {
        distanceMatrixTask();
        directionRouteTask();
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const distanceMatrixDriver = () => {
    const DistanceMatrixService = new google.maps.DistanceMatrixService();

    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [{ lat: source.lat, lng: source.lng }],
        destinations: [
          { lat: destinationDriver.lat, lng: destinationDriver.lng },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
        
          addDriverDistance({
            originAddress: result.originAddresses[0],
            destinationAddress: result.destinationAddresses[0],
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
            status: team.info.status,
            team: team.team,
          });
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  const distanceMatrixTask = () => {
    const DistanceMatrixService = new google.maps.DistanceMatrixService();

    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [{ lat: source.lat, lng: source.lng }],
        destinations: [{ lat: destinationTask.lat, lng: destinationTask.lng }],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
        
          //   setDistanceMatrixInfo(result);
          addTaskDistance({
            originAddress: result.originAddresses[0],
            destinationAddress: result.destinationAddresses[0],
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
            status: team.info.status, 
            team: team.team,
          });
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  const directionRouteTask = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destinationTask.lat, lng: destinationTask.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setTaskDRPs(result);
          // addTaskDirection(result);
        } else {
          console.error("ERROR: `DirectionsService` route error!");
        }
      }
    );
  };

  const directionRouteDriver = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destinationDriver.lat, lng: destinationDriver.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("DirectionsService Result:", result);
          setDriverDRPs(result);
          // addDriverDirection(result);
        } else {
          console.error("ERROR: `DirectionsService` route error!");
        }
      }
    );
  };

  return (
    <>
      <MarkerF
        position={source}
        icon={{
          path: faPeopleGroup.icon[4],
          fillColor: "#B10F0F",
          fillOpacity: 1,
          anchor: new google.maps.Point(
            faPeopleGroup.icon[0] / 2, // width
            faPeopleGroup.icon[1] // height
          ),
          strokeWeight: 1,
          strokeColor: "#ffffff",
          scale: 0.065,
        }}
        title={`Team: ${team.team}`}
      />
      {team.info.status == "Pending" && (
        <MarkerF
          position={destinationDriver}
          icon={{
            path: faCarSide.icon[4],
            fillColor: "#B10F0F",
            fillOpacity: 1,
            anchor: new google.maps.Point(
              faCarSide.icon[0] / 2, // width
              faCarSide.icon[1] // height
            ),
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 0.065,
          }}
          title={`Driver: ${team.driver.driver}`}
        />
      )}
      {team.info.status == "Ongoing" ||
      team.info.status == "Delayed" ||
      team.info.status == "Initial" ? (
        <MarkerF
          position={destinationTask}
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
          title={`Destination: ${team.task.task}`}
        />
      ) : (
        <></>
      )}
      {routeToggle.isRoute && (
        <>
          {team.info.status == "Pending" && (
            <DirectionsRenderer
              directions={driverDRPs}
              options={{
                polylineOptions: {
                  strokeColor: team.info.teamColor,
                  strokeWeight: 6,
                },
                suppressMarkers: true,
              }}
            />
          )}
          {team.info.status == "Ongoing" ||
          team.info.status == "Delayed" ||
          team.info.status == "Initial" ? (
            <DirectionsRenderer
              directions={taskDRPs}
              options={{
                polylineOptions: {
                  strokeColor: team.info.teamColor,
                  strokeWeight: 6,
                },
                suppressMarkers: true,
              }}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};
