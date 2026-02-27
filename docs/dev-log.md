## Day 1 – Backend Initialization

- Project initialized
- TypeScript configured
- Express base server created
- Centralized error handling added
- Environment variable management configured

## Day 2 – Database Layer

- Prisma initialized
- PostgreSQL connected
- Enums defined (InvoiceStatus, ReminderStage, ReminderJobStatus)
- Relational integrity configured with cascade deletes
- Index added on ReminderJob.scheduledFor
- Migration executed successfully
- Integrated Upstash Redis
- Resolved TypeScript module import issues
- Implemented explicit Redis initialization (initRedis)
- Avoided side-effect imports
- Verified stable connection before queue integration

## Day 3 – Validation Middleware Added

- Created centralized validate middleware.
- Integrated Zod-based request validation pattern.
- Ensured controller layer remains validation-free.