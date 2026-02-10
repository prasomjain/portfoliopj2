export const userData = {
    personalInfo: {
        name: "Prasom Jain",
        title: "Full Stack Developer & AI Engineer",
        bio: "I believe meaningful work begins with intent and ends with impact. A curious learner and thoughtful creator, I explore ideas deeply and build technology with purpose aiming to leave impressions that endure beyond the first encounter.",
        contact: {
            email: "prasomwork@gmail.com",
            phone: "+91 8827913440",
            location: "Pune, Maharashtra",
            linkedin: "https://www.linkedin.com/in/prasom-jain-751682229/",
            github: "https://github.com/prasomjain",
            leetcode: "https://leetcode.com/u/Prasom01/",
            codeforces: "https://codeforces.com/profile/prasom01",
            codechef: "https://www.codechef.com/users/prasom_404"
        }
    },
    experience: [
        {
            company: "Xelron",
            role: "SDE–AI Intern (Remote)",
            duration: "06/2025– 08/2025",
            location: "Bengaluru, Karnataka",
            points: [
                "Built a reproducible LLM evaluation framework (Python, Docker) for automated large-scale model comparisons with A/B testing and statistical validation to enable data-driven model selection; ran 15 evaluation experiments.",
                "Automated end-to-end AI pipelines with telemetry and container orchestration, reducing manual effort by 40% and accelerating evaluation throughput for research and engineering teams."
            ]
        }
    ],
    education: [
        {
            institution: "Indian Institute of Information Technology (IIIT) Pune",
            degree: "Bachelor of Technology in Electronics and Communications Engineering",
            duration: "Expected June 2026",
            cgpa: "7.51 / 10"
        }
    ],
    projects: [
        {
            title: "Claim Query Assistant",
            category: "AI/ML",
            color: "#8a2be2", // Purple
            tech: ["FastAPI", "ChromaDB", "Google Gemini", "React", "TypeScript"],
            description: "RAG-based Claims Query System",
            points: [
                "Designed an async RAG pipeline using FastAPI and ChromaDB, delivering 320 ms median response latency at 200 RPS by batching embeddings, tuning workers, and parallelizing retrieval + generation.",
                "Improved answer accuracy by 28% and reduced hallucinations by 35% through chunked embeddings, relevance re-ranking, and source-grounded prompting validated on 200+ queries."
            ]
        },
        {
            title: "Streamify",
            category: "Full Stack",
            color: "#007bff", // Blue
            tech: ["MERN", "WebRTC", "Zustand", "Tailwind"],
            description: "Video Calling & Social Platform",
            points: [
                "Implemented a WebRTC-based real-time communication pipeline achieving <250 ms median call latency and 40% fewer call drops via ICE optimization and adaptive bitrate control.",
                "Reduced frontend CPU and network overhead by 60% using fine-grained Zustand state management, memoization, and code-splitting, improving session stability under load."
            ]
        },
        {
            title: "Rentiful",
            category: "Full Stack",
            color: "#007bff", // Blue
            tech: ["Next.js", "AWS (EC2, RDS, Amplify)", "PostgreSQL"],
            description: "Real Estate Marketplace",
            points: [
                "Built a cloud-native platform on AWS with CI/CD via Amplify, supporting 5k+ concurrent users and enabling zero-downtime deployments in <5 minutes.",
                "Cut API response time by 73% (450 ms → 120 ms) and reduced database load by 70% through query indexing, connection pooling, and Redis-based caching."
            ]
        },
        {
            title: "Market Impact Optimizer",
            category: "Quantitative",
            color: "#00dbde", // Cyan/Teal
            tech: ["Python", "CVXPY", "Pandas"],
            description: "Trade Execution Optimization",
            points: [
                "Designed an execution cost model incorporating temporary and permanent market impact to optimize large trade schedules.",
                "Formulated and solved a convex optimization problem to minimize implementation shortfall; benchmarked performance against TWAP/VWAP baselines.",
                "Built a reproducible data pipeline for trade simulation and backtesting, achieving 53% reduction in execution cost on synthetic market data."
            ]
        },
        {
            title: "Retailo",
            category: "Full Stack",
            color: "#007bff", // Blue
            tech: ["React", "Node.js", "Express", "REST APIs"],
            description: "Retail Data Management Platform",
            points: [
                "Built a full-stack retail analytics platform to efficiently query large datasets using search, filtering, sorting, and pagination.",
                "Implemented scalable backend APIs with Express.js, designing a deterministic query pipeline (search → filter → sort →paginate).",
                "Reduced payload size and improved response times by enforcing server-side pagination and optimized query handling."
            ]
        }
    ],
    skills: {
        languages: ["C++", "Python", "Java", "JavaScript", "TypeScript"],
        backend: ["FastAPI", "Node.js", "RESTful APIs", "Asynchronous Programming", "Object-Oriented Design", "System Design"],
        database: ["PostgreSQL", "MySQL", "MongoDB", "Vector Databases (ChromaDB)", "AWS (EC2, RDS, S3, Amplify)"],
        ai: ["Retrieval-Augmented Generation (RAG)", "Google Gemini API", "Semantic Search", "ETL Pipelines", "Data Processing (Pandas)"],
        devops: ["Docker", "Git", "GitHub Actions (CI/CD)", "Unit and Integration Testing", "Logging and Monitoring"]
    },
    achievements: [
        {
            title: "Competitive Programming",
            description: "Solved 450+ LeetCode problems and 800+ DSA problems across Codeforces, GFG, and CodeChef.",
            ratings: ["Codeforces — 1513 (Specialist)", "CodeChef — 1796 (4 Star)", "LeetCode — 1877 (Knight)"]
        },
        {
            title: "Adobe India Hackathon",
            description: "National Finalist (Top 1%). Built scalable, production-grade prototypes under time constraints."
        },
        {
            title: "Flipkart GRiD 7.0",
            description: "National Semi Finalist."
        },
        {
            title: "Robotics Competition (Cummins College)",
            description: "Winner (24,000 prize) for an automation system."
        },
        {
            title: "E-Summit ’24",
            description: "Marketing Manager, led data-driven outreach and engagement for 800+ participants."
        }
    ]
};
