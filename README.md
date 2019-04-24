# HACKTIV-OVERFLOW

## Usage

- Before run this you should:
  > run this on server: **$ npm install**

	> run this on server: **$ npm run dev or npm start**

	> run this on client: **$ npm run serve**

- Access point:
	> client: http://localhost:8080

  > server: http://localhost:3000


# List Routes
## User Routes
| Route        | HTTP | Header(s)  | Body                                                  | Response                                                                                                                             |
|--------------|------|------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| /users       | POST | none       | name: String <br> email: String <br> password: String | **Success:** <br> 201: Object User <br> **Error:** <br> 400: Validation Error <br> 500: Internal server error                        |
| /users/login | POST | none       | email: String <br> password: String                   | **Success:** <br> 200: Access token, Object User <br> **Error:** <br> 500: Internal server error <br> 400: Username / Password wrong |

## Answer Routes
| Route                        | HTTP   | Header(s)   | Body                                                                                                               | Response                                                                                                                                                           |
|------------------------------|--------|-------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /answers/:id                    | GET    | none        | none                                                                                                               | **Success:** <br> 200: Object answer <br> **Error:** <br>  500: Internal server error                                                                   |
| /answers/:id                    | PUT   | token:user |  description: String | **Success:** <br> 200: Object answer <br> **Error:** <br> 500: Internal server error <br> 400: Validation error                                        |
| /answers/:id/upvotes                | PUT    | token:user | none | **Success:** <br> 200: Object answer <br> **Error:** <br> 500: Internal server error                                                                              |
| /answers/:id/downvotes      | PUT    | token:user  | none                                                                                                               | **Success:** <br> 200: Object answer <br> **Error:** <br> 500: Internal server error
| /answers/:id/               | DELETE | token:user | none                                                                                                               | **Success:** <br> 200: Object answer <br> **Error:** <br> 500: Internal server error                                                       |

## Question Routes
| Route                        | HTTP   | Header(s)   | Body                                                                                                               | Response                                                                                                                                                           |
|------------------------------|--------|-------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /questions                    | GET    | none        | none                                                                                                               | **Success:** <br> 200: Array of object questions <br> **Error:** <br>  500: Internal server error                                                                   |
| /questions                    | POST   | token:user |  title: String <br> description: String | **Success:** <br> 201: Object question <br> **Error:** <br> 500: Internal server error <br> 400: Validation error                                        |
| /questions/:id                    | GET    | none        | none                                                                                                               | **Success:** <br> 200: object question <br> **Error:** <br>  500: Internal server error                                                                   |
| /questions/:id               | DELETE | token:user | none                                                                                                               | **Success:** <br> 200: Object question <br> **Error:** <br> 500: Internal server error                                                       |
| /questions/:id      | PUT    | token:user  | title: String <br> description: String                                                                                                               | **Success:** <br> 200: Object question <br> **Error:** <br> 500: Internal server error
| /questions/:id/upvotes                | PUT    | token:user | none | **Success:** <br> 200: Object question <br> **Error:** <br> 500: Internal server error                                                                              |
| /questions/:id/downvotes      | PUT    | token:user  | none                                                                                                               | **Success:** <br> 200: Object question <br> **Error:** <br> 500: Internal server error
| /questions/:id/answer      | POST    | token:user  | description: String                                                                                                               | **Success:** <br> 200: Object question <br> **Error:** <br> 500: Internal server error