<p align="center"><img width="350" src=".github/readme-text-logo.svg" alt="Ticket Scout Logo"/>
<h3 align="center">Simplifying Ticketing with AI-Driven Precision</h3>
<div align="center">

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jonashonecker_TicketScout_backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jonashonecker_TicketScout_backend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jonashonecker_TicketScout_backend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jonashonecker_TicketScout_backend)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jonashonecker_TicketScout_backend&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jonashonecker_TicketScout_backend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jonashonecker_TicketScout_backend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jonashonecker_TicketScout_backend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jonashonecker_TicketScout_backend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jonashonecker_TicketScout_backend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jonashonecker_TicketScout_backend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jonashonecker_TicketScout_backend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jonashonecker_TicketScout_backend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jonashonecker_TicketScout_backend)

</div>
<hr>

## Description

Welcome to TicketScout, where we revolutionize the ticketing experience with cutting-edge AI technology.
Our platform simplifies the process of finding and managing tickets, leveraging MongoDB Atlas's powerful vector search
and OpenAI's advanced text-embedding models to deliver precise, relevant search results.

## Getting Started

### Prerequisites

- MongoDB Atlas account
- GitHub account for OAuth authentication
- OpenAI API key for text embeddings
- Render Account for CI/CD deployment

### Setup Guide

#### GitHub OAuth Configuration

- Navigate to "Settings" > "Developer settings" > "OAuth Apps" in your GitHub account.
- Click "New OAuth App", fill in the necessary details, and set `http://localhost:8080/login/oauth2/code/github` as the authorization callback URL.
- After creation, note down the Client ID and Secret.


#### MongoDB Atlas Vector Search

1. **Cluster and Database Setup**:
    - Sign up for MongoDB Atlas and create a cluster.
    - Create a `TicketScout` database and a `tickets` collection within it.

2. **Vector Search Index**:
    - Navigate to the "Search" tab in your cluster's page.
    - Create a new search index named `vector_index_titleAndDescription` using the JSON Editor, with the following configuration:
      ```json
      {
        "fields": [
          {
            "numDimensions": 3072,
            "path": "titleAndDescriptionEmbedding",
            "similarity": "cosine",
            "type": "vector"
          }
        ]
      }
      ```

## Local Development

To start hacking, you need to set the following environment variables:

| Name                        | Description                                                                                                   |
|-----------------------------|---------------------------------------------------------------------------------------------------------------|
| `OAUTH_GITHUB_ID`           | The Client ID from your GitHub OAuth application, used for user authentication.                               |
| `OAUTH_GITHUB_SECRET`       | The Client Secret from your GitHub OAuth application, required for secure OAuth flows.                        |
| `APP_URL`                   | The base URL where your application is accessible, crucial for OAuth redirects and service callbacks.         |
| `MONGODB_URI`               | Your MongoDB Atlas connection string, enabling database access for your application.                          |
| `OPENAI_EMBEDDING_BASE_URL` | The base URL for OpenAI's embedding API, facilitating text embedding operations for advanced search features. |
| `OPENAI_API_KEY`            | Your personal API key for accessing OpenAI services, necessary for utilizing AI-driven functionalities.       |

## CI/CD Configuration

Efficiently manage your CI/CD pipelines by setting up a `production` environment on GitHub and configuring the necessary secrets. These secrets are crucial for automating your deployment process
and ensuring secure access to your DockerHub account and Render deployment triggers.

| Name                 | Description                                                                                                                        |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------|
| `DOCKERHUB_USERNAME` | The username for your DockerHub account, used to authenticate with DockerHub in CI/CD scripts.                                     |
| `DOCKERHUB_PASSWORD` | The password for your DockerHub account, crucial for pushing and pulling Docker images securely.                                   |
| `DOCKERHUB_TAG`      | The tag for your Docker image, typically specifying the version or environment. `latest` is recommended for continuous deployment. |
| `RENDER_DEPLOY`      | The URL or webhook to trigger deployment on Render, integrating your CI/CD pipeline with Render's hosting services.                |

Remember to also configure the environment variables from the "Local Development" section in your Render environment settings.