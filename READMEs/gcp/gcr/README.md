# TLDR

Documenting process of deploying this Next.js webapp to GCP

##

- `docker build -t fullstack-rag-nextjs .` √
- `docker run -p 3000:3000 fullstack-rag-nextjs`
- `gcloud config list`
- `gcloud projects list`
- `gcloud config set project fullstack-rag` && `gcloud auth application-default set-quota-project fullstack-rag`
- `gcloud services enable serviceusage.googleapis.com` <!-- Use the following command to enable the Service Usage API -->
- `gcloud services list --enabled`

##

- gcloud artifacts repositories create REPOSITORY \
   --repository-format=docker \
   --location=LOCATION \
   --description="DESCRIPTION" \
   --immutable-tags \
   --async

- `gcloud services enable compute.googleapis.com`
- `gcloud compute regions list`
- `gcloud services enable artifactregistry.googleapis.com`
- gcloud artifacts repositories create fullstack-rag-nextjs \
   --repository-format=docker \
   --location=us-central1 \
   --description="Docker repository for Fullstack R.A.G. course NextJS microservice" \
   --immutable-tags \
   --async

- `gcloud artifacts repositories list`
-

## Cloud Build

- https://cloud.google.com/build/docs/build-push-docker-image#build_an_image_using_a_build_config_file
- `gcloud builds submit --region=us-central1 --config cloudbuild.yaml`
- `gcloud services enable cloudbuild.googleapis.com`
- `gcloud services list --enabled`

## Cloud Run

- `gcloud services enable run.googleapis.com`
- `gcloud services list --enabled`
- `gcloud run services replace service.yaml --region us-east1`

- `gcloud run services get-iam-policy fullstack-rag-nextjs-service --region us-east1`
