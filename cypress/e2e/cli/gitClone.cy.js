import { faker } from '@faker-js/faker'

describe('git clone', () => {
  const project = {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5)
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.api_createProject(project)
  })

  it('successfully SSH', () => {
    cy.cloneViaSSH(project)

    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('contain', `# ${project.name}`)
      .and('contain', project.description)
  })

  it('successfully HTTP', () => {
    cy.cloneViaHTTP(project)

    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('contain', `# ${project.name}`)
      .and('contain', project.description)
  })
})
