export const statuses = [
  {
    id: 1,
    name: "Initial",
  },
  {
    id: 2,
    name: "Pending",
  },
  {
    id: 3,
    name: "Completed",
  },
  {
    id: 4,
    name: "Failed",
  },
  {
    id: 5,
    name: "Ongoing",
  },
  {
    id: 6,
    name: "Delayed",
  },
];

export const role = [
  {
    id: 1,
    option: "Driver",
  },
  {
    id: 2,
    option: "Operation Coordinator",
  },
  {
    id: 3,
    option: "Support Coordinator",
  },
  {
    id: 4,
    option: "Admin",
  }
]

export const tdLists = [
  {
    id: 1,
    name: "Teams",
  },
  {
    id: 2,
    name: "Drivers",
  },
];

export const teams = [
  {
    id: 1,
    name: "Avengers",
  },
  {
    id: 2,
    name: "DC",
  },
  {
    id: 3,
    name: "Ship Boyos",
  },
  {
    id: 4,
    name: "COD",
  },
  {
    id: 5,
    name: "Jedi",
  },
  {
    id: 6,
    name: "Sith",
  },
];

export const switcher = [
  {
    id: 1,
    name: "Avengers",
    option: "Team",
  },
  {
    id: 2,
    name: "DC",
    option: "Team",
  },
  {
    id: 3,
    name: "Ship Boyos",
    option: "Team",
  },
  {
    id: 4,
    name: "COD",
    option: "Team",
  },
  {
    id: 5,
    name: "Jedi",
    option: "Team",
  },
  {
    id: 6,
    name: "Sith",
    option: "Team",
  },
  {
    id: 7,
    name: "Happy",
    option: "Driver",
  },
  {
    id: 8,
    name: "Alfred",
    option: "Driver",
  },
  {
    id: 9,
    name: "Leo",
    option: "Driver",
  },
  {
    id: 10,
    name: "Soap",
    option: "Driver",
  },
  {
    id: 11,
    name: "Han Solo",
    option: "Driver",
  },
  {
    id: 12,
    name: "Maul",
    option: "Driver",
  },
  {
    id: 13,
    name: "Save1A",
    option: "Task",
  },
  {
    id: 14,
    name: "Save1B",
    option: "Task",
  },
  {
    id: 15,
    name: "Save2A",
    option: "Task",
  },
  {
    id: 16,
    name: "Save2B",
    option: "Task",
  },
];

export const operationCoordinators = [
  {
    id: 1,
    name: "Tony Stark",
  },
  {
    id: 2,
    name: "Batman",
  },
  {
    id: 3,
    name: "Popeye",
  },
  {
    id: 4,
    name: "Cpt Price",
  },
  {
    id: 5,
    name: "Yoda",
  },
  {
    id: 6,
    name: "Palpatine",
  },
];

export const supportCoordinators = [
  {
    id: 1,
    name: "Jarvis",
  },
  {
    id: 2,
    name: "Superman",
  },
  {
    id: 3,
    name: "Tin Tin",
  },
  {
    id: 4,
    name: "Ghost",
  },
  {
    id: 5,
    name: "Luke",
  },
  {
    id: 6,
    name: "Vader",
  },
];

export const drivers = [
  {
    id: 1,
    name: "Happy",
  },
  {
    id: 2,
    name: "Alfred",
  },
  {
    id: 3,
    name: "Leo",
  },
  {
    id: 4,
    name: "Soap",
  },
  {
    id: 5,
    name: "Han Solo",
  },
  {
    id: 6,
    name: "Maul",
  },
];

export const vehicle = [
  {
    id: 1,
    vehicle: "KAA 011A",
  },
  {
    id: 2,
    vehicle: "HOVER-01A",
  },
  {
    id: 3,
    vehicle: "SH-02B",
  },
  {
    id: 4,
    vehicle: "KCP 928D",
  },
  {
    id: 5,
    vehicle: "FALCON-012Z",
  },
  {
    id: 6,
    vehicle: "DEST-019Y",
  },
];

