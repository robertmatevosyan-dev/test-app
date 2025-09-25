A Next.js app that demonstrates:

Next.js routing with four rendering strategies: SSR, SSG, ISR, CSR

API integration using jsonplaceholder.typicode.com

POST upload to a Next.js API Route (/api/upload)

WebSocket demo

## Getting Started

Install & Run

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production:
```bash
npm run build
npm start
```

Features Walkthrough
1) Routing & Rendering Modes

SSR: GET /ssr
Uses fetch(..., { cache: 'no-store' }) or export const dynamic = 'force-dynamic' to render on every request.

SSG: GET /ssg
Static generation at build time (default force-cache for static fetches).

ISR: GET /isr
Static generation with background revalidation.
Example: export const revalidate = 60.

CSR: GET /csr
Data fetched in the browser via useEffect / AbortController (hook usePostsCSR).

2) POST Upload API

POST /api/upload (App Router API Route)

Accepts FormData fields:

title: string (required)

file: file (required)

In the example, the API:

reads the file bytes

returns metadata (filename, mime, size) and a short sha256_16 hash

3) WebSocket Demo

/ws connects to a public echo server

Status indicator (connecting/open/closing/closed/error)

Send a message → receive the same message back


## How to Demo (Checklist)

Run dev server → open http://localhost:3000

Visit:

/ssr → refresh to see server-rendered fetch

/ssg → build (npm run build && npm start) to observe static output

/isr → watch it revalidate every 60s

/csr → client-side loading/error states

On /csr, Open modal → provide Title + File → Upload

See success, and check Uploads list

Visit /ws → type and Send → see the echo messages
