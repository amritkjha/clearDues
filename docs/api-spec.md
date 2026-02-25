# API Specification V1

## POST /invoices

Description:
Creates a new invoice and automatically schedules reminder jobs.

Request Body:
{
  "customerId": "uuid",
  "invoiceNumber": "string",
  "amount": number,
  "issueDate": "YYYY-MM-DD",
  "dueDate": "YYYY-MM-DD"
}

Validations:
- dueDate must be >= issueDate
- amount must be positive
- customer must belong to authenticated user

Response:
201 Created
{
  "invoiceId": "uuid"
}