export const teamColor = [
  {
    id: 1,
    name: "#0000FF",
  },
  {
    id: 2,
    name: "#FF0000",
  },
  {
    id: 3,
    name: "#00FF00",
  },
  {
    id: 4,
    name: "#FFFF00",
  },
  {
    id: 5,
    name: "#A020F0",
  },
  {
    id: 6,
    name: "#000000",
  },
];

export const taskItems = [
  {
    id: 1,
    task: "Task B1C #Pick Up",
    team: "Avengers",
    startTime: "12:00",
    endTime: "14:00",
    status: "Completed",
    source: {
      lat: -1.28333,
      lng: 36.81667,
    },
    destination: {
      lat: -1.286389,
      lng: 36.817223,
    },
    teamDstn: {
      lat: -1.2921,
      lng: 36.8219,
    },
  },
  {
    id: 2,
    task: "Task A2C #Traveling",
    team: "DC",
    startTime: "15:00",
    endTime: "17:00",
    status: "Initial",
    source: {
      lat: -1.2929,
      lng: 36.8305,
    },
    destination: {
      lat: -1.285,
      lng: 36.8231,
    },
    teamDstn: {
      lat: -1.286389,
      lng: 36.821944,
    },
  },
  {
    id: 3,
    task: "Task C3C #Drop Off",
    team: "COD",
    startTime: "11:00",
    endTime: "13:30",
    status: "Ongoing",
    source: {
      lat: -1.3001,
      lng: 36.7764,
    },
    destination: {
      lat: -1.2674,
      lng: 36.8341,
    },
    teamDstn: {
      lat: -1.321263,
      lng: 36.825647,
    },
  },
  {
    id: 4,
    task: "Task D4E #Transition",
    team: "Ship Boyos",
    startTime: "09:00",
    endTime: "09:30",
    status: "Pending",
    source: {
      lat: -1.2954,
      lng: 36.8219,
    },
    destination: {
      lat: -1.3058,
      lng: 36.8225,
    },
    teamDstn: {
      lat: -1.281992,
      lng: 36.81751,
    },
  },
  {
    id: 5,
    task: "Task E5A #Traveling",
    team: "Sith",
    startTime: "10:00",
    endTime: "14:00",
    status: "Delayed",
    source: {
      lat: -1.295416,
      lng: 36.821856,
    },
    destination: {
      lat: -1.3024,
      lng: 36.8219,
    },
    teamDstn: {
      lat: -1.2822,
      lng: 36.8219,
    },
  },
  {
    id: 6,
    task: "Task F6A #Pick Up",
    team: "Jedi",
    startTime: "12:00",
    endTime: "14:30",
    status: "Initial",
    source: {
      lat: -1.3015,
      lng: 36.7915,
    },
    destination: {
      lat: -1.2864,
      lng: 36.8222,
    },
    teamDstn: {
      lat: -1.286695,
      lng: 36.82121,
    },
  },
  // {
  //   id: 7,
  //   task: "Task G7C #Transition",
  //   team: "Avengers",
  //   startTime: "13:00",
  //   endTime: "14:00",
  //   status: "Pending",
  //   source: {
  //     lat: -1.3015,
  //     lng: 36.7915,
  //   },
  //   destination: {
  //     lat: -1.2864,
  //     lng: 36.8222,
  //   },
  //   teamDstn: {
  //     lat: -1.286695,
  //     lng: 36.82121,
  //   },
  // },
  // {
  //   id: 8,
  //   task: "Task 9HC #Pick Up",
  //   team: "DC",
  //   startTime: "20:00",
  //   endTime: "20:15",
  //   status: "Completed",
  //   source: {
  //     lat: -1.305076,
  //     lng: 36.778271,
  //   },
  //   destination: {
  //     lat: -1.296586,
  //     lng: 36.824206,
  //   },
  //   teamDstn: {
  //     lat: -1.3052,
  //     lng: 36.7775,
  //   },
  // },
  // {
  //   id: 9,
  //   task: "Task B10C #Pick Up",
  //   team: "Avengers",
  //   startTime: "14:00",
  //   endTime: "14:30",
  //   status: "Ongoing",
  //   source: {
  //     lat: -1.305076,
  //     lng: 36.778271,
  //   },
  //   destination: {
  //     lat: -1.296586,
  //     lng: 36.824206,
  //   },
  //   teamDstn: {
  //     lat: -1.3052,
  //     lng: 36.7775,
  //   },
  // },
  // {
  //   id: 10,
  //   task: "Task A11C #Traveling",
  //   team: "DC",
  //   startTime: "19:00",
  //   endTime: "20:00",
  //   status: "Delayed",
  //   source: {
  //     lat: -1.2744,
  //     lng: 36.8121,
  //   },
  //   destination: {
  //     lat: -1.318,
  //     lng: 36.8086,
  //   },
  //   teamDstn: {
  //     lat: -1.3052,
  //     lng: 36.7775,
  //   },
  // },
  // {
  //   id: 11,
  //   task: "Task C12H #Drop Off",
  //   team: "COD",
  //   startTime: "17:00",
  //   endTime: "17:30",
  //   status: "Pending",
  //   source: {
  //     lat: -1.3039,
  //     lng: 36.841,
  //   },
  //   destination: {
  //     lat: -1.2686,
  //     lng: 36.8215,
  //   },
  //   teamDstn: {
  //     lat: -1.2921,
  //     lng: 36.8219,
  //   },
  // },
  // {
  //   id: 12,
  //   task: "Task D13K #Transition",
  //   team: "Ship Boyos",
  //   startTime: "09:00",
  //   endTime: "09:30",
  //   status: "Completed",
  //   source: {
  //     lat: -1.308,
  //     lng: 36.8025,
  //   },
  //   destination: {
  //     lat: -1.2733,
  //     lng: 36.8057,
  //   },
  //   teamDstn: {
  //     lat: -1.321,
  //     lng: 36.8214,
  //   },
  // },
  // {
  //   id: 13,
  //   task: "Task E14N #Traveling",
  //   team: "Sith",
  //   startTime: "11:00",
  //   endTime: "20:00",
  //   status: "Failed",
  //   source: {
  //     lat: -1.2915,
  //     lng: 36.82,
  //   },
  //   destination: {
  //     lat: -1.2582,
  //     lng: 36.7818,
  //   },
  //   teamDstn: {
  //     lat: -1.3002,
  //     lng: 36.7685,
  //   },
  // },
  // {
  //   id: 14,
  //   task: "Task F15b #Pick Up",
  //   team: "Jedi",
  //   startTime: "12:00",
  //   endTime: "12:30",
  //   status: "Pending",
  //   source: {
  //     lat: -1.2851,
  //     lng: 36.7901,
  //   },
  //   destination: {
  //     lat: -1.2879,
  //     lng: 36.8271,
  //   },
  //   teamDstn: {
  //     lat: -1.2627,
  //     lng: 36.8025,
  //   },
  // },
  // {
  //   id: 15,
  //   task: "Task G16T #Transition",
  //   team: "Avengers",
  //   startTime: "19:00",
  //   endTime: "21:00",
  //   status: "Ongoing",
  //   source: {
  //     lat: -1.314,
  //     lng: 36.803,
  //   },
  //   destination: {
  //     lat: -1.3008,
  //     lng: 36.782,
  //   },
  //   teamDstn: {
  //     lat: -1.2906,
  //     lng: 36.7816,
  //   },
  // },
  // {
  //   id: 16,
  //   task: "Task D17C #Pick Up",
  //   team: "DC",
  //   startTime: "20:00",
  //   endTime: "21:00",
  //   status: "Initial",
  //   source: {
  //     lat: -1.2821,
  //     lng: 36.8288,
  //   },
  //   destination: {
  //     lat: -1.2884,
  //     lng: 36.8224,
  //   },
  //   teamDstn: {
  //     lat: -1.2846,
  //     lng: 36.8211,
  //   },
  // },
  // {
  //   id: 17,
  //   task: "Task F18b #Pick Up",
  //   team: "Jedi",
  //   startTime: "12:00",
  //   endTime: "12:30",
  //   status: "Pending",
  //   source: {
  //     lat: -1.2949,
  //     lng: 36.8087,
  //   },
  //   destination: {
  //     lat: -1.2686,
  //     lng: 36.8067,
  //   },
  //   teamDstn: {
  //     lat: -1.2541,
  //     lng: 36.7829,
  //   },
  // },
  // {
  //   id: 18,
  //   task: "Task G19T #Transition",
  //   team: "Avengers",
  //   startTime: "19:00",
  //   endTime: "21:00",
  //   status: "Completed",
  //   source: {
  //     lat: -1.2833,
  //     lng: 36.8,
  //   },
  //   destination: {
  //     lat: -1.29,
  //     lng: 36.7847,
  //   },
  //   teamDstn: {
  //     lat: -1.2925,
  //     lng: 36.8283,
  //   },
  // },
  // {
  //   id: 19,
  //   task: "Task 20C #Pick Up",
  //   team: "DC",
  //   startTime: "20:00",
  //   endTime: "21:00",
  //   status: "Ongoing",
  //   source: {
  //     lat: -1.2641,
  //     lng: 36.8112,
  //   },
  //   destination: {
  //     lat: -1.2811,
  //     lng: 36.8307,
  //   },
  //   teamDstn: {
  //     lat: -1.302,
  //     lng: 36.8339,
  //   },
  // },
  // {
  //   id: 20,
  //   task: "Task 21C #Pick Up",
  //   team: "DC",
  //   startTime: "20:00",
  //   endTime: "21:00",
  //   status: "Ongoing",
  //   source: {
  //     lat: -1.3217,
  //     lng: 36.8171,
  //   },
  //   destination: {
  //     lat: -1.2695,
  //     lng: 36.794,
  //   },
  //   teamDstn: {
  //     lat: -1.2631,
  //     lng: 36.8704,
  //   },
  // },
];

