import binudAvatar from '../assets/team/binud.png';
import userDefault from '../assets/user-default.png';

/*
 * Blog posts. `content` is a list of blocks rendered in order:
 *   { type: 'paragraph', text }
 *   { type: 'heading', text }          – section heading (also listed in "On this page")
 *   { type: 'list', items: [text] }
 *   { type: 'quote', text }            – highlighted key takeaway
 * `readTime` is worked out from the word count at the bottom of this file.
 */
const posts = [
  {
    id: 'future-of-mobile-engineering',
    title: 'The Future of Mobile Engineering: Cross-Platform Performance',
    category: 'Mobile Apps',
    date: 'June 12, 2026',
    excerpt: 'Explore how React Native and Flutter are closing the performance gap with native Swift and Kotlin development in corporate applications.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Binud Panging',
      role: 'Lead Software Engineer',
      avatar: binudAvatar
    },
    tags: ['React Native', 'Flutter', 'Mobile Development', 'Swift', 'Kotlin', 'Performance'],
    content: [
      {
        type: 'paragraph',
        text: 'The debate between native mobile development (Swift for iOS, Kotlin for Android) and cross-platform frameworks (React Native and Flutter) has reached a turning point. The question is no longer whether a cross-platform app can feel as fast as a native one. It can. The real question is which architecture choices make that happen, and where native code still earns its place.'
      },
      {
        type: 'paragraph',
        text: 'In this article we walk through what changed under the hood, why so many product teams now start cross-platform, and the practical performance habits we use on every mobile project to keep apps smooth on both flagship phones and budget Android devices.'
      },
      {
        type: 'heading',
        text: 'What Changed Under the Hood'
      },
      {
        type: 'paragraph',
        text: 'For years, the weak point of React Native was the "bridge": every message between JavaScript and native code was serialised to JSON and sent asynchronously. Long lists, gestures and animations could stutter because the two sides were always waiting on each other.'
      },
      {
        type: 'paragraph',
        text: 'The New Architecture removes that bottleneck. JSI (JavaScript Interface) lets JavaScript hold direct references to native objects and call them synchronously. Fabric, the new renderer, can measure and commit layout on the UI thread when it needs to, and TurboModules load native modules lazily instead of all at start-up. Combined with the Hermes engine, which compiles JavaScript to bytecode ahead of time, apps start faster and use less memory.'
      },
      {
        type: 'paragraph',
        text: 'Flutter took a different route from the start: it draws every pixel itself with its own rendering engine. Its newer Impeller renderer precompiles shaders, which removes the first-run "shader jank" that used to show up on animations. The result on both stacks is the same: smooth scrolling and transitions are now the default, not a special effort.'
      },
      {
        type: 'heading',
        text: 'Why Companies Choose Cross-Platform'
      },
      {
        type: 'paragraph',
        text: 'From an engineering point of view, two separate native codebases for one product means two teams, two sets of bugs and two release schedules. A single cross-platform codebase shares most business logic, networking, state management and UI between iOS and Android, so features reach both platforms together.'
      },
      {
        type: 'list',
        items: [
          'One team, one codebase: business rules, validation and API calls are written once and behave the same on both platforms.',
          'Faster releases: a feature is built, reviewed and tested once instead of twice.',
          'Over-the-air updates: JavaScript fixes can be shipped through services like Expo Updates without waiting for an app store review.',
          'Easier hiring: React Native draws on the large pool of React developers already building your web app.',
          'Consistent design: one component library keeps spacing, typography and behaviour aligned across devices.'
        ]
      },
      {
        type: 'quote',
        text: 'Cross-platform does not mean "no native code". It means writing native code only where it adds real value, and sharing everything else.'
      },
      {
        type: 'heading',
        text: 'When Native Still Wins'
      },
      {
        type: 'paragraph',
        text: 'There are still cases where fully native development is the right call: apps built around heavy real-time graphics or games, advanced camera and AR pipelines, very tight integration with the newest OS features on launch day, or products where the app itself is a thin layer over complex platform APIs.'
      },
      {
        type: 'paragraph',
        text: 'In practice, most business apps (booking, delivery, fintech, healthcare, internal tools) sit comfortably in cross-platform territory. When one feature does need native power, we write that piece as a native module in Swift or Kotlin and call it from the shared app. The team keeps the speed of one codebase without giving up anything the platform offers.'
      },
      {
        type: 'heading',
        text: 'Performance Habits We Use on Every Project'
      },
      {
        type: 'paragraph',
        text: 'A modern framework gives you a fast starting point, but performance is still earned in the details. These are the habits we apply on every mobile build:'
      },
      {
        type: 'list',
        items: [
          'Virtualise long lists: use FlatList with stable keys and fixed item heights, or FlashList for very long feeds, so only visible rows are rendered.',
          'Keep animations on the UI thread: libraries like Reanimated run gesture and animation logic natively, so a busy JavaScript thread never drops frames.',
          'Avoid unnecessary re-renders: memoise expensive components, keep state close to where it is used, and select only the slices of global state a screen needs.',
          'Size and cache images: serve images at the size they are displayed, in modern formats, and cache them on the device.',
          'Move heavy work off the main thread: parsing large responses, encryption and image processing belong in background tasks or native modules.',
          'Measure before optimising: profile with Flipper, the React DevTools profiler or Flutter DevTools on a real mid-range Android phone, not only on a simulator.'
        ]
      },
      {
        type: 'heading',
        text: 'Testing on Real Devices'
      },
      {
        type: 'paragraph',
        text: 'The most common performance mistake we see is testing only on the latest iPhone. Many of your users are on mid-range or older Android phones with less memory and slower storage. We keep a small set of real test devices across price ranges and run every release on them, paying attention to start-up time, scroll smoothness, memory use and battery drain on long sessions.'
      },
      {
        type: 'paragraph',
        text: 'Automated end-to-end tests (with tools like Detox or Maestro) catch functional regressions, while crash and performance monitoring in production (Sentry, Firebase Crashlytics) shows how the app behaves on thousands of devices you will never hold in your hand.'
      },
      {
        type: 'heading',
        text: 'Choosing the Right Approach for Your Product'
      },
      {
        type: 'paragraph',
        text: 'If you are starting a new business app, cross-platform is usually the most efficient path: one team, one codebase and a near-native experience on both platforms. If you already have a web app in React, React Native lets you reuse that knowledge. If pixel-perfect custom UI across platforms matters most, Flutter is a strong choice.'
      },
      {
        type: 'paragraph',
        text: 'Whichever you choose, plan for performance from day one: pick the right list and animation libraries, set budgets for start-up time and bundle size, and test on real devices before every release. That is what turns a cross-platform app into one your users simply describe as "fast".'
      }
    ]
  },
  {
    id: 'why-headless-cms-and-laravel-dominate',
    title: 'Why Headless CMS & Laravel Dominate Modern Corporate Architectures',
    category: 'Web Development',
    date: 'June 08, 2026',
    excerpt: 'Discover why pairing decoupled frontends with headless setups and Laravel backends provides optimal scalability and security.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Niranjan Kalita',
      role: 'Backend Engineer',
      avatar: userDefault
    },
    tags: ['Laravel', 'Headless CMS', 'Web Architecture', 'API Development', 'Security'],
    content: [
      {
        type: 'paragraph',
        text: 'Decoupled web applications have moved from an experimental pattern to the standard model for serious business websites. By separating the user interface (the frontend) from the database and content engine (the backend), teams get faster pages, a smaller attack surface and the freedom to change one side without rebuilding the other.'
      },
      {
        type: 'paragraph',
        text: 'In this article we explain what "headless" really means, why Laravel is such a strong fit for the backend, and how we structure these projects so they stay fast and secure as they grow.'
      },
      {
        type: 'heading',
        text: 'Monolithic vs Headless: What Is the Difference?'
      },
      {
        type: 'paragraph',
        text: 'In a traditional monolithic CMS, the same application stores your content, runs your business logic and renders every page on each request. It is simple to start with, but every visitor hits the same server and database, themes are tied to the backend, and a plugin vulnerability can expose the whole system.'
      },
      {
        type: 'paragraph',
        text: 'A headless setup splits these jobs apart. Editors manage content in a CMS that exposes it only through an API. The website, mobile app or kiosk fetches that content and renders it independently. The CMS has no "head", no public theme, which is where the name comes from.'
      },
      {
        type: 'heading',
        text: 'The Advantages of a Decoupled Setup'
      },
      {
        type: 'paragraph',
        text: 'Most pages on a business site change rarely: service pages, case studies, blog posts. In a headless build, those pages can be pre-rendered into static HTML and served from a CDN close to the visitor. The database is only involved when content is published, not on every page view.'
      },
      {
        type: 'list',
        items: [
          'Speed: pre-rendered pages served from a CDN load quickly anywhere in the world and handle traffic spikes without extra servers.',
          'Security: the database and admin panel sit behind a firewall; the public only ever sees static files and read-only API responses.',
          'Omnichannel delivery: the same REST or GraphQL API serves the website, mobile apps and any future channel.',
          'Independent teams: designers can rebuild the frontend in a new framework without touching backend schemas or content.',
          'Better editor experience: content teams get a clean editing interface focused on structured content, not page templates.'
        ]
      },
      {
        type: 'quote',
        text: 'The fastest and safest page is the one your server does not have to build on every request.'
      },
      {
        type: 'heading',
        text: 'Why Laravel Fits Perfectly'
      },
      {
        type: 'paragraph',
        text: 'Not every project can use an off-the-shelf headless CMS alone. Bookings, payments, customer portals, approvals and integrations with ERPs or CRMs need a real application backend. That is where Laravel shines.'
      },
      {
        type: 'list',
        items: [
          'API Resources turn database models into clean, versionable JSON responses.',
          'Sanctum provides simple, secure token and cookie authentication for SPAs and mobile apps.',
          'Queues with Horizon move slow work (emails, PDF generation, third-party calls) into background jobs with a live dashboard.',
          'Form requests and validation keep every input checked in one place before it reaches your business logic.',
          'Octane keeps the application in memory between requests for high-throughput APIs.',
          'A large ecosystem (Cashier for billing, Scout for search, Socialite for social login) means less code to write and maintain.'
        ]
      },
      {
        type: 'paragraph',
        text: 'Laravel can also serve as the content backend itself, with a package like Filament for the admin panel or Statamic as a Laravel-native CMS. For content-heavy sites, we often pair a dedicated headless CMS for marketing content with a Laravel API for everything transactional.'
      },
      {
        type: 'heading',
        text: 'A Typical Architecture We Build'
      },
      {
        type: 'paragraph',
        text: 'A common setup for our corporate clients looks like this: a Next.js or React frontend deployed on a CDN, a headless CMS for pages and blog content, and a Laravel API for accounts, forms, payments and integrations, backed by MySQL or PostgreSQL and Redis.'
      },
      {
        type: 'list',
        items: [
          'Content pages are built statically and refreshed automatically when an editor publishes, using a webhook that triggers revalidation.',
          'Dynamic areas (dashboards, account pages, search) call the Laravel API directly and are cached where it is safe.',
          'Forms submit to the API, which validates the data, stores it and pushes notifications through queued jobs.',
          'Media is stored in object storage and served through an image CDN in the right size and format for each device.'
        ]
      },
      {
        type: 'heading',
        text: 'Security Practices That Matter'
      },
      {
        type: 'paragraph',
        text: 'Decoupling reduces risk, but it does not remove the need for good security hygiene. On every headless build we enforce HTTPS everywhere, short-lived tokens, strict CORS rules that allow only known frontends, rate limiting on public endpoints, and role-based access in the admin. Secrets live in environment configuration, never in the frontend bundle, and dependencies are updated on a regular schedule.'
      },
      {
        type: 'heading',
        text: 'When Headless Is Not the Right Choice'
      },
      {
        type: 'paragraph',
        text: 'Headless adds moving parts: two deployments, an API contract to maintain, and preview workflows for editors. For a small brochure site with a handful of pages and no integrations, a well-built traditional CMS can be quicker and cheaper. Headless pays off when you need speed at scale, multiple channels, custom business logic or a frontend your team wants full control over.'
      },
      {
        type: 'paragraph',
        text: 'If you are planning a new corporate website or replacing an ageing CMS, start by mapping your content, your integrations and the channels you need to serve. That map usually makes the right architecture obvious, and it is exactly where we begin with every client.'
      }
    ]
  },
  {
    id: 'ai-automation-smb-operations',
    title: 'The Impact of Custom AI Integrations in SMB Operations',
    category: 'AI & Automation',
    date: 'May 28, 2026',
    excerpt: 'A practical guide on how small and medium-sized businesses can integrate customized AI assistants to automate customer success and analytics.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Devraj Sen',
      role: 'AI & Automation Lead',
      avatar: userDefault
    },
    tags: ['AI Integration', 'Automation', 'SMB Strategy', 'Workflow Optimization', 'RAG'],
    content: [
      {
        type: 'paragraph',
        text: 'Artificial intelligence is no longer reserved for large technology companies. Custom AI integrations are now affordable and practical for small and medium-sized businesses that want to cut repetitive work, answer customers faster and make better use of the data they already have.'
      },
      {
        type: 'paragraph',
        text: 'The businesses getting real value are not buying the most expensive tool on the market. They are connecting focused AI assistants to their existing systems (CRM, inventory, helpdesk, accounting) so that routine requests are handled in seconds and people spend their time on the work that needs them.'
      },
      {
        type: 'heading',
        text: 'Where Automation Delivers the Most Value'
      },
      {
        type: 'paragraph',
        text: 'AI works best on repetitive, text-heavy work that follows recognisable patterns. A good first question is: which tasks does my team repeat every day, mostly by reading something and typing a response or copying data between systems?'
      },
      {
        type: 'list',
        items: [
          'Customer support: answering common questions about orders, pricing, policies and opening hours, and handing complex cases to a person with the full context.',
          'Document processing: reading invoices, purchase orders, forms and IDs, extracting the key fields and entering them into your systems.',
          'Sales follow-up: qualifying leads from your website or WhatsApp, booking meetings and drafting personalised follow-up messages.',
          'Internal knowledge: letting staff ask questions of manuals, SOPs and past tickets instead of searching shared drives.',
          'Reporting: summarising daily sales, support volumes or stock levels into a short report sent to managers each morning.'
        ]
      },
      {
        type: 'heading',
        text: 'Off-the-Shelf Tools vs Custom Integrations'
      },
      {
        type: 'paragraph',
        text: 'Generic AI tools are a good way to experiment, but they do not know your products, your customers or your rules, and they usually cannot act inside your systems. A custom integration connects a language model to your own data and tools, with the permissions and guardrails your business needs.'
      },
      {
        type: 'paragraph',
        text: 'The core technique behind most business assistants is retrieval-augmented generation (RAG). Your documents and records are split into small passages and indexed by meaning. When a question comes in, the system finds the most relevant passages and gives them to the model, which answers using your information rather than guessing. The assistant can also cite where its answer came from.'
      },
      {
        type: 'quote',
        text: 'An AI assistant is only as good as the information it can reach. Clean, up-to-date data matters more than the choice of model.'
      },
      {
        type: 'heading',
        text: 'A Step-by-Step AI Roadmap'
      },
      {
        type: 'paragraph',
        text: 'We follow the same roadmap with most clients. It keeps the first project small, measurable and low risk, and builds confidence before AI touches anything critical.'
      },
      {
        type: 'list',
        items: [
          'Pick one workflow: choose a single, high-volume task with a clear owner, such as answering order-status questions.',
          'Audit the data: gather the FAQs, policies, past conversations and database fields the task depends on, and clean up anything outdated.',
          'Define success: agree on what you will measure, for example response time, resolution rate, hours saved or customer satisfaction.',
          'Build a pilot: connect the assistant to the data, add guardrails, and run it with a small group or in "suggest" mode where a person approves each answer.',
          'Review and improve: read real conversations every week, fix gaps in the knowledge base and tune the prompts and rules.',
          'Expand carefully: once the pilot meets its targets, let it act automatically and move on to the next workflow.'
        ]
      },
      {
        type: 'heading',
        text: 'Keeping Humans in the Loop'
      },
      {
        type: 'paragraph',
        text: 'Good automation knows its limits. We design every assistant with clear hand-over points: when a customer is upset, when a request involves money or personal data, or when the assistant is not confident, the conversation goes to a person along with a summary of what has happened so far. Actions that change records (refunds, cancellations, price changes) can require approval until the team is comfortable.'
      },
      {
        type: 'heading',
        text: 'Data Privacy and Security'
      },
      {
        type: 'paragraph',
        text: 'Customer data deserves the same care in an AI system as anywhere else. We send models only the information they need for each request, mask personal details where possible, keep logs in your own infrastructure and choose providers that do not train on your data. For businesses in India, this also means designing with the Digital Personal Data Protection Act in mind: collect only what you need, use it for the stated purpose and let people request its removal.'
      },
      {
        type: 'heading',
        text: 'Measuring the Return'
      },
      {
        type: 'paragraph',
        text: 'Track the same numbers before and after the pilot: how many requests come in, how long they take to resolve, how many need a person, and what customers say about the experience. Add the running costs (model usage, hosting, maintenance) and compare them with the hours saved. Most successful projects pay for themselves through time saved on one workflow before they expand to the next.'
      },
      {
        type: 'paragraph',
        text: 'AI does not replace a well-run team. It removes the repetitive work that slows that team down. Start with one workflow, measure honestly and grow from there, and AI becomes a dependable part of how your business runs rather than an experiment.'
      }
    ]
  },
  {
    id: 'ui-ux-design-principles-for-trust',
    title: 'UI/UX Design Principles: Building Interfaces that Drive Conversion',
    category: 'UI/UX Design',
    date: 'May 15, 2026',
    excerpt: 'Analyze the psychological design choices like visual hierarchy, color theory, and micro-interactions that turn visitors into loyal customers.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Riya Dutta',
      role: 'UI/UX Designer',
      avatar: userDefault
    },
    tags: ['UI/UX Design', 'Conversion Optimization', 'Web Design', 'Accessibility', 'Micro-Animations'],
    content: [
      {
        type: 'paragraph',
        text: 'Visitors decide within moments whether a website feels trustworthy, professional and easy to use. That judgement happens before they read a single paragraph. Great design is not about decoration; it is about reducing friction, guiding attention and making the next step obvious.'
      },
      {
        type: 'paragraph',
        text: 'In this article we share the principles we apply on every website and app we design, from layout and typography to forms, feedback and motion, and how each one turns more visitors into customers.'
      },
      {
        type: 'heading',
        text: 'Core Principles of High-Trust Interfaces'
      },
      {
        type: 'paragraph',
        text: 'An interface builds credibility when it behaves the way people expect. Jakob\'s Law reminds us that users spend most of their time on other websites, so they arrive with expectations: the logo links home, the menu sits at the top, the primary action looks like a button. Breaking these conventions without a strong reason costs trust.'
      },
      {
        type: 'list',
        items: [
          'Consistent layout grids: align elements to a shared grid and spacing scale so pages feel calm and predictable.',
          'Clear visual hierarchy: one primary action per screen, styled to stand out from secondary links.',
          'Immediate feedback: every tap or click gets a visible response, whether a pressed state, a spinner or a confirmation.',
          'Plain language: buttons say what they do ("Book a call", "Download invoice"), not "Submit" or "Click here".',
          'Accessibility by default: readable font sizes, sufficient colour contrast and full keyboard support.'
        ]
      },
      {
        type: 'heading',
        text: 'Visual Hierarchy and Typography'
      },
      {
        type: 'paragraph',
        text: 'People scan before they read. Strong headings, short paragraphs and generous spacing let them find what they need quickly. We usually limit a design to one typeface family with a clear scale of sizes and weights, and keep body text at a comfortable reading size with line lengths that do not tire the eye.'
      },
      {
        type: 'paragraph',
        text: 'Size, weight and position tell visitors what matters most. The headline states the value, the supporting text explains it, and the call to action tells them what to do next. If everything is bold, nothing is.'
      },
      {
        type: 'heading',
        text: 'Colour, Contrast and Brand'
      },
      {
        type: 'paragraph',
        text: 'Colour should carry meaning, not just mood. We pick one brand colour for primary actions and links, a neutral palette for text and surfaces, and reserved colours for success, warning and error states. Using the brand colour sparingly makes the important actions easy to spot.'
      },
      {
        type: 'paragraph',
        text: 'Contrast is not optional. WCAG guidelines ask for a contrast ratio of at least 4.5:1 for normal body text. Light grey text on white may look elegant in a mock-up, but it is hard to read on a phone in sunlight and excludes users with low vision.'
      },
      {
        type: 'quote',
        text: 'Every extra decision you ask a visitor to make is a chance for them to leave. Good design removes decisions.'
      },
      {
        type: 'heading',
        text: 'Reducing Friction in Forms and Checkout'
      },
      {
        type: 'paragraph',
        text: 'Forms are where conversions are won or lost. Hick\'s Law tells us that more choices mean slower decisions, so every field should earn its place. Fitts\'s Law tells us that larger, closer targets are easier to hit, which is why primary buttons should be big and placed where the thumb or cursor already is.'
      },
      {
        type: 'list',
        items: [
          'Ask only for what you need now; collect the rest later.',
          'Use labels above fields, not placeholder text that disappears when typing starts.',
          'Pick the right keyboard on mobile (email, number, phone) and support autofill.',
          'Validate inline with clear, friendly messages that say how to fix the problem.',
          'Show progress on multi-step forms and keep entered data if the user goes back.'
        ]
      },
      {
        type: 'heading',
        text: 'The Power of Micro-Interactions'
      },
      {
        type: 'paragraph',
        text: 'Small, purposeful animations (a button that responds to a press, a card that eases into view, a checkmark that confirms a saved setting) give digital interfaces a sense of physical feedback. They reassure users that something happened and make the product feel polished.'
      },
      {
        type: 'paragraph',
        text: 'The key is restraint. Keep transitions short, animate only properties that do not trigger layout work, and respect the "reduce motion" setting for users who are sensitive to movement. Motion should explain what changed, never delay the user from moving on.'
      },
      {
        type: 'heading',
        text: 'Building Trust with Social Proof'
      },
      {
        type: 'paragraph',
        text: 'People trust what other people trust. Real client logos, short testimonials with names and roles, case studies with clear outcomes and visible contact details all reduce the perceived risk of getting in touch. Place them close to the decisions they support, such as next to a pricing table or a contact form, rather than hiding them on a separate page.'
      },
      {
        type: 'heading',
        text: 'Measure, Test and Iterate'
      },
      {
        type: 'paragraph',
        text: 'Design is never finished at launch. We track where users click, where they drop off and how long key tasks take, then test improvements one at a time. Session recordings and short usability tests with five or six real users often reveal more than weeks of internal debate.'
      },
      {
        type: 'paragraph',
        text: 'Interfaces that convert are clear, consistent, accessible and honest. Get those fundamentals right, keep listening to your users, and every design decision starts working towards the same goal: helping the right visitors take the next step.'
      }
    ]
  }
];

// "N min read" from the word count, at about 200 words a minute
const readTimeOf = (post) => {
  const words = post.content
    .flatMap((block) => (block.items ? block.items : [block.text || '']))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

export const blogPosts = posts.map((post) => ({ ...post, readTime: readTimeOf(post) }));
