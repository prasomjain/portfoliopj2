export const userData = {
    personalInfo: {
        name: "Prasom Jain",
        title: "Engineer × Product Builder",
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
            company: "Tuskira",
            role: "Software Engineer Intern",
            duration: "04/2026 – Present",
            location: "Remote",
            points: [
                "Building AI-driven security workflows on the Claude Agent SDK with custom MCP servers for automated threat intelligence enrichment.",
                "Developed event-driven pipelines with FastAPI, Redpanda, ClickHouse, and Neo4j for real-time alert processing and case tracking.",
                "Engineered autonomous agents that enrich, correlate, and investigate zero-day vulnerability alerts end to end.",
                "Implemented observability with Langfuse and OpenTelemetry to trace agent execution and debug complex workflows."
            ]
        }
    ],
    education: [
        {
            institution: "Indian Institute of Information Technology (IIIT) Pune",
            degree: "Bachelor of Technology in Electronics and Communications Engineering",
            duration: "June 2026",
            cgpa: "7.56 / 10"
        }
    ],
    projects: [
        {
            title: "Zero-Day Investigation Agent (ZIA)",
            category: "AI/ML",
            tech: ["Python", "FastAPI", "Claude Agent SDK", "Kafka (Redpanda)", "ClickHouse", "Neo4j", "Docker"],
            description: "Agentic Zero-Day Investigation Pipeline",
            github: "https://github.com/prasomjain/ZIA",
            points: [
                "Built a production-style, event-driven ingestion pipeline (FastAPI, Redpanda/Kafka, ClickHouse) that accepts raw vulnerability alerts from arbitrary third parties via secured webhook, normalizes them, and deduplicates via SHA-256 fingerprinting on an append-only ReplacingMergeTree store.",
                "Engineered an autonomous investigation agent on the Claude Agent SDK with two custom stdio MCP servers integrating NVD, EPSS, CISA KEV, GitHub PoC search, and MITRE ATT&CK for end-to-end enrichment, correlation, and executive reporting.",
                "Designed a 6-signal Composite Priority Score (CVSS, EPSS, KEV, public exploits, asset exposure, threat actors) with severity banding, live investigation streaming to a React UI via SSE, and DLQ-based failure recovery."
            ]
        },
        {
            title: "ERP Graph Context Dashboard",
            category: "AI/ML",
            tech: ["Python", "Knowledge Graph", "Natural Language Querying", "Vercel"],
            description: "Contextual Graph over ERP Data",
            github: "https://github.com/prasomjain/graph-system",
            live: "https://graph-system.vercel.app/",
            points: [
                "Transformed fragmented ERP JSONL exports into a contextual knowledge graph, connecting scattered business records into a single queryable structure.",
                "Enabled natural-language querying over the graph so business flows can be explored conversationally instead of through manual data digging.",
                "Built a live dashboard that visually traces business flows through the graph in real time."
            ]
        },
        {
            title: "Claim Query Assistant",
            category: "AI/ML",
            color: "#8a2be2", // Purple
            tech: ["FastAPI", "ChromaDB", "Google Gemini", "React", "TypeScript"],
            description: "RAG-based Claims Query System",
            github: "https://github.com/prasomjain/insurance-rag-assistant",
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
            github: "https://github.com/prasomjain/ChatMate",
            live: "https://chatmate-5cz8.onrender.com/login",
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
            github: "https://github.com/prasomjain/market-impact-optimizer",
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
            github: "https://github.com/prasomjain/Retailo",
            live: "https://retailo-frontend.vercel.app/",
            points: [
                "Built a full-stack retail analytics platform to efficiently query large datasets using search, filtering, sorting, and pagination.",
                "Implemented scalable backend APIs with Express.js, designing a deterministic query pipeline (search → filter → sort →paginate).",
                "Reduced payload size and improved response times by enforcing server-side pagination and optimized query handling."
            ]
        }
    ],
    skills: {
        languages: ["C++", "Python", "Java", "JavaScript", "SQL"],
        backend: ["FastAPI", "Node.js", "Express.js", "REST APIs", "Asynchronous Programming", "System Design"],
        frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        databases: ["PostgreSQL", "MongoDB", "ChromaDB (Vector DB)", "ClickHouse", "Neo4j", "Redpanda (Kafka)", "AWS (EC2, RDS, S3)"],
        ai: ["RAG", "MCP Servers", "Agentic Workflows (Claude Agent SDK)", "Google Gemini API", "Semantic Search", "Langfuse", "OpenTelemetry", "Prompt Design"],
        tools: ["Git", "GitHub Actions (CI/CD)", "Docker", "Postman", "Unit & Integration Testing"],
        soft: ["Communication", "Teamwork & Collaboration", "Leadership"]
    },
    achievements: [
        {
            title: "Competitive Programming",
            description: "Solved 450+ LeetCode problems and 800+ DSA problems across Codeforces, GFG, and CodeChef.",
            ratings: ["Codeforces — 1513 (Specialist)", "CodeChef — 1800 (4 Star)", "LeetCode — 1877 (Knight)"]
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
