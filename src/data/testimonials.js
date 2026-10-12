/**
 * Built-in testimonials. The website shows these until testimonials are added in the
 * admin panel (Admin → Testimonials → "Import website testimonials" copies them there).
 */
export const DEFAULT_TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'CEO & Founder',
    company: 'ScaleTech Solutions',
    text: 'Binud Software Solutions transformed our business with a custom platform that exceeded all expectations. Their team is professional, responsive, and truly talented.',
    rating: 5,
    order: 1,
    visible: true,
  },
  {
    name: 'Ananya Patel',
    role: 'Product Director',
    company: 'AppFlow Technologies',
    text: 'The mobile app they built for us has over 10,000 active users. The quality of work and attention to detail is outstanding. I highly recommend Binud to anyone looking for a serious tech partner.',
    rating: 5,
    order: 2,
    visible: true,
  },
  {
    name: 'Arjun Das',
    role: 'Managing Director',
    company: 'Das Commerce Platform',
    text: 'Working with Binud was a game-changer. They delivered our e-commerce platform on time and within budget. Post-launch support has been exceptional every step of the way.',
    rating: 5,
    order: 3,
    visible: true,
  },
];

/* Sort by the admin-set display order, then oldest first. */
export const sortTestimonials = (list) =>
  [...list].sort((a, b) => {
    const orderDiff = (Number(a.order) || 999) - (Number(b.order) || 999);
    if (orderDiff !== 0) return orderDiff;
    return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
  });
