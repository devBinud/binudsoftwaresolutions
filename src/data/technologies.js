import {
  SiReact, SiNextdotjs, SiVuedotjs, SiHtml5, SiCss, SiJavascript, SiTypescript, SiTailwindcss, SiVite,
  SiNodedotjs, SiExpress, SiPython, SiDjango, SiLaravel, SiPhp, SiGraphql,
  SiFlutter, SiAndroid, SiApple, SiKotlin, SiSwift, SiFirebase,
  SiMongodb, SiMysql, SiPostgresql, SiSupabase, SiRedis,
  SiGooglecloud, SiDocker, SiKubernetes, SiGithubactions, SiVercel, SiNginx,
  SiOpenai, SiAnthropic, SiLangchain, SiHuggingface, SiZapier,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

/**
 * "Core Technologies Behind Our Work" tabs on the Home page.
 * Add, remove or reorder freely — each item needs a name, an icon and its brand colour.
 * The "Technologies in Our Stack" stat counts the unique names in this list automatically.
 */
export const TECH_GROUPS = [
  {
    name: 'Frontend',
    items: [
      { name: 'React.js', icon: SiReact, color: '#149eca' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#41b883' },
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: SiCss, color: '#1572b6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#e8c400' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#0ea5e9' },
      { name: 'Vite', icon: SiVite, color: '#8b5cf6' },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#3c873a' },
      { name: 'Express', icon: SiExpress, color: '#000000' },
      { name: 'Python', icon: SiPython, color: '#3776ab' },
      { name: 'Django', icon: SiDjango, color: '#0c4b33' },
      { name: 'Laravel', icon: SiLaravel, color: '#f9322c' },
      { name: 'PHP', icon: SiPhp, color: '#777bb4' },
      { name: 'GraphQL', icon: SiGraphql, color: '#e10098' },
    ],
  },
  {
    name: 'Mobile App',
    items: [
      { name: 'Flutter', icon: SiFlutter, color: '#0468d7' },
      { name: 'React Native', icon: SiReact, color: '#149eca' },
      { name: 'Android', icon: SiAndroid, color: '#3ddc84' },
      { name: 'iOS', icon: SiApple, color: '#000000' },
      { name: 'Kotlin', icon: SiKotlin, color: '#7f52ff' },
      { name: 'Swift', icon: SiSwift, color: '#f05138' },
      { name: 'Firebase', icon: SiFirebase, color: '#f58220' },
    ],
  },
  {
    name: 'Database',
    items: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
      { name: 'MySQL', icon: SiMysql, color: '#00758f' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'Firebase', icon: SiFirebase, color: '#f58220' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ecf8e' },
      { name: 'Redis', icon: SiRedis, color: '#dc382d' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    items: [
      { name: 'AWS', icon: FaAws, color: '#ff9900' },
      { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285f4' },
      { name: 'Docker', icon: SiDocker, color: '#2496ed' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326ce5' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088ff' },
      { name: 'Vercel', icon: SiVercel, color: '#000000' },
      { name: 'Nginx', icon: SiNginx, color: '#009639' },
    ],
  },
  {
    name: 'AI & Automation',
    items: [
      { name: 'OpenAI', icon: SiOpenai, color: '#0b1b2b' },
      { name: 'Claude', icon: SiAnthropic, color: '#d97757' },
      { name: 'LangChain', icon: SiLangchain, color: '#1c3c3c' },
      { name: 'Hugging Face', icon: SiHuggingface, color: '#f5a623' },
      { name: 'Python', icon: SiPython, color: '#3776ab' },
      { name: 'Zapier', icon: SiZapier, color: '#ff4a00' },
    ],
  },
];

/* Number of distinct technologies across all tabs */
export const TECH_COUNT = new Set(TECH_GROUPS.flatMap((g) => g.items.map((i) => i.name))).size;
