/// <reference types ="Cypress"/>

describe('REST API testing Using Cypress', ()=> {

it('Verify List of Users', ()=>{

cy.request({
    method: 'GET',
    url: 'https://reqres.in/api/users?page=2'
}).then((res)=> {
    expect(res.status).to.eq(200)
    expect(res.body.page).to.eq(2)
    expect(res.body.per_page).to.eq(6)
    expect(res.body.total).to.eq(12)
    expect(res.body.total_pages).to.eq(2)
})
})

it('Verify Single User with ID = 2', ()=>{

    cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users/2'
    }).then((res)=> {
        expect(res.status).to.eq(200)
        expect(res.body.data.id).to.eq(2)
    })
    })

it('Verify Single User not found with ID = 23', ()=>{

        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: 'https://reqres.in/api/users/23'
        }).then((res)=> {
            expect(res.status).to.equals(404)   
        })
        })
    
it('Verify List of Resources', ()=>{

            cy.request({
                method: 'GET',
                url: 'https://reqres.in/api/unknown'
            }).then((res)=> {
                expect(res.status).to.eq(200)
                expect(res.body.page).to.eq(1)
                expect(res.body.per_page).to.eq(6)
                expect(res.body.total).to.eq(12)
                expect(res.body.total_pages).to.eq(2)
            })
            
            })
            
it('Verify Single Resource with ID = 2', ()=>{

                cy.request({
                    method: 'GET',
                    url: 'https://reqres.in/api/unknown/2'
                }).then((res)=> {
                    expect(res.status).to.eq(200)
                    expect(res.body.data.id).to.eq(2)
                    expect(res.body.data.name).to.eq('fuchsia rose')
                    expect(res.body.data.year).to.eq(2001)
                    expect(res.body.data.color).to.eq('#C74375')
                    expect(res.body.data.pantone_value).to.eq('17-2031')
                })
                
                })

it('Verify Single Resource not found with ID = 23', ()=>{

                    cy.request({
                        failOnStatusCode: false,
                        method: 'GET',
                        url: 'https://reqres.in/api/unknown/23'
                    }).then((res)=> {
                        expect(res.status).to.eq(404)
                    })
                    
                    })

it('Verify Delay in response with delay = 3', ()=>{

                        cy.request({
                            method: 'GET',
                            url: 'https://reqres.in/api/users?delay=3'
                        }).then((res)=> {
                            expect(res.status).to.eq(200)
                        })
                        
                        })
    
it('Verify Create User scenario', ()=>{
    cy.request({
                 method: 'POST',
                 url: 'https://reqres.in/api/users',
                                
                  body: {
                                        "name": "M Rafay",
                                        "job": "QA Engineer"  
                          }
                            }).then((res)=> {
                                expect(res.status).to.eq(201)
                                expect(res.body).to.have.property('name', 'M Rafay')
                                expect(res.body).to.have.property('job', 'QA Engineer')
                            })         
                            })

 it('Verify Update User details', ()=>{
                                cy.request({
                                             method: 'PUT',
                                             url: 'https://reqres.in/api/users/2',
                                                            
                                              body: {
                                                                    "name": "Rafay",
                                                                    "job": "Engineer"  
                                                      }
                                                        }).then((res)=> {
                                                            expect(res.status).to.eq(200)
                                                            expect(res.body).to.have.property('name', 'Rafay')
                                                            expect(res.body).to.have.property('job', 'Engineer')
                                                        })         
                                                        })

 it('Verify Modification in User details', ()=>{
                                cy.request({
                                             method: 'PATCH',
                                             url: 'https://reqres.in/api/users/2',
                                                            
                                             body: {
                                                "name": "MRafay",
                                                "job": "Test Engineer"  
                                  }
                                                        }).then((res)=> {
                                                            expect(res.status).to.eq(200)
                                                            expect(res.body).to.have.property('name', 'MRafay')
                                                            expect(res.body).to.have.property('job', 'Test Engineer')
                                                        })         
                                                        })
                                                        
it('Verify Deletion of User', ()=>{
                                                            cy.request({
                                                                         method: 'DELETE',
                                                                         url: 'https://reqres.in/api/users/2',
                                                                                        
                                                                      
                                                                                    }).then((res)=> {
                                                                                        expect(res.status).to.eq(204)
                                                                                        expect(res.body).to.eq('')
                                                                                    })         
                                                                                    })
 it('Verify User registeration scenario', ()=>{
                                                                                        cy.request({
                                                                                                     method: 'POST',
                                                                                                     url: 'https://reqres.in/api/register',
                                                                                                                    
                                                                                                      body: {
                                                                                                        "email": "eve.holt@reqres.in",
                                                                                                        "password": "pistol"
                                                                                                    }
                                                                                                                }).then((res)=> {
                                                                                                                    expect(res.status).to.eq(200)
                                                                                                                    expect(res.body).to.have.property('id', 4)
                                                                                                                    expect(res.body).to.have.property('token', 'QpwL5tke4Pnpja7X4')
                                                                                                                    
                                                                                                                })         
                                                                                                                })
                                                                                                
it('Verify User registeration failed scenario', ()=>{
                                                                                                                    cy.request({
                                                                                                                        failOnStatusCode: false,
                                                                                                                                 method: 'POST',
                                                                                                                                 url: 'https://reqres.in/api/register',
                                                                                                                                                
                                                                                                                                  body: {
                                                                                                                                    "email": "sydney@fife"

                                                                                                                                }
                                                                                                                                            }).then((res)=> {
                                                                                                                                                expect(res.status).to.eq(400)
                                                                                                                                                expect(res.body).has.property('error','Missing password')

                                                                                                                                            })         
                                                                                                                                            })                                                                                

it('Verify Successful User login', ()=>{
                                                                                                                                                cy.request({
                                                                                                                                                    
                                                                                                                                                             method: 'POST',
                                                                                                                                                             url: 'https://reqres.in/api/login',
                                                                                                                                                                            
                                                                                                                                                              body: {
                                                                                                                                                                "email": "eve.holt@reqres.in",
                                                                                                                                                                "password": "cityslicka"
                            
                                                                                                                                                            }
                                                                                                                                                                        }).then((res)=> {
                                                                                                                                                                            expect(res.status).to.eq(200)
                                                                                                                                                                            expect(res.body).has.property('token','QpwL5tke4Pnpja7X4')
                            
                                                                                                                                                                        })         
                                                                                                                                                                        })                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
it('Verify User login failure', ()=>{
                                                                                                                                                                            cy.request({
                                                                                                                                                                                failOnStatusCode: false,
                                                                                                                                                                                         method: 'POST',
                                                                                                                                                                                         url: 'https://reqres.in/api/login',
                                                                                                                                                                                                        
                                                                                                                                                                                          body: {
                                                                                                                                                                                            "email": "peter@klaven"
                                                        
                                                                                                                                                                                        }
                                                                                                                                                                                                    }).then((res)=> {
                                                                                                                                                                                                        expect(res.status).to.eq(400)
                                                                                                                                                                                                        expect(res.body).has.property('error','Missing password')
                                                        
                                                                                                                                                                                                    })         
                                                                                                                                                                                                    })                               
                            
                            
                            
                            
                                                                                                  

})