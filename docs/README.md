# Kalbe Nutritionals Notes API

> API untuk menyimpan catatan pribadi secara online. Digunakan untuk latihan kelas React, Sanghiang Perkasa IT Academy.

## Endpoint
http://notes-api-knacademy.vercel.app/api
### User

#### Register
- URL
    - `/auth/register`
- Method
    - `POST`
- Request Body
    - `username` as `string`
    - `email` as `string`, must be unique
    - `password` as `string`, must be at least 6 characters
- Response
    ```json
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjY2ZTkzNjM5YWRmYWUyMjZmZDAyOTI5NyIsImlhdCI6MTcyNjU1OTgwMSwiZXhwIjoxNzM0MzM1ODAxfQ.Ura6yNjniXafKivmqWAkTt87urtefyKGppSTaqOSFjJ",
        "data": {
            "user": {
                "username": "dana.mulyana",
                "email": "dana.mulyana@kalbenutritionals.com",
                "password": "$2a$12$M8G7OEMswy107q0qsieZyeG5gMDauYFR5etPRZzULa/6hNLzoaQDD",
                "_id": "66e93639adfae226fd029297",
                "__v": 0
            }
        }
    }
    ```

#### Login
- URL
    - `/auth/login`
- Method
    - `POST`
- Request Body
    - `email` as `string`
    - `password` as `string`
- Response
    ```json
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJpZCI6IjY2ZTkzNjM5YWRmYWUyMjZmZDAyOTI5NyIsImlhdCI6MTcyNjU1OTgwMSwiZXhwIjoxNzM0MzM1ODAxfQ.Ura6yNjniXafKivmqWAkTt87urtefyKGppSTaqOSFjJ",
        "data": {
            "user": {
                "_id": "66e93639adfae226fd029297",
                "username": "dana.mulyana",
                "email": "dana.mulyana@kalbenutritionals.com",
                "password": "$2a$12$M8G7OEMswy107q0qsieZyeG5gMDauYFR5etPRZzULa/6hNLzoaQDD",
                "__v": 0
            }
        }
    }
    ```

#### Get User logged in
- URL
    - `/auth/me`
- Method
    - `GET`
- Headers:
    - `Authorization`: `Bearer <accessToken>`
- Response
    ```json
    {
        "status": "success",
        "data": {
            "user": {
                "_id": "66e93639adfae226fd029297",
                "username": "dana.mulyana",
                "email": "dana.mulyana@kalbenutritionals.com",
                "password": "$2a$12$M8G7OEMswy107q0qsieZyeG5gMDauYFR5etPRZzULa/6hNLzoaQDD",
                "__v": 0
            }
        }
    }
    ```

### Notes

#### Create Note
- URL
    - `/notes`
- Method
    - `POST`
- Headers:
    - `Authorization`: `Bearer <accessToken>`
- Request Body
    - `title` as `string`
    - `body` as `string`
- Response
  ```json
    {
        "status": "success",
        "message": "Note created",
        "data": {
            "note": {
                "title": "my notes",
                "body": "notes body",
                "archived": false,
                "owner": "66e93639adfae226fd029297",
                "_id": "66e93f9a4beb0b846549058c",
                "createdAt": "2024-09-17T08:36:42.094Z",
                "__v": 0
            }
        }
    }
  ```

#### Get Notes (non-archived)
- URL
    - `/notes`
- Method
    - `GET`
- Headers:
    - `Authorization`: `Bearer <accessToken>`
- Response
  ```json
    {
        "status": "success",
        "message": "Note retrieved",
        "results": 1,
        "data": {
            "notes": [
                {
                    "_id": "66e93f9a4beb0b846549058c",
                    "title": "my notes",
                    "body": "notes body",
                    "archived": false,
                    "owner": {
                        "_id": "66e93639adfae226fd029297",
                        "username": "dana.mulyana",
                        "email": "dana.mulyana@kalbenutritionals.com"
                    },
                    "createdAt": "2024-09-17T08:36:42.094Z",
                    "__v": 0
                }
            ]
        }
    }
  ```


