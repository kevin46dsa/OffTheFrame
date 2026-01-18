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
