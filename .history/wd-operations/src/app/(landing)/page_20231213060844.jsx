"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

import { useTempUserStore } from "../../store/api/temp-user-store";
import { useUserStore } from "../../store/api/user-store";

import { LandingNavbar } from "../../components/landing/landing-navbar";
import { LandingHero } from "../../components/landing/landing-hero";

const LandingPage = () => {
  const { setTheme } = useTheme();
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const { fetchTempUser, addTempUser, tempUser } = useTempUserStore();
  const { fetchUser, person } = useUserStore();

  useEffect(() => {
    setTheme("light");

    if (isSignedIn) {
    }
  }, []);

  useEffect(() => {
    console.log("Is signed in", isSignedIn);
    if (!isSignedIn) return;

    console.log("The User: ", person);
    console.log("The TempUser: ", tempUser);
    const fetchUserTempUser = async () => {
      if (isLoaded) {
        const userData = { email: user?.primaryEmailAddress.emailAddress };
        await fetchTempUser(userData);
        await fetchUser(userData);

        if (!tempUser && !person) {
          console.log("Creating a New Temp User");
          const newTempUser = {
            name: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
            isUserSubmit: false,
            isApproved: false,
            isCongratulationOpened: false,
          };

          console.log("The new Users Info", newTempUser);

          addTempUser(newTempUser);
        }
      }
    };

    fetchUserTempUser();
  }, [isSignedIn]);

  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
    </div>
  );
};

export default LandingPage;
