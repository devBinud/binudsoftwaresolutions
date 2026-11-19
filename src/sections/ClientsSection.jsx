import { motion, useReducedMotion } from 'framer-motion';
import { CLIENTS } from '../data/clients';

/* What goes inside each grid cell: the logo, the logo plus name, or the name alone */
const ClientMark = ({ client }) => {
  if (!client.logo) {
    return (
      <span className="text-center text-base sm:text-xl font-bold tracking-tight text-[#4f6b79] leading-tight">
        {client.name}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-3">
      <img
        src={client.logo}
        alt={client.showName ? '' : client.name}
        loading="lazy"
        decoding="async"
        className={`object-contain ${client.whiteBg ? 'mix-blend-multiply' : ''} ${
          client.showName
            ? 'h-10 w-10 sm:h-12 sm:w-12 shrink-0'
            : client.shape === 'square'
              ? 'max-h-20 sm:max-h-24 max-w-[110px] sm:max-w-[130px]'
              : 'max-h-12 sm:max-h-14 max-w-[140px] sm:max-w-[170px]'
        }`}
      />
      {client.showName && (
        <span className="text-base sm:text-xl font-bold tracking-tight text-ink leading-tight">{client.name}</span>
      )}
    </span>
  );
};

const ClientsSection = () => {
  const reduce = useReducedMotion();
  if (CLIENTS.length === 0) return null;

  return (
    <section aria-labelledby="clients-heading" className="py-16 md:py-20 bg-sky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <h2 id="clients-heading" className="section-title text-center">
          Trusted By Growing Businesses
        </h2>

        <motion.ul
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="logo-grid mt-10 md:mt-12"
        >
          {CLIENTS.map((client) => (
            <li key={client.name} className="logo-cell">
              <div className="flex h-full w-full items-center justify-center px-4">
                <ClientMark client={client} />
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default ClientsSection;
