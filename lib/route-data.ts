export interface DetailData {
  id: number
  no: number
  code: string
  location: string
  delivery: string
  thumbnail: string
  status: boolean
  powerMode: string
  description: string
  images: string[]
  longitude: number
  latitude: number
  route: string
}

export const detailsData: DetailData[] = [
  { 
    id: 1, 
    no: 1, 
    code: "54", 
    location: "RHB Complex", 
    delivery: "Daily", 
    thumbnail: "📦",
    status: true,
    powerMode: "Daily",
    description: "Premium delivery service for RHB Complex. Includes real-time tracking, secure handling, and priority processing. Operating hours: 8AM - 6PM daily.",
    images: ["🏢", "🚚", "📍"],
    longitude: 101.7068,
    latitude: 3.1390,
    route: "KL 7"
  },
  { 
    id: 2, 
    no: 2, 
    code: "78", 
    location: "KLCC Tower", 
    delivery: "Express", 
    thumbnail: "🎁",
    status: true,
    powerMode: "Alt 1",
    description: "Express delivery service for KLCC Tower with same-day delivery guarantee. Climate-controlled transport available.",
    images: ["🏙️", "⚡", "🎯"],
    longitude: 101.7115,
    latitude: 3.1578,
    route: "KL 7"
  },
  { 
    id: 3, 
    no: 3, 
    code: "92", 
    location: "Pavilion Mall", 
    delivery: "Standard", 
    thumbnail: "📮",
    status: false,
    powerMode: "Alt 2",
    description: "Standard delivery service for Pavilion Mall. Scheduled deliveries on weekdays with flexible time slots.",
    images: ["🛍️", "🚐", "⏰"],
    longitude: 101.7137,
    latitude: 3.1494,
    route: "KL 8"
  },
  { 
    id: 4, 
    no: 4, 
    code: "45", 
    location: "Mid Valley", 
    delivery: "Daily", 
    thumbnail: "📦",
    status: true,
    powerMode: "Weekday",
    description: "Daily bulk delivery service for Mid Valley. Specialized in handling large volume orders with dedicated support.",
    images: ["🏬", "🚛", "📊"],
    longitude: 101.6776,
    latitude: 3.1178,
    route: "KL 8"
  },
  { 
    id: 5, 
    no: 5, 
    code: "67", 
    location: "Sunway Pyramid", 
    delivery: "Express", 
    thumbnail: "🎁",
    status: false,
    powerMode: "Daily",
    description: "Express courier service for Sunway Pyramid area. Features contactless delivery and photo confirmation.",
    images: ["🏰", "🏃", "📸"],
    longitude: 101.6069,
    latitude: 3.0738,
    route: "KL 9"
  },
  { 
    id: 6, 
    no: 6, 
    code: "89", 
    location: "IOI City Mall", 
    delivery: "Standard", 
    thumbnail: "📮",
    status: true,
    powerMode: "Alt 1",
    description: "Standard logistics service for IOI City Mall with eco-friendly packaging options and carbon-neutral delivery.",
    images: ["🏢", "♻️", "🌱"],
    longitude: 101.7288,
    latitude: 2.9955,
    route: "SG 5"
  },
]

// Get only active locations
export const getActiveLocations = () => {
  return detailsData.filter(detail => detail.status === true)
}

// Get unique routes
export const getRoutes = () => {
  const routes = [...new Set(detailsData.map(detail => detail.route))]
  return routes.sort()
}

// Get locations by route
export const getLocationsByRoute = (route: string) => {
  return detailsData.filter(detail => detail.route === route && detail.status === true)
}
