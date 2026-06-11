Entre Lineas - Plataforma Artistica 
  
## Project Overview 
  
Entre Lineas es una plataforma web oficial del colectivo colombiano del mismo nombre, disenada para proyectar y difundir el talento colombiano (freestylers, m�sicos y artistas urbanos) mediante una experiencia web moderna, modular y dinamica. 
  
Basado en Manizales, Colombia, con mas de 25 ediciones de eventos documentados, la plataforma sirve como un hub central para: 
  
- Galeria de YouTube con videos y shorts del canal  
- Perfil detallado de artistas con filtros por rol  
- Documentacion de eventos con jueces, hosts y enlaces  
- Linea de tiempo animada de la historia del colectivo  
- Panel de administracion completo con CRUD de artistas y eventos 
  
## Technology Stack 
  
Technology Stack:  
- Framework: Next.js 16 (App Router, Server Components, Server Actions)  
- UI: React 19, CSS Modules, framer-motion 12  
- Backend: Supabase (PostgreSQL, Auth, Storage)  
- External API: YouTube Data API v3  
- Assets: sharp (image processing), react-icons  
- Virtualization: react-window (large list rendering optimization) 
  
## Project Structure 
  
The project follows Feature-Sliced Design (FSD) for better organization and scalability:  
  
src/  
��� app/                  # Routes, layouts, API routes, Server Actions  
�   ��� actions/          # Server Actions (auth, artist, event CRUD)  
�   ��� api/              # Internal framework API Routes  
�   ��� admin/            # Administration panel  
��� components/           # Public components + UI system  
�   ��� ui/               # Design System (Button, Card, Input, etc.)  
��� entities/             # Types, models and domain data  
�   ��� artist/           # Types, model, data of artists  
�   ��� event/            # Types and model of events  
�   ��� user/             # User types  
�   ��� youtube-video/     # Types of videos  
��� features/             # Business logic (services, API, hooks)  
�   ��� artists/          # Services, API of artists  
�   ��� auth/             # Services, API of authentication  
�   ��� events/           # Event services  
�   ��� youtube/          # API, hooks of YouTube  
��� shared/               # Shared utilities  
�   ��� api/             # Supabase clients (anon, server)  
�   ��� hooks/           # Generic hooks (useInterval, useMediaQuery)  
�   ��� styles/          # Global styles  
�   ��� ui/              # Shared UI components (VirtualizedGrid)  
�   ��� utils/           # Utilities (imageUtils)  
docs/                     # Detailed documentation  
public/                 # Public assets  
��� artists/              # Artist images  
��� fonts/                # Typography (CloisterBlack)  
��� data/                 # JSON of artists (production fallback)  
supabase/             # Supabase configuration  
��� migrations/           # SQL schema 
  
## Key Features 
  
- YouTube Gallery - Videos and shorts from the channel with automatic highlights (most viral, liked, commented)  
- Artists Section - Grid with role filters, detail modal, photos, biographies and social networks (virtualized for >50 items)  
- Events Section - 25 documented editions with judges, hosts and Instagram/YouTube links (virtualized for >50 items)  
- History Section - Animated timeline (Origins, Philosophy, Structure, Vision)  
- Admin Panel - Complete CRUD for artists and events with Supabase authentication (virtualized grids)  
- Dark UI - Dark design with glassmorphism, Cloister + Esteban typography  
- Responsive - Desktop-first with mobile menu, touch carousels, adaptive grids  
- Performance - List virtualization with react-window for large datasets 
  
## Routes 
  
Routes:  
- /: Landing page (hero, gallery, artists, events, contact, footer)  
- /admin: Login / Dashboard / CRUD artists and events / Branding showcase 
  
## Development Conventions 
  
### Code Organization  
- Feature-Sliced Design (FSD): Code organized by features rather than types  
- Server-First Approach: Maximum use of Server Components for data fetching  
- Type Safety: Strict TypeScript usage throughout  
- Component Separation: Clear division between public components and UI system 
  
### Styling Conventions  
- Dark Theme: Primary background is absolute black (rgba(0, 0, 0, 1))  
- Color Variables: CSS custom properties for consistent theming  
- Typography:  
  - --font-main: Esteban (body text)  
  - --font-title: Cloister (headings)  
- Component Styling: CSS Modules with descriptive class names  
- Dark UI Elements: Glassmorphism effects, subtle shadows and borders 
  
### Data Flow  
1. Server Components: Fetch data directly from Supabase using Server Actions  
2. Client Components: Handle interactivity (forms, galleries, modals, animations)  
3. Server Actions: Secure mutations (authentication, CRUD operations)  
4. API Routes: Legacy endpoints and YouTube proxy (protects API key) 
  
  
- Admin Protection: admin routes require authentication 
  
