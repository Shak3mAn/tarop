"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "../providers/theme-provider";
import { ToastProvider } from "../providers/toast-provider";

import {
  UserLocationContext,
  SelectedTeamContext,
} from "../lib/context/context";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Dashboard",
  description: "R & M Dashboard",
};

export default function RootLayout({ children }) {
  const [userLocation, setUserLocation] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  useEffect(() => {
    getUserLocation();

    console.log("User location", userLocation);
  }, []);

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SelectedTeamContext.Provider
              value={{ selectedTeam, setSelectedTeam }}
            >
              <UserLocationContext.Provider
                value={{ userLocation, setUserLocation }}
              >
                <Tooltip.Provider>
                  <ToastProvider />
                  {children}
                </Tooltip.Provider>
              </UserLocationContext.Provider>
            </SelectedTeamContext.Provider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
