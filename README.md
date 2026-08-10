# Pipeline

An agentic capture assistant demo. Built as an application artifact for Govly (govly.com, YC S21). Not affiliated with Govly.

Live: [placeholder — deploy to Vercel]

## What it is

A scripted demo of how I'd think about agentic capture UX for government contractors. A mock IT infrastructure VAR (Meridian Systems) has an agent watching incoming solicitations. The agent filters by vehicle and NAICS fit, pulls agency award history, scores each opportunity with visible reasoning, drafts a capture summary for the best match, and stops at a human gate.

No LLM calls. No API keys. All data is hardcoded in TypeScript. The demo runs entirely in the browser.

The point is the design decisions: every step is expandable, low confidence gets flagged not hidden, and nothing advances past the gate without an explicit human action.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build  # should pass clean
```

## Who I am

Mike Battaglia. Staff Product Engineer. I build agentic systems in production on my own time: a home infrastructure agent managing real services, trading bots with kill switches. I applied for the Product Engineer role at Govly and built this instead of a cover letter.

- GitHub: [github.com/mikebatts](https://github.com/mikebatts)
- Site: [mikebatts.net](https://mikebatts.net)
- LinkedIn: [linkedin.com/in/mikebatts](https://www.linkedin.com/in/mikebatts/)
- Email: mbattaglia92@gmail.com
