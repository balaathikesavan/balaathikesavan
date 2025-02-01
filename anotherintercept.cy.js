it.only("Intercepting the API calls with different status codes", () => {

    cy.visit("https://dummyapi.io/explorer");

    // Intercept and mock response for status code 200 (OK)
    cy.intercept({
        method: "GET",
        path: "/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10"
    }, {
        statusCode: 200,
        body: {
            limit: 10,
            data: [
                { message: "This is a comment", id: "1" },
                { message: "Another comment", id: "2" }
            ]
        }
    }).as('comments200');

    // Trigger the UI action
    cy.get('.flex > :nth-child(5)').click();  

    // Wait and assert for status code 200
    cy.wait('@comments200').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
        cy.log("200 Response Body:", JSON.stringify(intercept.response.body));
    });

    // Intercept and mock response for status code 400 (Bad Request)
    cy.intercept({
        method: "GET",
        path: "/data/v1/user/60d0fe4f5311236168a109ca/post?limit=10"
    }, {
        statusCode: 404,
        body: {
            error: "RESOURCE_NOT_FOUND",
           
        }
    }).as('comments404');

    // Trigger the UI action
    
    cy.get('.flex > :nth-child(4)').click(); 


    // Wait and assert for status code 400
    cy.wait('@comments404').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(404);
        cy.log("404 Response Body:", JSON.stringify(intercept.response.body));
    });

    // Intercept and mock response for status code 401 (Unauthorized)
    cy.intercept({
        method: "GET",
        path: "/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10"
    }, {
        statusCode: 401,
        body: {
            error: "Unauthorized",
            message: "You are not authorized to view this resource."
        }
    }).as('comments401');

    // Trigger the UI action
    cy.get('.flex > :nth-child(5)').click();  

    // Wait and assert for status code 401
    cy.wait('@comments401').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(401);
        cy.log("401 Response Body:", JSON.stringify(intercept.response.body));
    });

    // Intercept and mock response for status code 404 (Not Found)
    cy.intercept({
        method: "GET",
        path: "/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10"
    }, {
        statusCode: 404,
        body: {
            error: "Not Found",
            message: "The requested resource could not be found."
        }
    }).as('comments404');

    // Trigger the UI action
    cy.get('.flex > :nth-child(5)').click();  

    // Wait and assert for status code 404
    cy.wait('@comments404').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(404);
        cy.log("404 Response Body:", JSON.stringify(intercept.response.body));
    });

    // Intercept and mock response for status code 500 (Internal Server Error)
    cy.intercept({
        method: "GET",
        path: "/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10"
    }, {
        statusCode: 500,
        body: {
            error: "Internal Server Error",
            message: "An unexpected error occurred on the server."
        }
    }).as('comments500');

    // Trigger the UI action
    cy.get('.flex > :nth-child(5)').click();  

    // Wait and assert for status code 500
    cy.wait('@comments500').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(500);
        cy.log("500 Response Body:", JSON.stringify(intercept.response.body));
    });
});
