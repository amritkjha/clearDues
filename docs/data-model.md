# Data Model V1

## User
Description:
Represents a business owner using the system.

Fields:
- id (UUID, PK)
- email (string, unique)
- passwordHash (string)
- businessName (string)
- defaultCreditDays (integer)
- createdAt (timestamp)

Relations:
- hasMany Customers
- hasMany Invoices
- hasMany ReminderSchedules

---

## Customer
Description:
Represents a client who receives invoices.

Fields:
- id (UUID, PK)
- userId (UUID, FK -> User)
- name (string)
- email (string)
- customCreditDays (integer, nullable)
- createdAt (timestamp)

Relations:
- belongsTo User
- hasMany Invoices

---

## Invoice
Description:
Represents a bill issued to a customer that requires payment tracking and automated reminders.

Fields:
- id (UUID, PK)
- userId (UUID, FK -> User)
- customerId (UUID, FK -> Customer)
- invoiceNumber (string)
- amount (decimal(12,2))
- issueDate (date)
- dueDate (date)
- status (enum: Pending | Paid | Disputed | PromiseToPay)
- createdAt (timestamp)
- updatedAt (timestamp)

Relations:
- belongsTo User
- belongsTo Customer
- hasMany ReminderJobs

Business Rules:
- dueDate must be >= issueDate
- status defaults to Pending
- When status becomes Paid, all scheduled ReminderJobs must be cancelled
- Upon invoice creation, ReminderJobs must be generated based on the user's ReminderSchedule.
- ReminderJobs must not be generated retroactively.
- If dueDate is updated, all Scheduled ReminderJobs must be recalculated.

---

## ReminderSchedule
Description:
Defines default reminder timing rules configured by the user.

Fields:
- id (UUID, PK)
- userId (UUID, FK -> User)
- stage (enum: BeforeDue | OnDue | AfterDue1 | AfterDue2)
- daysOffset (integer)
- createdAt (timestamp)

Explanation:
- daysOffset is relative to dueDate.
- Negative value = before due date.
- 0 = on due date.
- Positive value = after due date.

Relations:
- belongsTo User

Business Rules:
- Each user can have only one ReminderSchedule per stage.
- daysOffset must be unique per stage per user.

---

## ReminderJob
Description:
Represents a scheduled reminder instance for a specific invoice.

Fields:
- id (UUID, PK)
- invoiceId (UUID, FK -> Invoice)
- stage (enum: BeforeDue | OnDue | AfterDue1 | AfterDue2)
- scheduledFor (timestamp)
- sentAt (timestamp, nullable)
- status (enum: Scheduled | Sent | Failed | Cancelled)
- failureReason (string, nullable)
- createdAt (timestamp)
- updatedAt (timestamp)

Relations:
- belongsTo Invoice

Business Rules:
- scheduledFor is calculated using dueDate + daysOffset from ReminderSchedule.
- If invoice status becomes Paid, all ReminderJobs with status Scheduled must change to Cancelled.
- A reminder cannot be sent twice for the same stage.