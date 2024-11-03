# GROOVY MUSIC - Deliverable 1

## Project Overview
I made use of Express(backend) and React (frontend) to create the skeleton for the Groovy website. This was hard. 

## Prerequisites
- Docker
- Node.js (for local development)

## How to Build and Run the Docker Image

### 1. Build Docker Image
To build the Docker image, run the following command in the project root directory:

```bash
docker build -t groovy-image .

to run it 
docker run -p 3000:3000 groovy-image
