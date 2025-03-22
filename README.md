# AI Chat Application

I spent time thinking about how I creatively wanted to approach this and decided that I will utilise Maihem's current theme to showcase the type and quality of solutions I would create if I get the opportunity to join you. I thoroughly enjoyed building this and as someone who is perfectionistic, I spent a bit more time on ensuring that the foundation of this application was very robust.

**The chat app can be accessed vie this link:** https://aichat9000.vercel.app/
*Note: for the purposes of ensuring to not incur any fees, the chatbot's OpenAI config has been disabled.*

## Features

### Core Functionality
- Real-time chat interface with AI responses powered by Azure OpenAI as per the specification.
- Persistent chat history using localStorage. I decided to use localstorage instead of Redis or a database due to the current scale of the MVP, but built it in a way which caters to easy conversion to such solutions.
- Conversation quality scoring and evaluation using a random number generator.

### User Interface Components

#### Menu Bar
- Minimalist side menu for essential actions which has space for more options.
- Quick access buttons for new chat and history toggle.
- Tooltip-enhanced navigation for better UX.

#### Chat Interface
- Dynamic message display with user/AI message differentiation.
- Auto-expanding textarea for message input.
- Automatic scroll-to-bottom on new messages.
- Message evaluation display with quality metrics.

#### Recent Chats Panel
- Collapsible panel for recent chats/chat history.
- Current chat overview with quality score and associated colour highlight for above and below 50%.
- Individual chat deletion.
- Bulk history clearing option.

## Technical Architecture

### Component Structure
- `Chat.tsx`: Main chat interface component
- `RecentsCard.tsx`: Chat history management component
- `Menu.tsx`: Navigation and controls component
- `Home.tsx`: Main page component managing state and layout

### State Management
- Uses React's useState for local state management.
- Implements useEffect for side effects and localStorage synchronization.
- Centralized chat state management through the Home component.

### Data Flow
```
Home
├── Menu (Controls)
├── RecentsCard (History)
└── Chat (Main Interface)
```

### Storage
- Utilizes localStorage for persistent chat storage
- Chat data structure:
  ```typescript
  interface StoredChat {
    id: string;
    messages: ChatMessage[];
    averageScore: number;
    createdAt: string;
    lastUpdated: string;
  }
  ```

## Design Decisions

### UI/UX
1. Dark Mode First
   - Implemented with a dark colour scheme matching that of other Maihem websites
   - High contrast for better readability
   - Accent colours for important actions (#ff8b7c, #de786a)

2. Three-Panel Layout
   - Menu: Compact side panel for essential actions
   - Chat History: Collapsible panel for recent conversations
   - Main Chat: Expandable chat interface

3. Visual Feedback
   - Quality scores with colour coding (green/red)
   - Tooltips for better feature discovery
   - Smooth transitions and hover states

### Technical Choices

1. Component Architecture
   - Modular design with clear separation of concerns
   - Props-based communication between components
   - Centralized state management in Home component

2. Performance Considerations
   - Efficient message rendering with unique keys
   - Scroll optimization for large chat histories
   - Debounced textarea resizing

3. Error Handling
   - Fallbacks for API failures
   - Clear error messaging
   - Persistent storage recovery

### AI Integration

1. Message Evaluation
   - Mocked quality scoring of AI responses
   - Percentage-based scoring system
   - Clear success/failure indicators
   - Mocked explanatory feedback for each response

2. Azure OpenAI Integration
   - Configurable endpoint and API settings
   - Error handling for API failures
   - Response formatting and processing

## Setup and Configuration

### Environment Variables
```
OPENAI_ENDPOINT=your_azure_endpoint
OPENAI_API_KEY=your_api_key
OPENAI_DEPLOYMENT=your_deployment_name
```

### Required Dependencies
- Next.js 13+
- React 18+
- Lucide React (for icons)
- Tailwind CSS (for styling)
- ShadcnUI components
