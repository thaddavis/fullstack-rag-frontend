This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## TLDR

NextJS webapp for "Fullstack R.A.G." course

## TIPS

- gcloud builds submit --config=cloudbuild.yaml --project fullstack-rag .

- gcloud run services replace service.yaml --region us-east1

- touch gcr-service-policy.yaml

- gcloud run services set-iam-policy fullstack-rag-nextjs-service gcr-service-policy.yaml --region us-east1
