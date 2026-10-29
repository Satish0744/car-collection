export const BASE_FEATURES = [
  'Adaptive Cruise Control','Lane Keep Assist','Blind Spot Monitoring',
  '360° Camera','Front Parking Sensors','Rear Parking Sensors',
  'Head-Up Display','Apple CarPlay','Android Auto','Wireless Charging',
  'Premium Sound System','Heated Front Seats','Ventilated Front Seats',
  'Panoramic Sunroof','LED Headlights','LED Tail Lights',
  'Ambient Interior Lighting','Keyless Entry','Push Button Start',
  'Auto Climate Control','Leather Upholstery','Sport Suspension',
  'Carbon Fiber Trim','Digital Cockpit','Built-in Navigation',
  'Remote Engine Start','Rain Sensing Wipers','Auto Dimming Mirrors',
  'Dual-Zone Climate Control','8 Airbags','Tire Pressure Monitor',
  'Rear Spoiler','18" Alloy Wheels','Fog Lights',
  'Hill Start Assist','Traction Control','Electronic Stability Control',
  'ABS with EBD','ISOFIX Child Anchors','Electric Tailgate',
  'Memory Driver Seat','Power Steering','Cruise Control',
  'Driver Attention Monitor','Traffic Sign Recognition',
  'Adaptive Suspension','Sport Exhaust','Paddle Shifters',
  'Drive Mode Selector','Wireless Phone Mirror','Voice Command',
  'USB-C Fast Charging','Rear AC Vents','Power Windows',
  'Auto Headlamps','Cornering Lights','Rear Camera Washer',
];

export const mk = (d) => ({
  rating:4.5, reviews:100,
  ...d,
  features:[...BASE_FEATURES, ...(d.extraFeatures||[])],
});