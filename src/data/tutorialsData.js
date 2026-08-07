export const tutorialCategories = [
  'All',
  'Web Development',
  'Backend & APIs',
  'AI & Automation',
  'Mobile Apps',
  'DevOps & Cloud',
];

export const tutorialLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export const tutorialsData = [
  {
    id: 'react-19-server-actions',
    title: 'Building Modern React Apps with Server Actions & Concurrent Mode',
    slug: 'react-19-server-actions',
    category: 'Web Development',
    level: 'Intermediate',
    readTime: '12 min read',
    publishedDate: 'Aug 02, 2026',
    author: {
      name: 'Binud Prasad',
      role: 'Lead Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    icon: 'react',
    tags: ['React', 'Next.js', 'TypeScript', 'Frontend'],
    shortDesc: 'Learn how to leverage React 19 server actions, optimistic UI updates, and async transitions to build ultra-responsive web applications.',
    overview: `React 19 introduces game-changing capabilities for state management, server integration, and user feedback loops. In this hands-on tutorial, we walk through constructing a production-ready application using React Server Actions and optimistic rendering.`,
    prerequisites: [
      'Basic familiarity with JavaScript (ES6+) and React Hooks',
      'Node.js v18+ installed on your machine',
      'Understanding of async/await syntax'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Setting up the React 19 Environment',
        description: 'Initialize a clean React application configured for modern hooks and compiler optimizations.',
        codeSnippet: `// Terminal Command
npx create-next-app@latest my-react19-app --typescript --tailwind --eslint

// Navigate to project folder
cd my-react19-app
npm install lucide-react clsx tailwind-merge`,
        language: 'bash'
      },
      {
        stepNumber: 2,
        title: 'Implementing Server Actions for Mutating State',
        description: 'Define server functions directly called from form handlers without manual fetch/API boilerplates.',
        codeSnippet: `// app/actions/userActions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function updateUserProfile(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;

  if (!name || name.length < 2) {
    return { success: false, error: 'Name must be at least 2 characters.' };
  }

  // Simulate Database operation
  await new Promise((res) => setTimeout(res, 800));

  revalidatePath('/profile');
  return { success: true, message: 'Profile updated successfully!' };
}`,
        language: 'typescript'
      },
      {
        stepNumber: 3,
        title: 'Adding Optimistic UI Updates with useOptimistic Hook',
        description: 'Provide instantaneous feedback to users before server confirmation completes.',
        codeSnippet: `// components/ProfileForm.tsx
'use client';

import { useOptimistic, useActionState } from 'react';
import { updateUserProfile } from '@/app/actions/userActions';

export default function ProfileForm({ initialName }: { initialName: string }) {
  const [state, formAction, isPending] = useActionState(updateUserProfile, null);
  
  const [optimisticName, setOptimisticName] = useOptimistic(
    initialName,
    (current, newName: string) => newName
  );

  const handleSubmit = async (formData: FormData) => {
    const newName = formData.get('name') as string;
    setOptimisticName(newName); // Instant UI feedback
    await formAction(formData);
  };

  return (
    <form action={handleSubmit} className="space-y-4 max-w-md p-6 bg-white rounded-2xl border">
      <div>
        <label className="block text-sm font-semibold mb-1">Display Name</label>
        <input 
          type="text" 
          name="name" 
          defaultValue={optimisticName} 
          className="w-full px-4 py-2 border rounded-xl"
        />
      </div>
      <button 
        type="submit" 
        disabled={isPending}
        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
      >
        {isPending ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}`,
        language: 'tsx'
      }
    ],
    summary: 'By mastering Server Actions and optimistic updates, you eliminate tedious state management libraries and significantly improve application response speed.'
  },
  {
    id: 'nodejs-express-scalable-api',
    title: 'Building Enterprise Scalable REST APIs with Node.js & Express',
    slug: 'nodejs-express-scalable-api',
    category: 'Backend & APIs',
    level: 'Advanced',
    readTime: '15 min read',
    publishedDate: 'Jul 28, 2026',
    author: {
      name: 'Pribrat Phukan',
      role: 'Backend Engineering Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    icon: 'node',
    tags: ['Node.js', 'Express', 'API', 'Backend', 'Security'],
    shortDesc: 'Architect modular, high-throughput backend services complete with rate limiting, structured validation, and centralized error handling.',
    overview: `Scaling Express.js applications requires clean layered architecture, robust payload validation, rate-limiting, and centralized middleware pipelines. This tutorial guides you step-by-step through setting up production-ready RESTful microservices.`,
    prerequisites: [
      'Basic knowledge of JavaScript & Node.js ecosystem',
      'npm or yarn package manager',
      'Understanding of HTTP methods and status codes'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Project Structure & Layered Architecture',
        description: 'Organize your server codebase using controllers, services, repositories, and routes.',
        codeSnippet: `src/
├── config/         # Environment variables & DB connection
├── controllers/    # Request handling & HTTP response mapping
├── middlewares/    # Error handlers, Auth, Rate limiters
├── routes/         # API endpoint definitions
├── services/       # Core business logic
└── app.ts          # Express application initialization`,
        language: 'bash'
      },
      {
        stepNumber: 2,
        title: 'Setting up Centralized Async Error Middleware',
        description: 'Prevent uncaught promise rejections from crashing your server process.',
        codeSnippet: `// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 'statusCode' in err ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  console.error(\`[ERROR] \${req.method} \${req.url} - \${message}\`);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    timestamp: new Date().toISOString(),
  });
};`,
        language: 'typescript'
      },
      {
        stepNumber: 3,
        title: 'Enforcing Security Headers & Rate Limiting',
        description: 'Protect your API from DDoS attempts and header spoofing using Helmet and express-rate-limit.',
        codeSnippet: `// app.ts
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { globalErrorHandler } from './middlewares/errorHandler';

const app = express();

// Security Headers
app.use(helmet());

// Rate Limiter: Limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

app.use('/api/', limiter);
app.use(express.json());

// Routes and Error Handler
app.use(globalErrorHandler);

export default app;`,
        language: 'typescript'
      }
    ],
    summary: 'A structured Express setup with proper validation and global error handling ensures long-term maintainability and bulletproof reliability.'
  },
  {
    id: 'ai-rag-langchain-python',
    title: 'Integrating AI Assistants & Retrieval-Augmented Generation (RAG) with Python',
    slug: 'ai-rag-langchain-python',
    category: 'AI & Automation',
    level: 'Advanced',
    readTime: '18 min read',
    publishedDate: 'Jul 24, 2026',
    author: {
      name: 'Binud Prasad',
      role: 'AI Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    icon: 'python',
    tags: ['Python', 'AI', 'LangChain', 'OpenAI', 'Vector DB'],
    shortDesc: 'Build custom knowledge base Q&A bots using Python, LangChain, vector embeddings, and OpenAI GPT models.',
    overview: `RAG (Retrieval-Augmented Generation) empowers LLMs to accurately answer questions from your private documents without expensive model fine-tuning. This tutorial demonstrates building a semantic document assistant.`,
    prerequisites: [
      'Python 3.10+ installed',
      'OpenAI API Key',
      'Basic familiarity with vector databases (ChromaDB / FAISS)'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Installing Required Libraries',
        description: 'Set up your Python virtual environment and install LangChain with Chroma DB support.',
        codeSnippet: `python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

pip install langchain langchain-openai chromadb pypdf python-dotenv`,
        language: 'bash'
      },
      {
        stepNumber: 2,
        title: 'Document Ingestion & Chunk Vectorization',
        description: 'Load PDF documents, split text into semantic chunks, and generate vector embeddings.',
        codeSnippet: `import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

load_dotenv()

def build_vector_store(pdf_path: str):
    # 1. Load Document
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()

    # 2. Split into overlapping chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)

    # 3. Embed & Store in Chroma DB
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vector_store = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma_db")
    return vector_store`,
        language: 'python'
      },
      {
        stepNumber: 3,
        title: 'Building the Contextual Q&A Chain',
        description: 'Query the vector database and stream accurate answers generated by GPT models.',
        codeSnippet: `from langchain_openai import ChatOpenAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

def create_rag_chain(vector_store):
    retriever = vector_store.as_retriever(search_kwargs={"k": 3})
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

    system_prompt = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer the question. "
        "If you don't know the answer, say that you don't know.\\n\\n"
        "Context: {context}"
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])

    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    return rag_chain`,
        language: 'python'
      }
    ],
    summary: 'With LangChain and vector stores, you can connect AI intelligence to proprietary knowledge in under 50 lines of Python code.'
  },
  {
    id: 'framer-motion-glassmorphism',
    title: 'Mastering Fluid Glassmorphism & Animations with Tailwind & Framer Motion',
    slug: 'framer-motion-glassmorphism',
    category: 'Web Development',
    level: 'Beginner',
    readTime: '8 min read',
    publishedDate: 'Jul 15, 2026',
    author: {
      name: 'Subhashree Barman',
      role: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    },
    icon: 'design',
    tags: ['CSS', 'Tailwind', 'Framer Motion', 'UI Design', 'Frontend'],
    shortDesc: 'Create ultra-modern frosted glass cards, glow effects, and physics-based page transitions for web applications.',
    overview: `Glassmorphism combined with subtle dynamic micro-animations transforms standard website components into luxury interactive elements.`,
    prerequisites: [
      'Basic understanding of HTML & CSS / Tailwind utility classes',
      'React project with framer-motion installed'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Creating the Glassmorphic Container Class',
        description: 'Combine backdrop-blur, linear gradients, and semi-transparent borders in CSS.',
        codeSnippet: `/* index.css or CSS Module */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
}`,
        language: 'css'
      },
      {
        stepNumber: 2,
        title: 'Building Interactive Animated Hover Cards',
        description: 'Use Framer Motion gestures for smooth spring physics hover and press interactions.',
        codeSnippet: `import { motion } from 'framer-motion';

export const AnimatedGlassCard = ({ title, description }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    className="glass-card rounded-3xl p-8 cursor-pointer relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-600/30 transition-colors duration-500" />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-300 text-sm">{description}</p>
  </motion.div>
);`,
        language: 'tsx'
      }
    ],
    summary: 'Subtle physics animations and clean glass backdrop effects create a premium, tactile feeling across web applications.'
  },
  {
    id: 'docker-github-actions-cicd',
    title: 'Containerizing Applications & Automated Deployment with Docker & GitHub Actions',
    slug: 'docker-github-actions-cicd',
    category: 'DevOps & Cloud',
    level: 'Beginner',
    readTime: '11 min read',
    publishedDate: 'Jul 10, 2026',
    author: {
      name: 'Pribrat Phukan',
      role: 'DevOps Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    icon: 'docker',
    tags: ['Docker', 'CI/CD', 'GitHub Actions', 'DevOps', 'Cloud'],
    shortDesc: 'Automate build, test, and container deployment pipelines using multi-stage Dockerfiles and GitHub workflows.',
    overview: `Containerization ensures that code runs identically across development, staging, and production environments. Learn how to set up efficient multi-stage Docker builds and automated CI/CD releases.`,
    prerequisites: [
      'Docker Desktop installed locally',
      'GitHub repository with code pushed',
      'Basic knowledge of command line tools'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Writing an Optimized Multi-Stage Dockerfile',
        description: 'Reduce Docker image size from 1GB+ down to under 150MB by separating build tools from production runtime.',
        codeSnippet: `# Stage 1: Dependencies & Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]`,
        language: 'dockerfile'
      },
      {
        stepNumber: 2,
        title: 'Creating GitHub Actions Workflow',
        description: 'Automatically trigger Docker builds and push images to GitHub Container Registry on push to main.',
        codeSnippet: `# .github/workflows/deploy.yml
name: Build and Push Docker Image

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and Push Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}/app:latest`,
        language: 'yaml'
      }
    ],
    summary: 'Multi-stage Dockerfiles combined with GitHub Actions provide zero-downtime automated deployments.'
  },
  {
    id: 'react-native-tailwind-mobile',
    title: 'Cross-Platform Mobile App Architecture with React Native & Tailwind (NativeWind)',
    slug: 'react-native-tailwind-mobile',
    category: 'Mobile Apps',
    level: 'Intermediate',
    readTime: '14 min read',
    publishedDate: 'Jun 28, 2026',
    author: {
      name: 'Binud Prasad',
      role: 'Mobile Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    icon: 'mobile',
    tags: ['React Native', 'Expo', 'NativeWind', 'Mobile', 'iOS', 'Android'],
    shortDesc: 'Build native iOS and Android apps with shared codebase using Expo Router and utility-first styling.',
    overview: `React Native with Expo Router and NativeWind lets developers build native mobile apps for iOS and Android using familiar web development patterns.`,
    prerequisites: [
      'Node.js 18+ and Expo CLI installed',
      'Expo Go app installed on iOS or Android test device'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Creating an Expo Project with NativeWind',
        description: 'Initialize an Expo Router app with Tailwind CSS styling configuration.',
        codeSnippet: `npx create-expo-app@latest my-mobile-app -t tabs
cd my-mobile-app

npm install nativewind tailwindcss react-native-reanimated
npx tailwindcss init`,
        language: 'bash'
      },
      {
        stepNumber: 2,
        title: 'Building Native Components with Tailwind Utility Classes',
        description: 'Style native View, Text, and Pressable components directly with className strings.',
        codeSnippet: `import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-900 justify-center items-center p-6">
      <Text className="text-3xl font-extrabold text-white text-center mb-4">
        Native Apps Made Simple
      </Text>
      <Text className="text-slate-400 text-center mb-8">
        Build high performance iOS & Android apps with React Native.
      </Text>
      <Pressable 
        onPress={() => router.push('/details')}
        className="bg-blue-600 active:bg-blue-700 px-8 py-4 rounded-2xl shadow-lg"
      >
        <Text className="text-white font-bold text-base">Get Started</Text>
      </Pressable>
    </View>
  );
}`,
        language: 'tsx'
      }
    ],
    summary: 'NativeWind eliminates style sheet verbosity and accelerates cross-platform mobile development.'
  }
];
