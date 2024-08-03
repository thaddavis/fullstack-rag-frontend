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

The accompanying frontend repo for the "Retrieval Augmented Generation (RAG) with Pinecone" video on COMMAND's YouTube channel

## TIPS

- gcloud builds submit --config=cloudbuild.yaml --project procreate-426616 .

- gcloud artifacts repositories create procreate --repository-format docker --project procreate-426616 --location us-central1

- gcloud config set project procreate-426616

- gcloud builds submit --config=cloudbuild.yaml --project procreate-426616 .

- gcloud run services replace service.yaml --region us-east1

- touch gcr-service-policy.yaml

- gcloud run services set-iam-policy procreate-service gcr-service-policy.yaml --region us-east1
