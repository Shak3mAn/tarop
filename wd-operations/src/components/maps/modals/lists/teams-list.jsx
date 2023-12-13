"use client"

import React from "react";

import {TeamItem} from "./team-item"

export const TeamsList = ({ teams }) => {
    return (
        <>
            {teams.map((team, index) =>(
                <div key={index}>
                    <TeamItem team={team} />
                </div>
            ) )}
        </>
    )
}