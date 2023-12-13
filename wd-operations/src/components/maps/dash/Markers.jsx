"use client"

import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useContext } from 'react'
import { TeamItem } from '../teams/TeamItem'
import { SelectedTeamContext } from '../../../lib/context/context'

export const Markers = ({ team }) => {
    const { selectedTeam, setSelectedTeam } = useContext(SelectedTeamContext);

    return (
        <div>
            <MarkerF
                position={team.geometry.location}
                onClick={() => setSelectedTeam(team)}
                icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                    scaledSize: {
                        width: 10,
                        height: 10
                    }
                }}

            >
                {selectedTeam.reference == team.reference ?
                    <OverlayView
                        position={team.geometry.location}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div className='ml-[-90px] mt-[-230px]'>
                            <TeamItem teams={team} showDir={true} />
                        </div>
                    </OverlayView>
                    : null
                }
            </MarkerF>
        </div>
    )
}