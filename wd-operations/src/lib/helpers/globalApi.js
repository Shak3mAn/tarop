import axios from "axios"

export const getGooglePlace = (category, radius, lat, lng) => axios.get(
    '/api/google-place?'+'category='+category+'&radius='+radius+'&lat='+lat+'&lng='+lng
)