### Image Handling  
- Processing: Sharp library for server-side image optimization  
- Storage: Supabase Storage bucket for artist profiles  
- Formats: WebP conversion with 90% quality, 640x800 dimensions  
- Fallbacks: Static JSON data for production resilience 
  
## Setup and Installation 
  
### Prerequisites  
- Node.js 18+  
- npm or yarn  
- Supabase account  
- YouTube Data API key (for production) 
  
### Installation Steps  
1. Clone the repository  
2. Install dependencies  
3. Configure environment variables  
4. Set up Supabase 
  
### Development Commands  
- npm run dev: Start development server (next dev)  
- npm run build: Build for production (next build)  
- npm run start: Start production server (next start)  
- npm run lint: Run ESLint (next lint)  
- npm run db:link: Link Supabase project  
- npm run db:push: Push database schema  
- npm run db:seed: Seed database with initial data  
- npm run deploy: Deploy to Vercel  
- npm run deploy:prod: Deploy to Vercel production 
  
## Database Schema 
  
### Artists Table  
- id: BIGINT PK (Auto-generated)  
- name: TEXT NOT NULL (real name)  
- org_role: TEXT[] (Organization roles: Judge, Host, Founder)  
- image: TEXT (Profile image URL)  
- image_position: TEXT (Vertical position, default: '50%')  
- profession: TEXT (Profession/Occupation)  
- origin: TEXT (Place of origin)  
- trajectory: TEXT (Time in scene, e.g., 'Since 2019')  
- bio: TEXT[] (Biography paragraphs)  
- socials: JSONB (Social media links)  
- created_at: TIMESTAMPTZ (Default NOW())  
- created_by: UUID (FK  auth.users(id)) 
  
### Events Table  
- id: BIGINT PK (Edition number)  
- title: TEXT NOT NULL (event title)  
- date: TEXT NOT NULL (event date)  
- location: TEXT (Event location)  
- post_url: TEXT (Instagram post URL)  
- youtube_link: TEXT (YouTube video URL)  
- judges: JSONB (Array of judge objects)  
- host: JSONB (Array of host objects)  
- created_at: TIMESTAMPTZ (Default NOW()) 
  
### Storage Buckets  
- artists: Artist profile images (Public read, Admin write) 
  
## API Endpoints 
  
### YouTube Proxy  
- GET /api/youtube: Proxy for YouTube Data API v3  
  - Returns shorts, videos, subscriber count, and highlights  
  - Uses mock data in development to save quota  
  - Protects API key from client exposure 
  
### Legacy Admin API (being replaced by Server Actions)  
- POST /api/admin/login: Legacy username/password login  
- POST /api/admin/password/reset: Password reset request  
- POST /api/admin/password/update: Password update  
- CRUD /api/admin/artists: Artist management (legacy)  
- POST /api/admin/upload: Image upload with sharp processing 
  
### Server Actions (Preferred for Mutations)  
- loginAction: Supabase Auth login  
- logoutAction: Supabase Auth logout  
- createArtistAction: Create artist (with optional image upload)  
- updateArtistAction: Update artist  
- deleteArtistAction: Delete artist  
- createEventAction: Create event 
  
## Environment Variables 
  
### Environment Variables  
- NEXT_PUBLIC_SUPABASE_URL: Supabase project URL (Required)  
- NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase anon key (Required)  
- SUPABASE_SERVICE_ROLE_KEY: Supabase service role key (Required)  
- YOUTUBE_API_KEY: YouTube Data API v3 key (Required for production)  
- YOUTUBE_CHANNEL_ID: YouTube channel ID (Required for production)  
- NEXT_PUBLIC_SITE_URL: Site URL for email templates (Recommended)  
- YOUTUBE_SKIP_MOCK: Use real API in dev if true (Optional) 
  
## Design System 
  
### Color Palette  
- --color-dark: Absolute black (rgba(0, 0, 0, 1)) - Main background  
- --color-white: Pure white (rgba(255, 255, 255, 1)) - Text and highlights  
- --color-grey-dark: Dark gray (rgba(68, 68, 68, 1)) - Borders and separators  
- --color-grey-light: Light gray (rgba(146, 144, 144, 1)) - Block backgrounds and hover 
  
### Typography  
- Main Font: Esteban (body text)  
- Title Font: Cloister Black (headings)  
- Weights: Regular, Medium, Bold, Black variants 
  
### Component Guidelines  
- Cards: Semi-transparent background (rgba(255, 255, 255, 0.02)) with subtle borders  
- Buttons: Polymorphic (link/anchor/button) with variants and sizes  
- Modals: Centered with backdrop and escape key handling  
- Forms: Label-input pairs with validation states  
- Navigation: Sticky header with desktop/mobile menu variants  
- VirtualizedGrid: Generic 2D grid virtualization (react-window) for large datasets (>50 items), configurable columns/item dimensions/overscan 
  
