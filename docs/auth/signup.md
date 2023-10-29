# DOCS

## Sign-up API

Endpoint : `POST /api/users`

Request Body :

```json
{
  "email": "email@email.com",
  "username": "username",
  "password": "secret"
}
```

Response Body Success :

```json
{
  {
    "message": "user created successfully",
    "user": {
        "id": 3,
        "email": "email@email.com",
        "username": "username",
        "role": "role",
        "createdAt": "2023-10-29T09:44:25.440Z",
        "updatedAt": "2023-10-29T09:44:25.440Z"
    }
}
}
```

Response Body Error :

```json
{
  "message": "message error!"
}
```
