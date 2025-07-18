interface TeamMember {
    id: number
    name: string
    role: string
    image: string
    specialty?: string
  }

export const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Chirag Sharma",
      role: "Lead Photographer & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
      specialty: "Wedding & Portrait Photography",
    },
    {
      id: 2,
      name: "Priya Mehta",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
      specialty: "Fashion & Commercial Photography",
    },
    {
      id: 3,
      name: "Arjun Singh",
      role: "Senior Photographer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
      specialty: "Event & Celebration Photography",
    },
  ]

export const stats = [
    { number: "8+", label: "Years of Experience" },
    { number: "500+", label: "Celebrations Captured" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "50+", label: "Awards Won" },
  ]