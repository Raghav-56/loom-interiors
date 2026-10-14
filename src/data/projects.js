export const projects = [
  { id: 1, className: 'p1', title: 'The Bandra Residence', location: 'Mumbai', category: 'Residential', style: 'Contemporary' },
  { id: 2, className: 'p2', title: 'Aster Clinic', location: 'Pune', category: 'Commercial', style: 'Minimal' },
  { id: 3, className: 'p3', title: 'Copper & Vine', location: 'Ludhiana', category: 'Hospitality', style: 'Warm Industrial' },
  { id: 4, className: 'p4', title: 'The Model Town Flat', location: 'Ludhiana', category: 'Residential', style: 'Modern' }
];

const images = import.meta.glob('../../assets/images/*.jpg', { eager: true, query: '?url', import: 'default' });
export const imagePath = (image) => images[`../../assets/images/${image}`];