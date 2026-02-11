OffTheFrame 🎨

Most portfolio projects show screens.
I wanted mine to show architecture 🚀

OffTheFrame is a curated art-print marketplace built to explore real-world tradeoffs in full-stack cloud architecture.

<img width="1496" height="738" alt="homepage" src="https://github.com/user-attachments/assets/0137ee2d-98e9-4414-8f23-3014651f5265" />

Under the hood, it’s a serverless e-commerce system designed with:
- Clear service boundaries
- Cost-aware infrastructure decisions
- Production-style delivery
- Intentional scalability

<img width="835" height="568" alt="Screenshot 2026-02-11 at 12 12 43 AM" src="https://github.com/user-attachments/assets/efcc6114-c768-4a6e-95e4-30068f88852b" />


🏗 Architecture

S3 → CloudFront → API Gateway → Lambda → DynamoDB

Provisioned entirely using AWS CDK (Infrastructure as Code).

Core Decisions

DynamoDB over RDS
Initially planned Postgres in a VPC, but for a portfolio-scale workload the cost and operational overhead weren’t justified.
Chose a lean, fully serverless approach instead.

Service separation

Products Lambda + Products DynamoDB

Orders Lambda + Orders DynamoDB
Clear boundaries, scalable patterns.

Anonymous identity model
Anonymous users receive a generated UID on first load.
This keeps sessions consistent and makes analytics-ready tracking possible.

Intent-based persistence
The shopping cart lives in React state while browsing.
Data is only persisted at checkout — reducing unnecessary API invocations.

🌍 Frontend & Delivery

Hosted in S3

Delivered via CloudFront CDN on a custom domain

Mobile-optimized UI

Built for fast, global delivery

📊 What’s Next

An analytics layer to close the loop:

Track engagement + cart funnels

Event-driven analytics Lambda

D3-powered visualizations

Conversion + behavior metrics

🔗 Links

Live Site:
https://offtheframe.nosenterprise.org
