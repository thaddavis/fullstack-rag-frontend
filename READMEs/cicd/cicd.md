# TLDR

CICD related info

- https://github.com/thaddavis/fullstack-rag-frontend/new/main?filename=.github%2Fworkflows%2Fgoogle-cloudrun-docker.yml&workflow_template=deployments%2Fgoogle-cloudrun-docker
- https://github.com/thaddavis/fullstack-rag-frontend/actions/new?category=none&query=Cloud+Run

## Copied in template workflow from below links

- https://github.com/thaddavis/fullstack-rag-frontend/actions/new?category=none&query=Cloud+Run

## Created Service Account in GCP

- https://console.cloud.google.com/iam-admin/serviceaccounts?hl=en&project=fullstack-rag
- https://console.cloud.google.com/iam-admin/serviceaccounts/details/101052429369532456148/keys?hl=en&project=fullstack-rag

## Add permissions to Service Account

- gcloud projects add-iam-policy-binding fullstack-rag \
  --member="serviceAccount:fullstack-rag-sa@fullstack-rag.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

- gcloud projects add-iam-policy-binding fullstack-rag \
  --member="serviceAccount:fullstack-rag-sa@fullstack-rag.iam.gserviceaccount.com" \
  --role="roles/run.developer"
