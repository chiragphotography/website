interface PhotoItem {
    originalIndex: number
    src: string
    alt: string
    height: string
    text: string
    animation: string
  }
  
export const photoItems: PhotoItem[] = [
    // Column 1 - Shorter images at top, taller at bottom
    {
      src: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop",
      alt: "Indian wedding ceremony",
      height: "h-64",
      text: "Dream Wedding",
      animation: "left",
      originalIndex: 0,
    },
    {
      src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=400&fit=crop",
      alt: "Haldi ceremony with marigolds",
      height: "h-60",
      text: "Haldi Bliss",
      animation: "blur",
      originalIndex: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=600&fit=crop",
      alt: "Baby shower decorations",
      height: "h-72",
      text: "Baby Love",
      animation: "left",
      originalIndex: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=800&fit=crop",
      alt: "Birthday party decorations",
      height: "h-96",
      text: "Celebrate Life",
      animation: "left",
      originalIndex: 3,
    },
  
    // Column 2 - Balanced heights with space for button
    {
      src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=700&fit=crop",
      alt: "Birthday celebration setup",
      height: "h-80",
      text: "Birthday Joy",
      animation: "right",
      originalIndex: 4,
    },
    {
      src: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=700&h=500&fit=crop",
      alt: "Outdoor wedding venue",
      height: "h-68",
      text: "Perfect Venue",
      animation: "down",
      originalIndex: 5,
    },
    {
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop",
      alt: "Indoor celebration setup",
      height: "h-64",
      text: "Party Time",
      animation: "blur",
      originalIndex: 6,
    },
  
    // Column 3 - Balanced heights with space for button
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
      alt: "Indian wedding mandap decoration",
      height: "h-76",
      text: "Sacred Vows",
      animation: "right",
      originalIndex: 7,
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
      alt: "Traditional Indian wedding setup",
      height: "h-72",
      text: "Tradition",
      animation: "down",
      originalIndex: 8,
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=600&fit=crop",
      alt: "Baby shower celebration",
      height: "h-68",
      text: "New Beginnings",
      animation: "blur",
      originalIndex: 9,
    },
  
    // Column 4 - Shorter images at top, taller at bottom
    {
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop",
      alt: "Engagement ceremony",
      height: "h-60",
      text: "Forever Begins",
      animation: "right",
      originalIndex: 10,
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=700&fit=crop",
      alt: "Mehendi celebration",
      height: "h-64",
      text: "Henna Art",
      animation: "down",
      originalIndex: 11,
    },
    {
      src: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=600&h=500&fit=crop",
      alt: "Cocktail party setup",
      height: "h-72",
      text: "Cheers",
      animation: "left",
      originalIndex: 12,
    },
    {
      src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop",
      alt: "Reception decoration",
      height: "h-96",
      text: "Grand Reception",
      animation: "blur",
      originalIndex: 13,
    },
  ]