# Contact book Node REST API

## Overview

This is a Node.js REST API contact book.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Docker (if using Docker Compose)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/s-rybak/goit-node-rest-api
   ```

2. Navigate to the project directory:

   ```sh
   cd goit-node-rest-api
   ```

3. Install the dependencies:
   ```sh
   ./install.sh
   ```

## Running the Application

### Using npm

1. Start the application:
   ```sh
   npm start
   ```

### Using Docker Compose

1. Start the application with Docker Compose:
   ```sh
   ./run.sh
   ```

## API Endpoints

### Base URL: `/api/contacts`

#### 1. Get All Contacts

- **Endpoint**: `GET /api/contacts/`
- **Description**: Retrieves a list of all contacts.
- **Response**: An array of contact objects.

#### 2. Get One Contact

- **Endpoint**: `GET /api/contacts/:id`
- **Description**: Retrieves a single contact by its ID.
- **Parameters**:
  - `id`: The ID of the contact to retrieve.
- **Response**: The contact object with the specified ID.

#### 3. Create a New Contact

- **Endpoint**: `POST /api/contacts/`
- **Description**: Creates a new contact.
- **Request Body**:
  - The body should contain the contact details json.

```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "phone": "5551234567"
}
```

- **Response**: The newly created contact object.

#### 4. Update an Existing Contact

- **Endpoint**: `PUT /api/contacts/:id`
- **Description**: Updates an existing contact by its ID.
- **Parameters**:
  - `id`: The ID of the contact to update.
- **Request Body**:
  - The body should contain the updated contact details json.

```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "phone": "5551234567"
}
```

- **Response**: The updated contact object.

#### 5. Delete a Contact

- **Endpoint**: `DELETE /api/contacts/:id`
- **Description**: Deletes a contact by its ID.
- **Parameters**:
  - `id`: The ID of the contact to delete.
- **Response**: A message indicating the contact has been successfully deleted.

## Request and Response Examples

### Get All Contacts

**Request**:

```http
GET /api/contacts HTTP/1.1
Host: example.com
```

**Response**:

```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890"
  },
  {
    "id": "2",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "098-765-4321"
  }
]
```

### Get One Contact

**Request**:

```http
GET /api/contacts/1 HTTP/1.1
Host: example.com
```

**Response**:

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890"
}
```

### Create a New Contact

**Request**:

```http
POST /api/contacts HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "phone": "5551234567"
}
```

**Response**:

```json
{
  "id": "3",
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "phone": "5551234567"
}
```

### Update an Existing Contact

**Request**:

```http
PUT /api/contacts/1 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.updated@example.com",
  "phone": "1234567890"
}
```

**Response**:

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.updated@example.com",
  "phone": "1234567890"
}
```

### Delete a Contact

**Request**:

```http
DELETE /api/contacts/1 HTTP/1.1
Host: example.com
```

**Response**:

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john.updated@example.com",
  "phone": "1234567890"
}
```

## License

This project is licensed under the terms of the [LICENSE](LICENSE).