#### Get Archived Notes
- URL
    - `/notes/archived`
- Method
    - `GET`
- Headers:
    - `Authorization`: `Bearer <accessToken>`
- Response
  ```json
    {
        "status": "success",
        "message": "Note retrieved",
        "results": 1,
        "data": {
            "notes": [
                {
                    "_id": "66e93f9a4beb0b846549058c",
                    "title": "my notes",
                    "body": "notes body",
                    "archived": true,
                    "owner": {
                        "_id": "66e93639adfae226fd029297",
                        "username": "dana.mulyana",
                        "email": "dana.mulyana@kalbenutritionals.com"
                    },
                    "createdAt": "2024-09-17T08:36:42.094Z",
                    "__v": 0
                }
            ]
        }
    }
  ```

#### Get Single Note
- URL
    - `/notes/{note_id}`
- Method
    - `GET`
- Headers:
    - `Authorization`: `Bearer <accessToken>`
- Response
  ```json
    {
        "status": "success",
        "message": "Note retrieved",
        "data": {
            "note": {
                "_id": "66e93f9a4beb0b846549058c",
                "title": "my notes",
                "body": "notes body",
                "archived": false,
                "owner": {
                    "_id": "66e93639adfae226fd029297",
                    "username": "dana.mulyana",
                    "email": "dana.mulyana@kalbenutritionals.com"
                },
                "createdAt": "2024-09-17T08:36:42.094Z",
                "__v": 0
            }
        }
    }
  ```
#### Update Note
- URL
    - `/notes/{note_id}`
- Method
    - `PATCH`
- Headers:
    - `Authorization`: `Bearer <accessToken>`
- Request Body
    - `body` as `string`
- Response
  ```json
    {
        "status": "success",
        "message": "Note updated",
        "data": {
            "note": {
                "_id": "66e95082870ad403790d744e",
                "title": "my notes",
                "body": "update body",
                "archived": false,
                "owner": {
                    "_id": "66e93639adfae226fd029297",
                    "username": "dana.mulyana",
                    "email": "dana.mulyana@kalbenutritionals.com"
                },
                "createdAt": "2024-09-17T09:48:50.942Z",
                "__v": 0
            }
        }
    }
  ```

#### Archive Note
- URL
    - `/notes/{note_id}/archive`
- Method
    - `POST`
- Headers:
    - `Authorization`: `Bearer <accessToken>`
- Response
  ```json
    {
        "status": "success",
        "message": "Note archived successfully",
        "note": {
            "_id": "66e93f9a4beb0b846549058c",
            "title": "my notes",
            "body": "notes body",
            "archived": true,
            "owner": {
                "_id": "66e93639adfae226fd029297",
                "username": "dana.mulyana",
                "email": "dana.mulyana@kalbenutritionals.com"
            },
            "createdAt": "2024-09-17T08:36:42.094Z",
            "__v": 0
        }
    }
  ```

#### Unarchive Note
- URL
    - `/notes/{note_id}/unarchive`
- Method
    - `POST`
- Headers:
    - `Authorization`: `Bearer <accessToken>`
- Response
  ```json
    {
        "status": "success",
        "message": "Note unarchived successfully",
        "note": {
            "_id": "66e93f9a4beb0b846549058c",
            "title": "my notes",
            "body": "notes body",
            "archived": false,
            "owner": {
                "_id": "66e93639adfae226fd029297",
                "username": "dana.mulyana",
                "email": "dana.mulyana@kalbenutritionals.com"
            },
            "createdAt": "2024-09-17T08:36:42.094Z",
            "__v": 0
        }
    }
  ```

#### Delete Note
- URL
    - `/notes/{note_id}`
- Method
    - `DELETE`
- Headers:
    - `Authorization`: `Bearer <accessToken>`
- Response
  ```json
    {
        "status": "success",
        "message": "Note deleted",
        "data": null
    }
  ```