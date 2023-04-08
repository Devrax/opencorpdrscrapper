# OpenCorpDataScraper
This project is a Node.js REST API server that can be used to scrape and retrieve data from [opencorporates](https://opencorporates.com/). 
The server uses:
- **Node.js v18.12.1**
- **Express.js v4.18.2**
- **Puppeteer v19.8.2.** 
- **Supabase* v2.15.0**

It provides an endpoint /scrape to scrape data from the OpenCorporates website.

## Setting up the project
1. Clone this repository and go to the cloned repo.
2. Install the dependencies by running `npm install`.
3. Start the server by running `npm start`.
4. The server should be up and running on http://localhost:3000/ by default.

## REST API Endpoint
> `GET /companies`

*Use this endpoint to retrieve data from OpenCorporates. The endpoint requires a query parameter, **url**, that contains the URL of the search page to be scraped. The search page URL should be encoded using the encodeURIComponent() function. The response will be a JSON object containing an array of search results.*


Request
```http
GET /companies?url=https%3A%2F%2Fopencorporates.com%2Fcompanies%2Fdo%3Futf8%3D%25E2%259C%2593%26q%3DMona HTTP/1.1
Host: localhost:3000
```

Response
```json
{
  "result": [
    {
      "type": "company",
      "status": "registrada",
      "location": "C/ PARAJE MOÑA GORRY",
      "googleLocation": "https://maps.google.com/?q=C%2F+PARAJE+MO%C3%91A+GORRY",
      "companyName": "ASOCIACION AGROPECUARIA DE MOÑA GORRY",
      "companyHref": "https://opencorporates.com/companies/do/417727"
    },
    {
      "type": "company",
      "status": "registrada",
      "location": "CALLE CLUB DE LEONES EDIFICIO APTO. 1-A  NÚM. 24",
      "googleLocation": "https://maps.google.com/?q=CALLE+CLUB+DE+LEONES+EDIFICIO+APTO.+1-A++N%C3%9AM.+24",
      "companyName": "COMERCIAL IMPORTADORA LA MOÑA",
      "companyHref": "https://opencorporates.com/companies/do/603515"
    },
    {
      "type": "company",
      "status": "inactive registro_vencido",
      "location": "C/JOSE JOAQUIN PEREZ, NO. 205, COND. GALVAN I, APTO. 501",
      "googleLocation": "https://maps.google.com/?q=C%2FJOSE+JOAQUIN+PEREZ%2C+NO.+205%2C+COND.+GALVAN+I%2C+APTO.+501",
      "companyName": "D' MONA FASHION",
      "companyHref": "https://opencorporates.com/companies/do/215454"
    },
    ...
  ]
}
```

The above response shows the information about companies that match the search query "Mona" on the opencorporates website. Each company's information is contained within an object in the result array. Each object contains the following fields:

- `type`: Specifies the type of data in the object. In this case, it is set to "company".
- `status`: Shows the status of the company, which in this case is either "registrada" or "inactive registro_vencido", can be more.
- `location`: Contains the location of the company.
- `googleLocation`: Contains a link to the Google Map of the company's location.
- `companyName`: Specifies the name of the company.
- `companyHref`: Contains a link to the company's page on the opencorporates website.

> `GET /company`

*Use this endpoint to retrieve data from OpenCorporates. The endpoint requires a query parameter, **url**, that contains the URL of the search page to be scraped. The search page URL should be encoded using the encodeURIComponent() function. The response will be a JSON object containing an object of search results.*


Request
```http
GET /company?url=https%3A%2F%2Fopencorporates.com%2Fcompanies%2Fdo%2F94279 HTTP/1.1
Host: localhost:3000
```

response
```json
{
    "result": {
        "RNC"?: "123008325",
        "legalName"?: "FERRETERIA MADERERA EL EBANISTA SRL",
        "establishmentDate"?: "27/06/2001",
        "status"?: "ACTIVO",
        "companyName": "FERRETERIA MADERERA EL EBANISTA",
        "dataset": [
            [
                "company_number",
                "94279"
            ],
            [
                "status",
                "Registro Vencido"
            ],
            [
                "incorporation_date",
                "15 August 1998 (over 24 years ago)"
            ],
            [
                "dissolution date",
                "15 August 2018"
            ],
            [
                "company_type",
                "NO/NO"
            ],
            [
                "jurisdiction",
                "Dominican Republic"
            ],
            [
                "registered_address adr",
                "CARRT. LA VICTORIA CASI ESQ. 22, SABANA PERDIDA - Dominican Republic"
            ],
            [
                "business_classification_text",
                "46-LICITO COMERCIO."
            ],
            [
                "officers trunc8",
                "AGUSTIN PEÑA DIAZ Y GUILLER, gestor - AGUSTIN PEÑA DIAZ Y GUILLERMO DE LA ROSA, titular"
            ],
            [
                "registry_page",
                "http://www.onapi.gov.do:8081/api/sign..."
            ]
        ]
    }
}
```

## Error Codes
The server returns the following error codes:

- `404`: Not matches found - Error code: 001
> This error is returned when no matching data is found on the page.
- `500`: Internal server error - Error code: 000
> This error is returned when an unexpected error occurs on the server.
- `503`: Try within 30 minutes, this is due to high demand :) - Error code: 002
> This error is returned when the server experiences a timeout error due to high demand and recommends the user try again within 30 minutes.

These error codes are returned as JSON responses along with their respective error messages.

Overall, this Node.js REST API server uses Puppeteer to scrape the opencorporates website and retrieves information about companies that match a search query. This information is then parsed and returned as a JSON response to the client.

## Supabase Key

If you want access to the database api key or want me to share with you my database about the DGII, you can contact me anytime, send me a message or open a Pull Request.