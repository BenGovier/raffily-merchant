# Raffily Merchant Platform - Developer Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Project Structure](#project-structure)
3. [Authentication System](#authentication-system)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Schema](#database-schema)
7. [Key Features](#key-features)
8. [Demo Account](#demo-account)
9. [Admin Access](#admin-access)
10. [Deployment & Environment](#deployment--environment)
11. [Troubleshooting](#troubleshooting)

## System Overview

The Raffily Merchant Platform is a Next.js application that allows merchants to create and manage raffles, collect entries, and analyze performance. The platform uses MongoDB for data storage and includes features like authentication, raffle management, analytics, and a demo mode.

### Architecture Diagram

\`\`\`mermaid title="System Architecture" type="diagram"
graph TD;
    A["Client Browser"] --> B["Next.js Frontend"]
    B --> C["Next.js API Routes"]
    C --> D["MongoDB Database"]
    B --> E["Server Components"]
    E --> D
    F["Authentication Context"] --> B
    F --> C
