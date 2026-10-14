export const projects = [
  { id: 1, className: 'p1', title: 'The Bandra Residence', location: 'Mumbai', category: 'Residential', style: 'Contemporary' },
  { id: 2, className: 'p2', title: 'Aster Clinic', location: 'Pune', category: 'Commercial', style: 'Minimal' },
  { id: 3, className: 'p3', title: 'Copper & Vine', location: 'Ludhiana', category: 'Hospitality', style: 'Warm Industrial' },
  { id: 4, className: 'p4', title: 'The Model Town Flat', location: 'Ludhiana', category: 'Residential', style: 'Modern' }
];

export const rooms = [
  { name: 'Kitchen', image: 'kitchen.jpg', alt: 'Kitchen design' }, { name: 'Bath', image: 'room-photo-1.jpg', alt: 'Bathroom design' },
  { name: 'Bedroom', image: 'bedroom.jpg', alt: 'Bedroom design' }, { name: 'Living', image: 'Living-area.jpg', alt: 'Living room design' },
  { name: 'Dining', image: 'dining.jpg', alt: 'Dining design' }, { name: 'Outdoor', image: 'ludhiana-residential-flat.jpg', alt: 'Outdoor living' }
];

export const services = [
  ['Kitchen', 'kitchen.jpg', 'Kitchen design'], ['Bath', 'room-photo-1.jpg', 'Bath design'], ['Bedroom', 'bedroom.jpg', 'Bedroom design'],
  ['Living', 'Living-area.jpg', 'Living area design'], ['Hospitality', 'dining.jpg', 'Hospitality design'], ['Commercial', 'aster-clinic.jpg', 'Commercial design'],
  ['Outdoor', 'ludhiana-residential-flat.jpg', 'Outdoor living design']
];

const images = import.meta.glob('../../assets/images/*.jpg', { eager: true, query: '?url', import: 'default' });
export const imagePath = (image) => images[`../../assets/images/${image}`];