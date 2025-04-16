# GraphQL Profile Page

## Project Overview
A personal profile page that displays your Reboot01 school information using GraphQL queries. This project connects to the school's GraphQL API to fetch and visualize your academic journey.

## Objectives
- Create a profile UI displaying your school information
- Implement a login page with JWT authentication
- Generate interactive SVG statistics graphs
- Host the application online

## Key Features
- **Authentication**: Login with username/password or email/password
- **Profile Data**: Display user identification, XP, grades, audits, and skills
- **SVG Statistics**: Interactive graphs showing:
  - XP earned over time
  - Project success ratio
  - Audit statistics
  - And more!
- **Responsive Design**: Clean UI following good design principles

## Technical Details
- **API Endpoint**: https://learn.reboot01.com/api/graphql-engine/v1/graphql
- **Authentication**: JWT via https://learn.reboot01.com/api/auth/signin
- **Data Sources**: User, Transaction, Progress, Result, and Object tables
- **Technologies**: JavaScript, GraphQL, SVG

## Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm start

# Use the public URL
https://3lishaker.github.io/
```

## Author
- Ali Meshaimea (ameshaim)