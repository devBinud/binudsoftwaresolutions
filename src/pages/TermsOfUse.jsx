import { Link } from 'react-router-dom';
import LegalPage from '../components/LegalPage';

const CONTACT_EMAIL = 'binudsoftwaresolutions@gmail.com';

const sections = [
  {
    id: 'acceptance-of-terms',
    heading: 'Acceptance of Terms',
    content: (
      <p>
        By accessing or using this website, you agree to these Terms of Use and our{' '}
        <Link to="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the website.
      </p>
    ),
  },
  {
    id: 'use-of-the-website',
    heading: 'Use of the Website',
    content: (
      <>
        <p>You may use this website for lawful purposes only. You agree not to:</p>
        <ul>
          <li>Attempt to gain unauthorised access to the website, its servers or protected sections</li>
          <li>Interfere with the website&apos;s security or performance, or upload malicious code</li>
          <li>Submit false, misleading or spam enquiries through our forms</li>
          <li>Copy, scrape or republish our content in bulk without permission</li>
        </ul>
      </>
    ),
  },
  {
    id: 'our-services',
    heading: 'Our Services and Project Agreements',
    content: (
      <p>
        The information on this website about our services, timelines and capabilities is for general
        information only and does not form an offer or contract. Any project we take on is governed by a
        separate written proposal or agreement, which sets out the scope, pricing, deliverables and payment
        terms. If that agreement conflicts with these Terms, the agreement takes priority.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    heading: 'Intellectual Property',
    content: (
      <>
        <p>
          All content on this website, including text, graphics, logos, designs, case studies and code samples,
          is owned by Binud Software Solutions or used with permission, and is protected by copyright and other
          intellectual property laws.
        </p>
        <p>
          Client names, logos and app screenshots shown in our case studies belong to their respective owners
          and are displayed with permission. You may not use any of this material without written consent.
        </p>
      </>
    ),
  },
  {
    id: 'coding-guides-and-blog',
    heading: 'Coding Guides and Blog Content',
    content: (
      <p>
        Our coding guides, tutorials and blog posts are provided for educational purposes. Code examples are
        shared &quot;as is&quot; and you use them at your own risk. Always test code thoroughly before using it in a
        production system.
      </p>
    ),
  },
  {
    id: 'information-you-submit',
    heading: 'Information You Submit',
    content: (
      <p>
        When you send us an enquiry, you confirm that the information you provide is accurate and that you have
        the right to share it. If you request a Non-Disclosure Agreement (NDA), confidentiality obligations apply
        once the NDA has been signed by both parties. Please avoid sharing highly sensitive information through
        our website forms before then.
      </p>
    ),
  },
  {
    id: 'third-party-links',
    heading: 'Third-Party Links',
    content: (
      <p>
        This website may contain links to third-party websites, apps or services. We do not control them and are
        not responsible for their content, availability or practices.
      </p>
    ),
  },
  {
    id: 'disclaimer',
    heading: 'Disclaimer',
    content: (
      <p>
        This website and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis. While we
        work to keep the information accurate and up to date, we make no warranties that the website will be
        error-free, uninterrupted or free of harmful components.
      </p>
    ),
  },
  {
    id: 'limitation-of-liability',
    heading: 'Limitation of Liability',
    content: (
      <p>
        To the maximum extent permitted by law, Binud Software Solutions will not be liable for any indirect,
        incidental or consequential loss or damage arising from your use of, or inability to use, this website
        or its content.
      </p>
    ),
  },
  {
    id: 'governing-law',
    heading: 'Governing Law',
    content: (
      <p>
        These Terms are governed by the laws of India. Any disputes arising from them will be subject to the
        exclusive jurisdiction of the courts in Guwahati, Assam.
      </p>
    ),
  },
  {
    id: 'changes-to-these-terms',
    heading: 'Changes to These Terms',
    content: (
      <p>
        We may update these Terms of Use from time to time. Any changes will be posted on this page with an
        updated &quot;Last updated&quot; date. Continuing to use the website after changes are posted means you
        accept the updated Terms.
      </p>
    ),
  },
  {
    id: 'contact-us',
    heading: 'Contact Us',
    content: (
      <>
        <p>If you have any questions about these Terms of Use, contact us:</p>
        <ul>
          <li><strong>Binud Software Solutions</strong>, Guwahati, Assam, India</li>
          <li>Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
          <li>Phone: <a href="tel:+919706393924">+91 97063 93924</a></li>
        </ul>
      </>
    ),
  },
];

const TermsOfUse = () => (
  <LegalPage
    title="Terms of Use"
    canonicalPath="/terms"
    lastUpdated="October 12, 2026"
    intro={
      <p>
        These Terms of Use govern your use of the Binud Software Solutions website. Please read them carefully
        before using the website or submitting an enquiry.
      </p>
    }
    sections={sections}
  />
);

export default TermsOfUse;
