/// <reference types="cypress" />

describe("ToDos App Smoke Test", () => {
    // Selectors and common function from tests can be moved to Page Object Layer
    const SELECTORS = {
        toDoTextBox: 'header input.new-todo',
        toDoLi: '.main .todo-list li',
        toDoLiCheckbox: '.main .todo-list li input[type="checkbox"]',
        toDoLiLabel: '.main .todo-list li label',
        toDoPendingCount: 'footer .todo-count',
        filterAll: 'footer a:contains("All")',
        filterActive: 'footer a:contains("Active")',
        filterCompleted: 'footer a:contains("Completed")',
    }

    const TODO_PENDING_ITEMS = ["First Task", "Second Task", "Third Task", "Fourth Task"]

    beforeEach(() => {
        cy.visit("/")
    })

    it("Add multiple todos and verify it gets displayed in the same order as entered", () => {
        var actualTodos = []

        // Validate no ToDos should exist
        cy.get(SELECTORS.toDoLi).should('not.exist')

        // Add ToDos
        cy.wrap(TODO_PENDING_ITEMS).each((items) => {
            cy.addTodo(items)
        })

        // Validate the added ToDos count
        cy.get(SELECTORS.toDoLi).should('have.length', 4)

        // Validate expected and actual ToDos are mataching and are in same order
        cy.get(SELECTORS.toDoLiLabel).each(($li) => {
            actualTodos.push($li.text())
        }).then(() => {
            expect(TODO_PENDING_ITEMS).deep.equal(actualTodos)
        })

        // Validate number of pending ToDos
        cy.get(SELECTORS.toDoPendingCount).contains('4 items left')

        // Validate 'All' filter is selected by default
        cy.get(SELECTORS.filterAll).should('have.class', 'selected')
    })

    it("Add multiple todos and mark 2nd and 4th ToDo as Completed", () => {
        // Add ToDos
        cy.wrap(TODO_PENDING_ITEMS).each((items) => {
            cy.addTodo(items)
        })

        // Validate the added ToDos count
        cy.get(SELECTORS.toDoLi).should('have.length', 4)

        // Mark 2 ToDos as completed and making sure that they are completed by verifying their class
        cy.get(SELECTORS.toDoLiCheckbox).each(($li, index, $list) => {
            if (index == 1 || index == 3) {
                cy.wrap($li).click()
                cy.wrap($li).parents('li').should('have.class', 'completed')
            }
        })

        // Validate number of pending ToDos
        cy.get(SELECTORS.toDoPendingCount).contains('2 items left')
        
        // Validate 'All' filter is selected by default
        cy.get(SELECTORS.filterAll).should('have.class', 'selected')
    })

    it("Verify Completed ToDo Filter", () => {
        var expectedPending = []
        var actualPending = []

        var expectedCompleted = []
        var actualCompleted = []

        // Add ToDos
        cy.wrap(TODO_PENDING_ITEMS).each((items) => {
            cy.addTodo(items)
        })

        // Validate the added ToDos count
        cy.get(SELECTORS.toDoLi).should('have.length', 4)

        // Mark 2 ToDos as completed and making sure that they are completed by verifying their class
        cy.get(SELECTORS.toDoLiCheckbox).each(($li, index, $list) => {
            if (index == 1 || index == 3) {
                expectedCompleted.push($li.siblings('label').text())
                cy.wrap($li).click()
                cy.wrap($li).parents('li').should('have.class', 'completed')
            } else {
                expectedPending.push($li.siblings('label').text())
            }
        })

        // Validate number of pending ToDos
        cy.get(SELECTORS.toDoPendingCount).contains('2 items left')

        // Validate 'All' filter is selected by default
        cy.get(SELECTORS.filterAll).should('have.class', 'selected')

        // Select 'Pending' filter
        cy.get(SELECTORS.filterActive).click()

        // Validate number of ToDos when filtered by pending
        cy.get(SELECTORS.toDoLi).should('have.length', 2)

        // Validate expected and actual Pending ToDos are mataching and are in same order
        cy.get(SELECTORS.toDoLiLabel).each(($li) => {
            actualPending.push($li.text())
        }).then(() => {
            expect(expectedPending).deep.equal(actualPending)
        })

        // Select 'Completed' filter
        cy.get(SELECTORS.filterCompleted).click()

        // Validate number of ToDos when filtered by completed
        cy.get(SELECTORS.toDoLi).should('have.length', 2)

        // Validate expected and actual Completed ToDos are mataching and are in same order
        cy.get(SELECTORS.toDoLiLabel).each(($li) => {
            actualCompleted.push($li.text())
        }).then(() => {
            expect(expectedCompleted).deep.equal(actualCompleted)
        })
    })

})