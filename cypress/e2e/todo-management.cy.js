describe.skip("Test Suite ID: TD_001 - Manage To-Do Items Test Suite", () => {
    beforeEach(() => {
        cy.restoreSession();
    });
    it("TC_LOGIN_001 - should access to-do items page", () => {
        cy.visit("/")
        cy.get(':nth-child(1) > .mr-2').click();
        cy.contains("Create new To Do Item");
    });

    it("TC_TODO_005 - Refresh Button List", () => {
        cy.visit("/to-do-item")

        cy.intercept('GET', '**/api/to-do-items?**').as('refreshPage');

        cy.get(':nth-child(1) > .mr-2').click();

        cy.wait('@refreshPage').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    })

    it("TC_LOGIN_008 - should be able to edit existing item", () => {
        cy.visit("/to-do-item")

        cy.get('[data-cy="entityCreateButton"]').click();

        cy.get('[data-cy="title"]').type("Item Title");
        cy.get('[data-cy="description"]').type("Item Description");
        cy.get('[data-cy="folder"]').select(0);

        cy.get('[data-cy="entityCreateSaveButton"]').click();

        cy.contains("A new toDoItem is created with identifier")

    });

    it("TC_LOGIN_009 - should be able to delete existing item", () => {
        cy.visit("/to-do-item")

        cy.get('[data-cy="entityCreateButton"]').click();

        cy.get('[data-cy="title"]').type("Item Title");
        cy.get('[data-cy="description"]').type("Item Description");
        cy.get('[data-cy="folder"]').select(0);

        cy.get('[data-cy="entityCreateSaveButton"]').click();

        cy.contains("A new toDoItem is created with identifier")

        cy.get(':nth-child(1) > .text-right > .btn-group > [data-cy="entityDeleteButton"]').click();
        cy.get('[data-cy="entityConfirmDeleteButton"]').click();

        cy.contains("A toDoItem is deleted with identifier");
    });
})

describe("Test Suite ID: FL_001 - Manage Folder List Test Suite", () => {
    beforeEach(() => {
        cy.restoreSession();
    });
    it("TC_FOLDER_001 - should access to-do items page", () => {
        cy.visit("/")
        cy.get(':nth-child(2) > .mr-2').click();
        cy.contains("Folders")
    });

    it("TC_FOLDER_001 - Refresh Button List", () => {
        cy.visit("/folder")
        cy.intercept('GET', '**/api/folders?**').as('refreshPage');

        cy.get('.mr-2').click();

        cy.wait('@refreshPage').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

    it("TC_FOLDER_002 - Enter Valid Folder Name and Save", () => {
        cy.visit("/folder")
        cy.get('[data-cy="entityCreateButton"]').click();
        cy.get('[data-cy="name"]').type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"); //Text have 50 characters

        cy.get('[data-cy="entityCreateSaveButton"]').click();

        cy.contains("A new folder is created with identifier")
    });

    it("TC_FOLDER_003 - Enter Invalid Folder Name and Save", () => {
        cy.visit("/folder")
        cy.get('[data-cy="entityCreateButton"]').click();
        cy.get('[data-cy="name"]').type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"); //Text have 51 characters

        cy.get('[data-cy="entityCreateSaveButton"]').click();

        cy.contains("error.http.500");
    });

    it("TC_FOLDER_004 - Enter Invalid Folder Name and Save", () => {
        cy.visit("/folder")
        cy.get('[data-cy="entityCreateButton"]').click();
        cy.get('[data-cy="name"]').type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"); //Text have 51 characters

        cy.get('[data-cy="entityCreateSaveButton"]').click();

        cy.contains("error.http.500");
    });
});




