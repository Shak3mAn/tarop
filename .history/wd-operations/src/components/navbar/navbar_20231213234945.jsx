"use client";

import { UserButton, useAuth, useUser, useSessionList } from "@clerk/nextjs";

import MobileSidebar from "../mobileSidebar/mobileSidebar";

import { useWelcomeModal } from "../../store/use-general";
import { useUserWelcome } from "../../store/use-general";

// import CallsToggle from "./calls/Calls";
import Approvals from "./approvals/approvals";
import ThemeToggle from "../theme/theme-toggle";
import Notifications from "./notifications/Notifications";
import MoreMenu from "./more/More";
import MenuToggle from "./menu-toggle/menu-toggle";
import { StatusModal } from "../modals/status/status";
import { useUserStore } from "../../store/api/user-store";
import { useTempUserStore } from "../../store/api/temp-user-store";

import { UserSubmissionModal } from "../modals/welcome/user-submission-modal";
import { Separator } from "../ui/separator";
import { CongratulationsApprovalModal } from "../modals/welcome/congratulations-approval";
import { WaitingApprovalModal } from "../modals/welcome/waiting-approval";
import { useEffect, useLayoutEffect, useState } from "react";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isCongrats, setIsCongrats] = useState(false);

  const date = new Date();
  const hour = date.getHours();

  const { sessions } = useSessionList();
  const { user } = useUser();
  const { isLoaded } = useAuth();

  const { isApproved, isCongratulationOpened, isUserSubmit } =
    useWelcomeModal();
  const { isUserCongratulationOpened } = useUserWelcome();

  const { fetchUser, person, users } = useUserStore();
  const { fetchTempUser, tempUser } = useTempUserStore();

  useEffect(() => {
    setIsCongrats(isUserCongratulationOpened);
  }, [isLoaded, isCongratulationOpened, person?.isCongratulationOpened]);

  useEffect(() => {
    const fetchUsrTempUsr = async () => {
      if (isLoaded) {
        const tempUserData = {
          email: user?.primaryEmailAddress.emailAddress
            ? user?.primaryEmailAddress.emailAddress
            : "email",
        };
        const userData = { email: user?.primaryEmailAddress.emailAddress };
        await fetchTempUser(tempUserData);
        await fetchUser(userData);
      }
    };

    fetchUsrTempUsr();
  }, [isLoaded, isUserSubmit, person?.isCongratulationOpened]);

  return isLoaded ? (
    <div className="border-b shadow-sm sticky top-0 bg-background z-[85]">
      <div className="flex h-16 items-center p-4">
        <div className="flex">
          <div>
            <div className="hidden mr-2 md:flex items-center">
              <MenuToggle
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </div>
            <div className="flex mr-2 items-center md:hidden">
              {" "}
              <MobileSidebar />
            </div>
          </div>
          {/* Separator */}
          <div className="flex justify-center items-center mx-2 md:hidden">
            <Separator orientation="vertical" />
          </div>
          {/* Greetings */}
          <div className="pl-2 pr-4">
            {hour >= 12 ? (
              hour >= 16 ? (
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold tracking-tight text-card-foreground">
                    Good Evening
                  </h3>
                  <p className="text-sm font-normal text-muted-foreground">
                    {user?.firstName}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold tracking-tight text-card-foreground">
                    Good Afternoon
                  </h3>
                  <p className="text-sm font-normal text-muted-foreground">
                    {user?.firstName}
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col">
                <h3 className="text-lg font-bold tracking-tight text-card-foreground">
                  Good Morning
                </h3>
                <p className="text-sm font-normal text-muted-foreground">
                  {user?.firstName}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="hidden md:justify-center md:items-center md:mx-2 md:flex">
          <Separator orientation="vertical" />
        </div>

        {/* Mobile Sidebar & Search Bar*/}

        {/* Avatar, Notification & Others... */}
        <div className="hidden ml-auto sm:flex items-center space-x-4">
          <div className="mx-1">
            <Separator orientation="vertical" />
          </div>

          <div className="hidden md:flex space-x-4">
            {!isCongrats ? (
              <>
                {!isCongratulationOpened && (
                  <>
                    {(!tempUser?.isUserSubmit || !person?.isUserSubmit) &&
                      (!tempUser?.isApproved || !person?.isApproved) && (
                        <UserSubmissionModal />
                      )}
                  </>
                )}
                {person?.isUserSubmit && !person?.isApproved && (
                  <WaitingApprovalModal />
                )}
                {person?.isApproved && <CongratulationsApprovalModal />}
              </>
            ) : (
              <></>
            )}
          </div>
          {person?.role === "Admin" && (
            <>
              <Approvals />
            </>
          )}
          {person?.role !== "Driver" ? (
            <>
              {/* <CallsToggle /> */}
              {/* <Approvals /> */}
              <Notifications />
              {/* <MoreMenu /> */}
              <StatusModal />
              <ThemeToggle />{" "}
            </>
          ) : (
            <>
              <ThemeToggle />
            </>
          )}
          <div className="">
            <Separator orientation="vertical" className="" />
          </div>
          <UserButton />
        </div>
        <div className="flex ml-auto sm:hidden items-center space-x-2">
          {person?.role !== "Driver" ? (
            <>
              {/* <CallsToggle /> */}
              <Notifications />
              {/* <MoreMenu /> */}
              <ThemeToggle />{" "}
            </>
          ) : (
            <>
              <ThemeToggle />
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Navbar;
