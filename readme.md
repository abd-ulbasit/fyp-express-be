<!-- Add endpoint documentation -->

## Endpoints

### POST /translate

 forwards the request as it is to the LLM backend

### POST /rego/fmt
 
Req Body:
 -  rego_version: number
 -  rego_module: string

### POST /rego/lint
 
Req Body:
 -  rego_version: number
 -  rego_module: string

### POST /rego/run

Req Body:
 -  rego_modules: object
 -  input: object
 -  data: object
 -  strict: boolean
 -  rego_version: number


Import the postman collection to see the request and response schema in detail.