interface VideoItem {
    id: number
    title: string
    description: string
    category: string
    src: string
    thumbnail: string
    duration: string
}

export const videoItems: VideoItem[] = [
    {
        id: 1,
        title: "Wedding Highlights",
        description: "Cinematic wedding stories that capture the essence of love",
        category: "Weddings",
        src: "/Homepage/Demo.webm",
        thumbnail: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "2:45"
    },
    {
        id: 2,
        title: "Behind the Lens",
        description: "Creative process and artistic vision in motion",
        category: "Behind Scenes",
        src: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
        thumbnail: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "1:30"
    },
    {
        id: 3,
        title: "Fashion Forward",
        description: "High-fashion photography meets dynamic storytelling",
        category: "Fashion",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "3:20"
    },
    {
        id: 4,
        title: "Portrait Sessions",
        description: "Intimate moments and emotional connections captured",
        category: "Portraits",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "2:15"
    },
    {
        id: 5,
        title: "Event Highlights",
        description: "Capturing the energy and emotion of special celebrations",
        category: "Events",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "4:10"
    },
    {
        id: 6,
        title: "Photography Sessions",
        description: "Professional Photography work with creative lighting",
        category: "Studio",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "1:45"
    }
]