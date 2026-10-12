import { Link } from 'react-router-dom';
import LegalPage from '../components/LegalPage';

const CONTACT_EMAIL = 'binudsoftwaresolutions@gmail.com';

const sections = [
  {
    id: 'information-we-collect',
    heading: 'Information We Collect',
    content: (
      <>
        <p>
          <strong>Information you give us.</strong> When you fill in our consultation form, the AI Automation
          survey, or contact us directly, we collect the details you choose to share. This can include:
        </p>
        <ul>
          <li>Your name, email address, phone number and company name</li>
          <li>Your project details, requirements and survey answers</li>
          <li>Your preferred way of communication and whether you requested an NDA</li>
          <li>The names of any files you attach to your enquiry</li>
        </ul>
        <p>
          <strong>Information collected automatically.</strong> Like most websites, our hosting provider records
          basic technical information when you visit, such as your IP address, browser type, device type and the
          pages you request. This is used to keep the website running securely.
        </p>
        <p>
          <strong>Anonymous visit statistics.</strong> To understand which pages are useful, we record basic visit
          statistics: the page you viewed, the website that referred you, your device type and browser, and a
          random visitor ID. We do not record your IP address for these statistics, and we do not use advertising
          cookies or third-party analytics services.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use-information',
    heading: 'How We Use Your Information',
    content: (
      <>
        <p>We use the information you provide only to:</p>
        <ul>
          <li>Respond to your enquiry and schedule consultations</li>
          <li>Prepare proposals, estimates and recommendations for your project</li>
          <li>Deliver and support the services you engage us for</li>
          <li>Keep our website secure and prevent spam or misuse of our forms</li>
          <li>Meet our legal and accounting obligations</li>
        </ul>
        <p>
          We will not add you to a marketing mailing list without your consent, and we do not sell, rent or trade
          your personal information.
        </p>
      </>
    ),
  },
  {
    id: 'sharing-and-storage',
    heading: 'How Your Information Is Stored and Shared',
    content: (
      <>
        <p>
          We share your information only with trusted service providers that help us run this website, and only
          as far as needed for them to do so:
        </p>
        <ul>
          <li><strong>Vercel</strong> — hosts this website and processes form submissions</li>
          <li><strong>Google Firebase</strong> — securely stores the enquiries submitted through our forms and our anonymous visit statistics</li>
          <li><strong>Our email provider</strong> — delivers your enquiry to our team&apos;s inbox</li>
          <li><strong>Google Fonts</strong> — serves the fonts used on this website</li>
        </ul>
        <p>
          Some of these providers may store data on servers outside India. We may also disclose information if
          required by law, court order or a government authority.
        </p>
      </>
    ),
  },
  {
    id: 'cookies-and-browser-storage',
    heading: 'Cookies and Browser Storage',
    content: (
      <>
        <p>
          We do not use advertising or third-party tracking cookies. The website does use your browser&apos;s
          local storage in three limited ways:
        </p>
        <ul>
          <li>
            A backup copy of enquiries you submit is kept in your own browser, so your message is not lost if
            our servers cannot be reached. This copy stays on your device and is not shared with anyone.
          </li>
          <li>
            A random, anonymous visitor ID is saved so we can count unique visitors without knowing who you are.
          </li>
          <li>
            Temporary session storage is used to remember when you have unlocked a PIN-protected section,
            and is cleared when you close the browser tab.
          </li>
        </ul>
        <p>You can clear this data at any time from your browser settings.</p>
      </>
    ),
  },
  {
    id: 'data-retention',
    heading: 'Data Retention',
    content: (
      <p>
        We keep enquiry details for as long as needed to respond to you and, if we work together, for the
        duration of the project and any period required by law for accounting or legal purposes. When the
        information is no longer needed, we delete it.
      </p>
    ),
  },
  {
    id: 'data-security',
    heading: 'Data Security',
    content: (
      <p>
        We use reasonable technical and organisational measures to protect your information, including encrypted
        (HTTPS) connections and access-controlled storage. However, no method of transmission over the internet
        is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'your-rights',
    heading: 'Your Rights',
    content: (
      <>
        <p>
          In line with the Digital Personal Data Protection Act, 2023 (India) and other applicable laws, you can
          ask us to:
        </p>
        <ul>
          <li>Tell you what personal information we hold about you</li>
          <li>Correct or update information that is inaccurate</li>
          <li>Delete your information</li>
          <li>Withdraw any consent you have given us</li>
        </ul>
        <p>
          To make a request, email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will
          respond within a reasonable time.
        </p>
      </>
    ),
  },
  {
    id: 'childrens-privacy',
    heading: "Children's Privacy",
    content: (
      <p>
        Our services are intended for businesses and adults. We do not knowingly collect personal information
        from children under 18. If you believe a child has shared information with us, please contact us and we
        will delete it.
      </p>
    ),
  },
  {
    id: 'third-party-links',
    heading: 'Third-Party Links',
    content: (
      <p>
        Our website may link to other websites, such as our social media profiles or client apps. We are not
        responsible for the privacy practices of those websites, and we encourage you to read their privacy
        policies.
      </p>
    ),
  },
  {
    id: 'changes-to-this-policy',
    heading: 'Changes to This Policy',
    content: (
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
        updated &quot;Last updated&quot; date.
      </p>
    ),
  },
  {
    id: 'contact-us',
    heading: 'Contact Us',
    content: (
      <>
        <p>If you have any questions about this Privacy Policy or how we handle your information, contact us:</p>
        <ul>
          <li><strong>Binud Software Solutions</strong>, Guwahati, Assam, India</li>
          <li>Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
          <li>Phone: <a href="tel:+919706393924">+91 97063 93924</a></li>
        </ul>
        <p>
          You can also reach us through our <Link to="/contact">contact page</Link>.
        </p>
      </>
    ),
  },
];

const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    canonicalPath="/privacy"
    lastUpdated="October 12, 2026"
    intro={
      <p>
        At Binud Software Solutions (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), we respect your privacy. This
        Privacy Policy explains what information we collect when you use our website, how we use it, and the
        choices you have.
      </p>
    }
    sections={sections}
  />
);

export default PrivacyPolicy;
