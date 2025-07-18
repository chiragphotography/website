interface PhotoProject {
    id: number
    title: string
    category: PhotoCategory
    description: string
    image: string
    images: string[]
    videos?: string[]
    location?: string
    year?: string
}

type PhotoCategory = "All" | "Portraits" | "Weddings" | "Events" | "Fashion" | "Commercial"

export const projects: PhotoProject[] = [
    {
        id: 1,
        title: "Eternal Elegance",
        category: "Weddings",
        description: "A timeless wedding celebration captured with artistic vision and emotional depth",
        image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        location: "Mumbai",
        year: "2024",
    },
    {
        id: 2,
        title: "Soulful Portraits",
        category: "Portraits",
        description: "Capturing the essence and personality through intimate portrait sessions",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        location: "Delhi",
        year: "2024",
    },
    {
        id: 3,
        title: "Fashion Forward",
        category: "Fashion",
        description: "High-fashion photography that showcases style, creativity, and artistic expression",
        image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        location: "Bangalore",
        year: "2024",
    },
    {
        id: 4,
        title: "Corporate Excellence",
        category: "Commercial",
        description: "Professional commercial photography for brands and businesses",
        image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        location: "Gurgaon",
        year: "2024",
    },
    {
        id: 5,
        title: "Celebration Moments",
        category: "Events",
        description: "Capturing the joy and energy of special celebrations and gatherings",
        image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        videos: [
            "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
        ],
        location: "Chennai",
        year: "2024",
    },
    {
        id: 6,
        title: "Intimate Moments",
        category: "Portraits",
        description: "Personal and intimate portrait sessions that tell unique stories",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        location: "Pune",
        year: "2024",
    },
    {
        id: 7,
        title: "Golden Hour Bliss",
        category: "Events",
        description: "Romantic couple photography during magical golden hour",
        image: "https://images.pexels.com/photos/1381679/pexels-photo-1381679.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/1381679/pexels-photo-1381679.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        location: "Goa",
        year: "2023"
    },
    {
        id: 8,
        title: "Urban Street Style",
        category: "Fashion",
        description: "Edgy fashion photography in urban environments",
        image: "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        location: "Mumbai",
        year: "2023"
    },
    {
        id: 10,
        title: "New Beginnings",
        category: "Weddings",
        description: "Tender maternity photography celebrating new life",
        image: "https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/4666748/pexels-photo-4666748.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/4666757/pexels-photo-4666757.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        location: "Hyderabad",
        year: "2024"
    },
    {
        id: 11,
        title: "Little Wonders",
        category: "Weddings",
        description: "Adorable newborn photography sessions",
        image: "https://images.pexels.com/photos/1620765/pexels-photo-1620765.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/1620765/pexels-photo-1620765.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/189857/pexels-photo-189857.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/36029/baby-young-family-child.jpg?auto=compress&cs=tinysrgb&w=1200"
        ],
        location: "Pune",
        year: "2024"
    },
    {
        id: 12,
        title: "Wild & Free",
        category: "Portraits",
        description: "Outdoor adventure and travel photography",
        image: "https://images.pexels.com/photos/2386310/pexels-photo-2386310.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/2386310/pexels-photo-2386310.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/238622/pexels-photo-238622.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        location: "Himachal Pradesh",
        year: "2023"
    },
    {
        id: 13,
        title: "Architectural Symmetry",
        category: "Events",
        description: "Stunning architectural photography highlighting design",
        image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
        images: [
            "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1200",
            "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        location: "Delhi",
        year: "2023"
    },
]