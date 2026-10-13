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

/**
 * DUMMY reviews for previewing the testimonials design while developing (npm run dev).
 * They are added only in development and are left out of production builds, so the live
 * site never shows them. Real reviews go in Admin → Testimonials.
 */
export const PREVIEW_TESTIMONIALS = [
  {
    name: 'Priya Nair',
    role: 'Operations Head',
    company: 'Brightcart Retail',
    text: 'The admin dashboard they built saved our team hours every week. Clear communication from day one and they delivered exactly what we discussed.',
    rating: 5,
  },
  {
    name: 'Vikram Mehta',
    role: 'Founder',
    company: 'Nexora Labs',
    text: 'We came with a rough idea and left with a polished product. Their suggestions on design and performance made a real difference to our launch.',
    rating: 5,
  },
  {
    name: 'Sneha Kapoor',
    role: 'Marketing Manager',
    company: 'Wanderlane Travels',
    text: 'Our new website loads fast, looks great on phones, and enquiries have gone up noticeably since launch. Highly recommended for any small business.',
    rating: 5,
  },
  {
    name: 'Rohit Bora',
    role: 'Director',
    company: 'Brahmaputra Learning Centre',
    text: 'They understood our students and staff, not just the software. The online admission flow is simple and has made our whole intake process smoother.',
    rating: 5,
  },
  {
    name: 'Meera Joshi',
    role: 'Clinic Administrator',
    company: 'Carewell Family Clinic',
    text: 'Patients can now book appointments on WhatsApp in seconds. The team was patient with our changes and supported us well after going live.',
    rating: 5,
  },
  {
    name: 'Karan Singh',
    role: 'CTO',
    company: 'Swiftroute Logistics',
    text: 'Solid engineering, clean code, and an API that just works. They fit right into our workflow and hit every milestone on schedule.',
    rating: 5,
  },
  {
    name: 'Ayesha Khan',
    role: 'Product Owner',
    company: 'Tastebud Kitchens',
    text: 'From wireframes to the app store, the whole process was organised and transparent. Our customers love the new ordering experience.',
    rating: 5,
  },
];

/* Sort by the admin-set display order, then oldest first. */
export const sortTestimonials = (list) =>
  [...list].sort((a, b) => {
    const orderDiff = (Number(a.order) || 999) - (Number(b.order) || 999);
    if (orderDiff !== 0) return orderDiff;
    return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
  });
