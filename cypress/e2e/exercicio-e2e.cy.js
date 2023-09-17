/// <reference types="cypress" />
let dadosLogin
import entregaPage from "../support/page_objects/entrega.page"; 
const dadosEndereco = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */
    before(() => {
            cy.fixture('perfil').then(perfil => {
                dadosLogin = perfil
            })
        });

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO 
        cy.addProdutos('Abominable Hoodie', 'M' , 'Blue', 3)
        cy.addProdutos('Atlas Fitness Tank', 'S' , 'Blue', 4)
        cy.get('.next').click()
        cy.addProdutos('Balboa Persistence Tee', 'M' , 'Orange', 1)
        cy.get('.next').click()
        cy.addProdutos('Autumn Pullie', 'XL' , 'Purple', 2)
        cy.get('.top-cart-wishlist').click()
        cy.get('.checkout').first().click({force: true})
        cy.get('.showlogin').click()
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        
        entregaPage.editarEnderecoEntrega
            (dadosEndereco.nome,
            dadosEndereco.sobrenome,
            dadosEndereco.empresa,
            dadosEndereco.pais,
            dadosEndereco.endereco,
            dadosEndereco.numero,
            dadosEndereco.cidade,
            dadosEndereco.estado,
            dadosEndereco.cep,
            dadosEndereco.telefone,
            dadosEndereco.email
            )
        
        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });


})
