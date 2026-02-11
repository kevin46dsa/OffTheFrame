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





## 📊 Analytics Architecture (Cost-Aware by Design)

This project is built as an **analytics-first e-commerce backend** with an emphasis on **cost efficiency, predictable performance, and intentional scalability**.

Rather than introducing always-on infrastructure (e.g. relational databases or search engines) upfront, analytics are powered by **pre-computed metrics stored in DynamoDB**, allowing the system to remain effectively **cost-free when idle** while still supporting real-world usage analytics.

---

## 👤 User-Centric Analytics Model

Analytics are modeled around **user identity**, not organizations.

- **Authenticated users** are identified by a stable user ID
- **Anonymous users** are assigned a generated UID stored in local storage
- Both identifiers are treated uniformly at the analytics layer

This enables consistent tracking across:
- Anonymous browsing sessions
- Authenticated user activity
- Conversion and engagement flows

---

## ⚙️ Why DynamoDB for Analytics?

Traditional analytics stacks often rely on always-running databases or search engines, which introduce a **fixed baseline cost** regardless of traffic.

This system instead adopts a **write-time aggregation model**:

- Metrics are **computed when events occur**
- Data is **modeled around known access patterns**
- Queries are **bounded and predictable**
- There is **no always-on compute**

DynamoDB’s on-demand pricing model enables low-latency queries while keeping operational costs near zero at small scale.

---

## 🧱 Analytics Data Model

Analytics are stored as **pre-aggregated, time-partitioned metrics per user**.

### Access Pattern
```
Fetch usage metrics for a user over a date range
```

### Table Design
- **Partition Key:** `USER#<userId | anonymousUid>`
- **Sort Key:** `DAY#YYYY-MM-DD`

---

## 📈 Scaling Path (When Usage Increases)

As analytics volume or query complexity grows, the system can evolve incrementally:

1. Introduce raw event ingestion alongside pre-aggregated metrics
2. Stream events into Elasticsearch / OpenSearch for advanced analytics
3. Offload complex aggregations and segmentation queries to a search engine
4. Retain DynamoDB for fast, high-confidence user metrics

This phased approach avoids premature infrastructure complexity while keeping a clear path to advanced analytics when scale justifies it.

---

## 🏗️ Architectural Summary

```
Client (Authenticated or Anonymous)
        ↓
API Gateway
        ↓
Lambda Functions
        ↓
DynamoDB (Pre-Aggregated User Metrics)
```

**Design Principle:**  
> Optimize for correctness and cost at low scale, and introduce complexity only when usage demands it.
