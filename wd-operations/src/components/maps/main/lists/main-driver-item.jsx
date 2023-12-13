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
  useMainDriverDistance,
} from "../../../../store/maps/use-meta-maps.js";
import { useMainMapSwitcher } from "../../../../store/use-general.jsx";
import {
  faCarSide,
  faLocationDot,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

export const DriverItem = ({ driver }) => {
  const [teamDRPs, setTeamDRPs] = useState([]);
  const [taskDRPs, setTaskDRPs] = useState([]);
  const { isMainMap } = useMainMapSwitcher();

  // const [srcTemp, setSrcTemp] = useState({
  //   lat: 0,
  //   lng: 0,
  // });
  const [dstTaskTemp, setDstTaskTemp] = useState({
    lat: 0,
    lng: 0,
  });
  const [dstTeamTemp, setDstTeamTemp] = useState({
    lat: 0,
    lng: 0,
  });

  const [dstTeam, setDstTeam] = useState(false);
  const [dstTsk, setDstTsk] = useState(false);

  const source = { lat: driver.info.lat, lng: driver.info.lng };
  const destinationTask = {
    lat: driver.task.lat,
    lng: driver.task.lng,
  };
  const destinationTeam = {
    lat: driver.team.lat,
    lng: driver.team.lng,
  };

  const routeToggle = useMainMapModalTools();
  const { addTeamDistance, addTaskDistance, isTeamDistance, isTaskDistance } =
    useMainDriverDistance();

  useEffect(() => {
    // console.log("Driver Selected Data:", driver);
    distanceMatrixTask();
    directionRouteTask();
    distanceMatrixTeam();
    directionRouteTeam();

    // console.log("The Drv-Swtch, Task Object:", isTaskDistance);
    // console.log("The Drv-Swtch, Drv Object:", isTeamDistance);
  }, [isMainMap]);

  useEffect(() => {
    // directionRoute();
    if (destinationTeam != dstTeamTemp) {
      const timer = setTimeout(() => setDstTeam(true), 5000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setDstTeam(false), 500);
      return () => clearTimeout(timer);
    }
  }, [destinationTeam]);

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
    if (dstTeam) {
      distanceMatrixTask();
      directionRouteTask();
    }
    setDstTeamTemp(destinationTeam);
  }, [dstTeam]);

  useEffect(() => {
    if (dstTsk) {
      distanceMatrixTeam();
      directionRouteTeam();
    }
    setDstTaskTemp(destinationTask);
  }, [dstTsk]);

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
          // console.log("DistanceMatrixService Task Result:", result);
          // console.log(
          //   "Rows Distance",
          //   result.rows[0].elements[0].distance.text
          // );
          addTaskDistance({
            originAddress: result.originAddresses[0],
            destinationAddress: result.destinationAddresses[0],
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
            status: driver.info.status,
            driver: driver.driver,
          });
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  const distanceMatrixTeam = () => {
    const DistanceMatrixService = new google.maps.DistanceMatrixService();

    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [{ lat: source.lat, lng: source.lng }],
        destinations: [{ lat: destinationTeam.lat, lng: destinationTeam.lng }],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          // console.log("DistanceMatrixService Team Result:", result);
          // console.log(
          //   "Rows Distance",
          //   result.rows[0].elements[0].distance.text
          // );
          addTeamDistance({
            originAddress: result.originAddresses[0],
            destinationAddress: result.destinationAddresses[0],
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
            status: driver.info.status,
            driver: driver.driver,
          });
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  const directionRouteTeam = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destinationTeam.lat, lng: destinationTeam.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          // console.log("DirectionsService Team Result:", result);
          setTeamDRPs(result);
        } else {
          console.error("ERROR: `DirectionsService` route error!");
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
          // console.log("DirectionsService Result:", result);
          setTaskDRPs(result);
        } else {
          console.error("ERROR: `DirectionsService` route error!");
        }
      }
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        driver.info.status == "Initial" ||
        driver.info.status == "Pending"
      ) {
        distanceMatrixTeam();
        directionRouteTeam();
      }
      if (
        driver.info.status == "Ongoing" ||
        driver.info.status == "Delayed"
      ) {
        distanceMatrixTask();
        directionRouteTask();
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <MarkerF
        position={source}
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
        title={`Driver: ${driver.driver}`}
      />
      {driver.info.status == "Pending" && (
        <>
          <MarkerF
            position={destinationTeam}
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
            title={`Team: ${driver.team.team}`}
          />
        </>
      )}
      {driver.info.status == "Ongoing" ||
      driver.info.status == "Delayed" ||
      driver.info.status == "Initial" ? (
        <>
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
            title={`Destination: ${driver.task.task}`}
          />
        </>
      ) : (
        <></>
      )}
      {routeToggle.isRoute && (
        <>
          {driver.info.status == "Pending" && (
            <DirectionsRenderer
              directions={teamDRPs}
              options={{
                polylineOptions: {
                  strokeColor: driver.info.teamColor,
                  strokeWeight: 5,
                },
                suppressMarkers: true,
              }}
            />
          )}
          {driver.info.status == "Ongoing" ||
          driver.info.status == "Delayed" ||
          driver.info.status == "Initial" ? (
            <DirectionsRenderer
              directions={taskDRPs}
              options={{
                polylineOptions: {
                  strokeColor: driver.info.teamColor,
                  strokeWeight: 5,
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