### Responsive Design  
- Base Styles: Desktop-first approach  
- Mobile Breakpoint: @media (max-width: 767px)  
- Patterns:  
  - Desktop: Grid layouts  
  - Mobile: Horizontal carousels  
  - Menus: Hidden by default on desktop, overlay on mobile 
  
## Testing and Quality Assurance 
  
### Code Quality  
- Linting: ESLint with Next.js and TypeScript configurations  
- Type Checking: TypeScript strict mode enabled  
- Formatting: Consistent code formatting via editor configuration 
  
### Testing Strategy  
- Unit Testing: Jest for utility functions and hooks  
- Integration Testing: React Testing Library for component interactions  
  
### Testing Strategy  
- Unit Testing: Jest for utility functions and hooks  
- Integration Testing: React Testing Library for component interactions  
- E2E Testing: Playwright for critical user flows (planned)  
- Manual Testing: Browser testing for responsive design and interactions 
  
### Performance Optimization  
- Image Optimization: Sharp processing and Next.js image component  
- Code Splitting: Automatic route-based splitting  
- Lazy Loading: Images and non-critical components  
  
### Performance Optimization  
- Image Optimization: Sharp processing and Next.js image component  
- Code Splitting: Automatic route-based splitting  
- Lazy Loading: Images and non-critical components  
- Caching: SWR/stale-while-revalidate for data fetching  
- Server Components: Minimize client-side JavaScript  
- List Virtualization: react-window Grid component for large datasets (>50 items), renders only visible viewport items 
  
## Deployment 
  
### Platform  
Optimized for Vercel with:  
- Serverless functions for YouTube proxy  
- Native support for Server Actions and Server Components  
- Edge configuration for global distribution  
- Environment variable management 
  
### Deployment Process  
1. Push to main branch triggers Vercel deployment  
2. Environment variables configured in Vercel dashboard  
3. Automatic builds on push to preview/production branches  
4. Custom domain configuration available 
  
## Contributing Guidelines 
  
### Code Style  
- Follow existing TypeScript and CSS Module patterns  
- Use descriptive variable and function names  
- Keep components small and focused  
- Add JSDoc comments for complex functions  
- Follow Next.js App Router conventions 
  
### Git Workflow  
- Create feature branches from main  
- Use descriptive commit messages  
- Pull requests require review before merging  
- Maintain clean, linear history 
  
### Documentation  
- Update README.md for user-facing changes  
- Update documentation in /docs for technical changes  
- Keep BLACKBOX.md updated for AI agent context  
- Document environment variables and setup procedures 
  
## Troubleshooting 
  
### Common Issues  
1. Supabase Connection Errors  
   - Verify environment variables are correct  
   - Check Supabase project status  
   - Ensure service role key has proper permissions  
2. YouTube API Quota Exceeded  
   - Check YOUTUBE_SKIP_MOCK setting  
   - Monitor API usage in Google Cloud Console  
   - Consider upgrading YouTube API quota  
3. Image Upload Failures  
   - Verify Supabase Storage bucket policies  
   - Check file size and type restrictions  
   - Ensure proper authentication for upload actions  
4. Build Failures  
   - Clear .next cache and retry  
   - Update dependencies if version conflicts  
   - Check TypeScript errors in terminal 
  
### Debugging Tips  
- Use console.log in Server Actions for server-side debugging  
- Use React DevTools for client-side component inspection  
- Check Network tab for API requests and responses  
- Verify environment variables at runtime with process.env 
  
## Future Enhancements 
  
### Planned Features  
- Artist subscription and notification system  
- Event ticketing integration  
- Advanced analytics dashboard  
- Multi-language support (Spanish/English)  
- Community features (comments, likes, sharing)  
- Mobile application (React Native) 
  
### Technical Improvements  
- Migration to Supabase Edge Functions  
- Implementation of WebSockets for real-time updates  
- Addition of automated testing suite  
- Performance monitoring and logging  
- Accessibility audits and WCAG compliance 
  
---  
## Recent Updates (from other agent session)

- Fixed Supabase Client Initialization in `src/shared/api/supabase.ts`:
  - Replaced problematic proxy pattern that returned mock functions when credentials were missing
  - Fixed "select is not a function" errors by implementing proper client initialization
  - Added proper error handling for missing Supabase credentials
  - Ensured Edge Runtime compatibility by removing unsupported proxy usage
  
- Updated Auth Configuration in `src/auth.config.ts`:
  - Fixed NextAuth.js configuration for Next.js 16 App Router compatibility
  - Properly configured Supabase provider with correct client methods
  
- Enhanced Auth Utilities in `src/lib/auth-utils.ts`:
  - Improved session handling and token management
  - Fixed Edge Runtime compatibility issues

---  
*Document last updated: June 11, 2026*  
*For AI agent context and understanding*  
*For AI agent context and understanding* 
