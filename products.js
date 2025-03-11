const products = {
  "atv_vehicle": {
    name: "Electric ATV Vehicle",
    price: "$999",
    description: "Powerful off-road ATV, perfect for adventure enthusiasts. Long battery life, rugged design.",
    detailedFeatures: [
      "Electric motor with high torque for rough terrains",
      "Durable, weather-resistant body",
      "Battery range: up to 50 km per charge",
      "Top speed: 50 km/h",
      "All-terrain tires for better grip"
    ],
    usage: "Perfect for outdoor adventures, farms, and off-road activities.",
    image: "images/atv.jpeg"
  },
  "electric_scooter": {
    name: "Electric Scooter",
    price: "$499",
    description: "Eco-friendly, foldable electric scooter ideal for urban commuting. High performance and sleek design.",
    detailedFeatures: [
      "Foldable lightweight design",
      "Battery range: 30-40 km",
      "Speed: Up to 25 km/h",
      "LED display and lights",
      "Quick charging battery"
    ],
    usage: "Ideal for city commuters and eco-friendly travelers.",
    image: "images/escooter.jpeg"
  },
  "drone_camera": {
    name: "Drone Camera",
    price: "$699",
    description: "Advanced drone with high-resolution camera for aerial photography. Smooth flight and stable video.",
    detailedFeatures: [
      "4K Ultra HD camera",
      "Stable flight and GPS tracking",
      "Battery life: 40 minutes",
      "Easy to control with remote or mobile",
      "Collision avoidance system"
    ],
    usage: "Perfect for photographers, filmmakers, and hobbyists.",
    image: "images/dronecam.jpeg"
  },
  "electric_fatbike": {
    name: "Electric Fatbike",
    price: "$799",
    description: "Durable and powerful fatbike for all terrains. Large battery capacity and strong motor.",
    detailedFeatures: [
      "Fat tires for snow and sand",
      "Battery range: 70 km",
      "Powerful motor for uphill rides",
      "Suspension for comfort",
      "Disk brakes for safety"
    ],
    usage: "Great for adventure cycling and off-road riding.",
    image: "images/efatbike.webp"
  },
  "electric_fatbike_folding": {
    name: "Electric Fatbike Folding",
    price: "$899",
    description: "Folding electric fatbike, portable and high-performance for off-road and city rides.",
    detailedFeatures: [
      "Foldable compact design",
      "Fat tires for all terrain",
      "Long-lasting battery",
      "Speed: Up to 35 km/h",
      "Hydraulic brakes"
    ],
    usage: "Best for commuting and recreational riding.",
    image: "images/efatbikefold.webp"
  },
  "electric_cargo_bike": {
    name: "3-wheel Electric Cargo Bike",
    price: "$999",
    description: "Spacious electric cargo bike with stable 3-wheel design. Great for carrying goods and groceries.",
    detailedFeatures: [
      "Large rear cargo area",
      "Battery range: 60 km",
      "Stable 3-wheel system",
      "Safety lock and strong frame",
      "LED lights for night rides"
    ],
    usage: "Perfect for small deliveries and family use.",
    image: "images/3wheelcargo.jpeg"
  },
  "electric_atv_kids": {
    name: "Electric ATV for Children & Adults",
    price: "$1099",
    description: "Safe and powerful ATV for kids and adults. Adjustable speed settings and durable build.",
    detailedFeatures: [
      "Speed limiter for kids",
      "Robust tires for all terrains",
      "Battery range: 40 km",
      "Comfortable seats",
      "Safety gear included"
    ],
    usage: "Designed for family fun and safe rides.",
    image: "images/eatvchild.jpeg"
  },
  "4wd_land_rover": {
    name: "4WD Land Rover",
    price: "$1999",
    description: "Stunning 4WD Land Rover with electric engine. Off-road capabilities and luxury design.",
    detailedFeatures: [
      "4WD system for all terrains",
      "Luxury seating and interior",
      "Battery range: 120 km",
      "Top speed: 80 km/h",
      "Strong suspension and tires"
    ],
    usage: "Great for adventure rides and off-road exploration.",
    image: "images/4wdlandrover.jpeg"
  },
  "electric_bike": {
    name: "Electric Bike",
    price: "$699",
    description: "Lightweight and efficient electric bike for daily commuting. Modern design and comfortable ride.",
    detailedFeatures: [
      "Slim and light frame",
      "Battery range: 60 km",
      "Comfort seating",
      "Speed: 30 km/h",
      "Disk brakes and LED lights"
    ],
    usage: "Perfect for city commuting and short travel.",
    image: "images/ebike.jpeg"
  },
  "electric_cars_kids": {
    name: "Electric Cars for Kids",
    price: "$299",
    description: "Miniature electric cars designed for kids with safety features and realistic controls.",
    detailedFeatures: [
      "Parental remote control",
      "Speed limiter",
      "Safety belts",
      "Battery life: 2 hours",
      "Realistic horn and music"
    ],
    usage: "Fun and safe driving experience for children.",
    image: "images/ecarkids.webp"
  },
  "electric_moped_car": {
    name: "Electric Moped Car",
    price: "$1299",
    description: "Compact electric moped car for city driving. Eco-friendly and cost-efficient.",
    detailedFeatures: [
      "Compact and stylish design",
      "Battery range: 90 km",
      "Top speed: 45 km/h",
      "Eco-friendly electric motor",
      "Comfortable seating for two"
    ],
    usage: "Perfect for city and short-distance driving.",
    image: "images/emopedcar.jpeg"
  },
  "jeep_willy_type": {
    name: "Electric Jeep Willy-Type",
    price: "$1599",
    description: "Vintage styled electric Jeep Willy-type with modern electric drivetrain.",
    detailedFeatures: [
      "Retro design",
      "Electric motor",
      "Battery range: 80 km",
      "Top speed: 55 km/h",
      "All-terrain tires"
    ],
    usage: "Great for collectors and off-road fun.",
    image: "images/ewillysjeep.jpeg"
  },
  "jeep_3seater": {
    name: "Electric Jeep, 3-seater",
    price: "$1799",
    description: "Spacious and rugged electric Jeep for up to 3 passengers. Excellent for off-road.",
    detailedFeatures: [
      "Seats three passengers",
      "Battery range: 100 km",
      "Top speed: 65 km/h",
      "4WD and suspension",
      "All-weather tires"
    ],
    usage: "Perfect for family trips and off-road driving.",
    image: "images/e3seaterjeep.jpeg"
  },
  "rc_tank": {
    name: "RC Tank",
    price: "$499",
    description: "Remote-controlled tank with realistic design and controls. Great for hobbyists.",
    detailedFeatures: [
      "Realistic movement and sounds",
      "Rechargeable battery",
      "Durable build for outdoor use",
      "Easy remote operation",
      "Safe and fun for all ages"
    ],
    usage: "Perfect for hobbyists and remote-control enthusiasts.",
    image: "images/rctank.jpeg"
  },
  "remote_control_cars": {
    name: "Remote-Control Cars",
    price: "$199",
    description: "High-speed remote-controlled cars built for racing and fun. Durable and fast for all surfaces.",
    detailedFeatures: [
      "Powerful motor for high-speed performance",
      "Rechargeable battery with long playtime",
      "Durable, shock-resistant body",
      "Easy-to-use remote control",
      "Available in various colors and models"
    ],
    usage: "Perfect for kids and hobbyists who love speed and racing fun.",
    image: "images/rccar.jpeg"
  },

  "solar_products": {
    name: "Solar-powered Products",
    price: "$149",
    description: "Eco-friendly solar-powered gadgets and tools for home and outdoor use.",
    detailedFeatures: [
      "Environmentally friendly with zero emissions",
      "Long-lasting solar battery system",
      "Range of gadgets: lamps, fans, chargers",
      "Portable and lightweight designs",
      "Ideal for emergency and off-grid use"
    ],
    usage: "Great for sustainable living and outdoor camping.",
    image: "images/solarpowerproducts.jpeg"
  },

  "batteries_chargers": {
    name: "Batteries & Chargers",
    price: "$49",
    description: "Universal batteries and chargers for all types of electric vehicles and gadgets.",
    detailedFeatures: [
      "Fast charging technology",
      "Multiple sizes and capacities",
      "Safe and reliable build",
      "Portable and compact design",
      "Compatible with a wide range of products"
    ],
    usage: "Essential for keeping devices and vehicles powered at all times.",
    image: "images/batterieschargers.jpeg"
  },

  "billiard_table": {
    name: "Billiard Table",
    price: "$899",
    description: "High-quality billiard table perfect for home entertainment and game rooms.",
    detailedFeatures: [
      "Professional-grade surface",
      "Solid wooden frame",
      "Comes with cues and balls",
      "Elegant design for home decor",
      "Easy to assemble"
    ],
    usage: "Ideal for family fun, parties, and game enthusiasts.",
    image: "images/billiardstable.jpeg"
  },

  "lawn_mower": {
    name: "Lawn Mower",
    price: "$599",
    description: "Efficient electric lawn mower for easy and quiet lawn maintenance.",
    detailedFeatures: [
      "Powerful electric motor",
      "Adjustable cutting heights",
      "Lightweight and easy to maneuver",
      "Eco-friendly operation",
      "Safety features included"
    ],
    usage: "Perfect for maintaining gardens and lawns efficiently.",
    image: "images/lawnmower.jpeg"
  },

  "compass": {
    name: "Compass",
    price: "$59",
    description: "Durable and accurate compass for navigation and outdoor adventures.",
    detailedFeatures: [
      "Precision navigation dial",
      "Compact and portable design",
      "Water-resistant case",
      "Easy-to-read markings",
      "Ideal for hiking and camping"
    ],
    usage: "Essential for outdoor exploration, camping, and survival gear.",
    image: "images/compass.jpeg"
  },

  "alarm_systems": {
    name: "Alarm System",
    price: "$249",
    description: "Complete home and office alarm system for enhanced security and protection.",
    detailedFeatures: [
      "Motion sensors and alarms",
      "Remote-controlled activation",
      "Loud sirens for intruder deterrence",
      "Expandable system with additional sensors",
      "Easy installation"
    ],
    usage: "Perfect for home and business security solutions.",
    image: "images/alarmsystems.jpeg"
  },

  "aquarium_equipment": {
    name: "Aquarium Equipment",
    price: "$199",
    description: "Full range of equipment for setting up and maintaining aquariums.",
    detailedFeatures: [
      "Water filters and air pumps",
      "Heaters and LED lighting",
      "Automatic feeders",
      "Thermometers and cleaning tools",
      "Suitable for freshwater and saltwater"
    ],
    usage: "Ideal for fish owners and aquarium hobbyists.",
    image: "images/aquaequipment.jpeg"
  },

  "digital_clock": {
    name: "Digital Clocks",
    price: "$79",
    description: "Modern and stylish digital clocks with multiple functions.",
    detailedFeatures: [
      "Large LED display for clear visibility",
      "Alarm and snooze functions",
      "Battery backup",
      "Adjustable brightness",
      "Compact and modern design"
    ],
    usage: "Perfect for home, office, and bedside use.",
    image: "images/digiclock.jpeg"
  },
  "cross_rider_car": {
    name: "Electric Car Cross-Rider",
    price: "$1399",
    description: "Sporty and compact electric car for urban and rural use. Robust build and efficient. Built for both comfort and performance, the Cross-Rider is perfect for city commutes and countryside rides. Eco-friendly and cost-saving alternative for everyday transportation.",
    detailedFeatures: [
        "Electric engine: 100% emission-free driving",
        "Range: 70-100 km per charge (varies by usage)",
        "Top speed: 60 km/h",
        "Comfortable seating for two passengers",
        "Compact design for narrow streets and urban areas",
        "LED headlights and modern dashboard"
    ],
    usage: "Ideal for small families, solo city commuters, and eco-conscious drivers. Suits both urban areas and light off-road rural terrain.",
    image: "images/ecrossridercar.jpeg"
  },
  "disco_lights": {
    name: "Disco Lights",
    price: "$89",
    description: "Colorful and vibrant disco lights to brighten up any party. Designed to create a dynamic and fun atmosphere with multi-color lighting effects.",
    detailedFeatures: [
        "Multiple color modes and patterns",
        "Sound-activated lights that sync to music beats",
        "Remote control for easy operation",
        "Energy-efficient LED bulbs for long-lasting use",
        "Portable and easy to set up anywhere"
    ],
    usage: "Perfect for house parties, clubs, events, and special celebrations to create a lively and exciting environment.",
    image: "images/discolights.jpeg"
  },
  "dvd_player": {
    name: "DVD Player",
    price: "$149",
    description: "High-quality DVD player with advanced features for home entertainment. Supports multiple formats and delivers excellent video and audio quality.",
    detailedFeatures: [
        "Plays DVDs, CDs, and MP3 discs",
        "USB port for external media playback",
        "HDMI output for high-definition video and sound",
        "Compact and sleek design to fit in modern homes",
        "Remote control included for easy navigation"
    ],
    usage: "Perfect for home entertainment setups, watching movies, and listening to music. Great for family use or personal collections.",
    image: "images/dvdplayer.jpeg"
  },
  "christmas_tree": {
    name: "Decorative Christmas Tree",
    price: "$129",
    description: "Beautiful and realistic decorative Christmas tree with built-in lights and ornaments. Perfect for creating a festive atmosphere at home or office.",
    detailedFeatures: [
        "Pre-lit with warm white LED lights",
        "Comes with decorative ornaments and ribbons",
        "Sturdy stand for stability",
        "Easy to assemble and store",
        "Realistic branches for a natural look"
    ],
    usage: "Perfect for celebrating Christmas and decorating homes, offices, and public spaces. Reusable and easy to set up every year.",
    image: "images/christmastree.jpeg"
  },
  "robots": {
    name: "Interactive Robots",
    price: "$299",
    description: "Advanced interactive robots designed for learning, entertainment, and assistance. Equipped with smart sensors and interactive features to engage users of all ages.",
    detailedFeatures: [
        "Voice and gesture recognition for interactive play",
        "Programmable movements and responses",
        "Equipped with obstacle avoidance sensors",
        "Rechargeable battery with long operation time",
        "Durable and safe design for children"
    ],
    usage: "Perfect for educational purposes, kids' entertainment, and tech enthusiasts. Great for teaching programming and robotics basics in a fun way.",
    image: "images/robo.jpeg"
  },
}