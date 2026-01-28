# Neural-Chat: High-Performance Fullstack AI Assistant
Neural-Chat is a sleek, modern chat application that bridges the gap between high-speed AI inference (Groq LPUs) and a robust enterprise-grade backend (.NET 10). It features a stunning Glassmorphism UI for a premium user experience.

https://github.com/user-attachments/assets/060836e4-febb-44b3-891f-92b5ac432897

# Tech Stack
### Frontend
- React 19 (TypeScript)
- Tailwind CSS (Custom Glassmorphism design system)
- Rich Content Support : Integrated react-markdown with GFM (tables) and react-syntax-highlighter (Prism).
- State Management : Real-time message history tracking.

### Backend
- ASP.NET Core 10 (High-performance Minimal APIs)
- C# 13
- SDK Interoperability : Configured the OpenAI SDK to communicate with Groq’s LPU endpoints.
- Asynchronous Design : Fully non-blocking I/O operations using async/await.

# Key Features
- Ultra-Low Latency : Leveraging Groq's LPU (Language Processing Unit) to deliver responses at speeds exceeding 500 tokens/sec.
- Context-Aware Memory : Maintains full conversation history, allowing the AI to reference previous exchanges.
- Glassmorphism UI : A modern aesthetic featuring backdrop blurs, semi-transparent borders, and fluid CSS animations.
- Developer Friendly : Full syntax highlighting for code blocks (C#, JS, Python, etc.) and formatted Markdown tables.
- Security-First: API keys are managed via environment variables to prevent accidental leaks.

# Installation & Setup
### 1. Backend (.NET)
```Bash
cd Backend
# Set your API Key in the environment
$env:GROQ_API_KEY="your_api_key_here" 
dotnet run
```
### 2. Frontend (React)
```Bash
cd Frontend
npm install
npm run dev
```

# Engineering Challenges & Wins
Building Neural-Chat allowed me to demonstrate several senior-level competencies :
- Vendor-Agnostic Integration : I implemented an interoperable backend that uses the OpenAI protocol to talk to third-party providers (Groq), showcasing flexibility in AI architecture.
- Advanced UI/UX Implementation : Beyond simple styling, I used React useRef and useEffect hooks to build a seamless auto-scrolling chat experience with a complex "Glass" visual layer.
- Modern .NET Paradigms : Used Minimal APIs and Record types in C# 13 to keep the codebase lean, fast, and highly maintainable.
- Data Consistency : Synchronized TypeScript interfaces with C# DTOs to ensure type safety across the entire stack.
