"use client";

import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useMediaQuery } from "react-responsive";

import Navbar from "../../../components/navbar/navbar";
import Sidebar from "../../../components/sidebar/sidebar";
import SideTools from "../../../components/sidebar/sidebar-tools";
import { DashFooter } from "../../../components/misc/footer"
import { useUserStore } from "../../../store/api/user-store";
import { useTempUserStore } from "../../../store/api/temp-user-store";
import { useDriverStore } from "../../../store/api/driver-store";
import { useOperatorStore } from "../../../store/api/operator-store";
import { useTeamStore } from "../../../store/api/team-store";
import { useTempUserWelcome } from "../../../store/use-general";
import { useUserWelcome } from "../../../store/use-general";

import { Loader } from "../../../components/ui/loading";

export default function DashboardLayout({ children }) {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userLocation, setUserLocation] = useState([]);
  const [isTimeout, setIsTimeout] = useState(true);

  const { user } = useUser();
  const { isLoaded } = useAuth();

  const { fetchUser, getUserRole, getUserName, getUserEmail, person } =
    useUserStore();

    const updateDriverLocation = useDriverStore(
    (state) => state.updateDriverLocation
  );
  const updateTeamLocation = useTeamStore((state) => state.updateTeamLocation);
  const updateOperatorLocation = useOperatorStore(
    (state) => state.updateOperatorLocation
  );
  const { onUserCongratulationOpened, isUserCongratulationOpened } =
    useUserWelcome();

  const name = getUserName();
  const emailAdd = getUserEmail();

  useEffect(() => {
    const fetchDataAndLocation = async () => {
      // Fetch user data if the user is loaded
      if (isLoaded) {
        const userData = { email: user?.primaryEmailAddress.emailAddress };
        await fetchUser(userData);

        // Fetch user location
        navigator.geolocation.getCurrentPosition(function (pos) {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        });

        // Perform actions based on user role
        if (getUserRole() === "Driver") {
          updateDriverLocation(emailAdd, userLocation);
        } else if (
          getUserRole() === "Operation Coordinator" ||
          getUserRole() === "Admin"
        ) {
          updateOperatorLocation(emailAdd, userLocation);
          updateTeamLocation(name, userLocation);
        }
      }
    };

    const intervalId = setInterval(fetchDataAndLocation, 20000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [isLoaded, userLocation]);

  useEffect(() => {
    const fetchCongratulations = async () => {
      if (isLoaded) {
        const userData = { email: user?.primaryEmailAddress.emailAddress };
        await fetchUser(userData);

        if (person?.isCongratulationOpened) {
          onUserCongratulationOpened();
        }
      }
    };

    fetchCongratulations();

  }, [isLoaded, person?.isCongratulationOpened, user]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeout(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);
  return isLoaded && !isTimeout ? (
    <div>
      <div className="flex max-w-full fixed md:relative overflow-y-auto md:overflow-auto h-screen">
        {/* Sidebar */}

        {!isTabletMid ? (
          <div className="">
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <SideTools
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        ) : (
          <></>
        )}

        {/* Rest of the Dashboard */}
        {!isTabletMid ? (
          <aside className="w-full pb-6">
            <Navbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <div>{children}</div>
            <DashFooter />
          </aside>
        ) : (
          <div className="max-w-full pb-6">
            <Navbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <div>{children}</div>
            <DashFooter />
          </div>
        )}
      </div>
    </div>
  ) : (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    </>
  );
}
