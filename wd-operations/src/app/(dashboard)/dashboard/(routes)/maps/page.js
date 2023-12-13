import { MapClient } from "../../../../../components/maps/main/maps"


const MapsPage = () => {
 
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <MapClient />
            </div>
        </div>
    )
}

export default MapsPage;