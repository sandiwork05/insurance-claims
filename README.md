# Sandhya Varganti Portfolio + Project Demos

This repository contains the main portfolio site and 5 standalone deployable demo applications.

## Folder Structure

```
Sandya_F1c/
├── app/                           # Main portfolio website
├── healthcare-portal-demo/        # Healthcare Member Portal demo
├── compliance-dashboard-demo/     # Compliance Dashboard demo
├── ecommerce-portal-demo/         # E-Commerce Sales Portal demo
├── insurance-claims-demo/        # Insurance Claims System demo
└── loan-origination-demo/        # Loan Origination System demo
```

## Portfolio (`app/`)

- **Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS + GSAP + Lenis
- **Run locally:**
  ```bash
  cd app
  npm install
  npm run dev
  ```
- **Build:** `npm run build` (outputs to `app/dist/`)

## Demos

Each demo is a self-contained Vite + React + TypeScript app with mock data.

### Run a demo locally
```bash
cd <demo-folder>
npm install
npm run dev
```

### Deploy to Vercel
1. Import the individual demo folder into [vercel.com](https://vercel.com).
2. Framework preset: **Vite**
3. Click **Deploy**.

### Deploy to Render (Static Site)
1. Create a new **Static Site** on [render.com](https://render.com).
2. Connect the repo and set the root directory to the demo folder.
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`

### Link demos to the portfolio
After deploying, paste the live demo URL into `app/src/config.ts` under the matching project's `demoHref`:

```ts
{
  name: "Healthcare Member Portal",
  // ...
  demoHref: "https://your-demo-url.vercel.app",
}
```

Then rebuild the portfolio:
```bash
cd app
npm run build
```

The "View Demo" button will automatically appear on that project's card.