export const nairobiCoordinates = [
  { lat: -1.2921, lng: 36.8219 }, // Nairobi City Center
  { lat: -1.286389, lng: 36.817223 }, // University of Nairobi
  { lat: -1.28333, lng: 36.81667 }, // KICC (Kenyatta International Convention Centre)
  { lat: -1.286389, lng: 36.821944 }, // Maasai Market
  { lat: -1.2929, lng: 36.8305 }, // Nairobi National Museum
  { lat: -1.285, lng: 36.8231 }, // Kenyatta National Hospital
  { lat: -1.3001, lng: 36.7764 }, // Nairobi National Park
  { lat: -1.2674, lng: 36.8341 }, // Giraffe Centre
  { lat: -1.321263, lng: 36.825647 }, // Karen Blixen Museum
  { lat: -1.3058, lng: 36.8225 }, // David Sheldrick Wildlife Trust
  { lat: -1.2954, lng: 36.8219 }, // National Archives
  { lat: -1.281992, lng: 36.81751 }, // Central Business District
  { lat: -1.295416, lng: 36.821856 }, // Railway Museum
  { lat: -1.2822, lng: 36.8219 }, // City Market
  { lat: -1.3024, lng: 36.8219 }, // Karura Forest
  { lat: -1.3015, lng: 36.7915 }, // Kazuri Beads Women's Co-operative
  { lat: -1.2864, lng: 36.8222 }, // August 7th Memorial Park
  { lat: -1.286695, lng: 36.82121 }, // Nairobi Gallery
  { lat: -1.305076, lng: 36.778271 }, // Animal Orphanage at Nairobi National Park
  { lat: -1.296586, lng: 36.824206 }, // City Park
  { lat: -1.3052, lng: 36.7775 }, // Ostrich Farm
  { lat: -1.2744, lng: 36.8121 }, // Nairobi Arboretum
  { lat: -1.318, lng: 36.8086 }, // Mamba Village
  { lat: -1.3047, lng: 36.8231 }, // Bomas of Kenya
  { lat: -1.3039, lng: 36.841 }, // Ngong Hills
  { lat: -1.2686, lng: 36.8215 }, // Matbronze Wildlife Art
  { lat: -1.2921, lng: 36.8219 }, // Nairobi Railway Station
  { lat: -1.308, lng: 36.8025 }, // Nairobi Giraffe Centre
  { lat: -1.2733, lng: 36.8057 }, // Village Market
  { lat: -1.321, lng: 36.8214 }, // Karura Forest Waterfall
  { lat: -1.2915, lng: 36.82 }, // Jeevanjee Gardens
  { lat: -1.2582, lng: 36.7818 }, // Paradise Lost
  { lat: -1.3002, lng: 36.7685 }, // David Sheldrick Wildlife Trust - Ithumba
  { lat: -1.2851, lng: 36.7901 }, // Nairobi Chapel
  { lat: -1.2879, lng: 36.8271 }, // Aga Khan University Hospital
  { lat: -1.2627, lng: 36.8025 }, // Garden City Mall
  { lat: -1.314, lng: 36.803 }, // Two Rivers Mall
  { lat: -1.3008, lng: 36.782 }, // Windsor Golf Hotel & Country Club
  { lat: -1.2906, lng: 36.7816 }, // Karura Forest Caves
  { lat: -1.2821, lng: 36.8288 }, // Holy Family Basilica
  { lat: -1.2884, lng: 36.8224 }, // Kenyatta Mausoleum
  { lat: -1.2846, lng: 36.8211 }, // American Embassy Memorial Garden
  { lat: -1.2949, lng: 36.8087 }, // State House Nairobi
  { lat: -1.2686, lng: 36.8067 }, // Ridgeways Mall
  { lat: -1.2541, lng: 36.7829 }, // TRM - Thika Road Mall
  { lat: -1.2833, lng: 36.8 }, // Village Market Waterfront
  { lat: -1.29, lng: 36.7847 }, // Kazuri Beads Women's Co-operative Factory
  { lat: -1.2925, lng: 36.8283 }, // Consolata Shrine
  { lat: -1.2641, lng: 36.8112 }, // Gigiri Police Station
  { lat: -1.2811, lng: 36.8307 }, // Aga Khan University
  { lat: -1.302, lng: 36.8339 }, // Westlands Mosque
  { lat: -1.3217, lng: 36.8171 }, // Karen Country Club
  { lat: -1.2695, lng: 36.794 }, // Flame Tree Park
  { lat: -1.2631, lng: 36.8704 }, // Nairobi Animal Orphanage
  { lat: -1.3151, lng: 36.7736 }, // Safari Park Hotel
  { lat: -1.2943, lng: 36.8252 }, // Nairobi Serena Hotel
  { lat: -1.261, lng: 36.8119 }, // Peponi School
  { lat: -1.2613, lng: 36.7969 }, // Sankara Nairobi
  { lat: -1.3008, lng: 36.8318 }, // Upper Hill
  { lat: -1.3005, lng: 36.7883 }, // Kiambu Mall
  { lat: -1.3111, lng: 36.7781 }, // Windsor Golf Course
  { lat: -1.3076, lng: 36.8264 }, // Yaya Centre
  { lat: -1.2581, lng: 36.7849 }, // Safari Walk
  { lat: -1.2905, lng: 36.7754 }, // Muthaiga Country Club
];
