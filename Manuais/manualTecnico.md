
# Desenvolvimento Baseado em Modelos - Manual Técnico

### 150221050 Bárbara Teixeira | 150221014 Ricardo Fernandes

----------

## Análise de requisitos

Dado o tema Comércio Eletrónico, nós decidimos fazer um site de venda de filmes online designado de **NetFunlix**.  
Para o funcionamento da WebApp desenvolvida foram necessárias as entidades seguintes:  

- _Fatura_  

- _Distribuidora_  

- _Produto_  

- _Registo_  

- _Venda_  

- _Utilizador_  
  
![Models](schema0.png)

---

### Compenentes do gerador  

O nosso gerador é constituído por 3 partes:  

- _generate-class_  

- _generate-database_  

- _generate-controllers_

#### Generate-class  

O módulo generate-class é responsável por gerar os modelos, este é constituído apenas pela função *createClass* que recebe o nome da base de dados e um conjunto de modelos.  

Desse conjunto de modelos, iterando 1 a 1, são retiradas as propriedades e as referências dos modelos e por fim são escritos num ficheiro JavaScript.  
  
#### Generate-database  

O módulo generate-database é responsável por gerar a base de dados, este é contituído por duas funções *generateDatabase* e *addForeignKey* ambas recebem como argumento o nome da base de dados e um conjunto de modelos.  

A função *generateDatabase* tem como fim gerar a base de dados para a WebApp.  
A função *addForeignKey* tem como fim adicionar as chaves estrangeiras às entidades presentes na base de dados caso seja necessário.  
  
#### Generate-controllers  

O módulo generate-controllers é responsável por gerar a API RESTful, este é constituído apenas pela função *generateApi* esta função recebe o objecto config que contêm os modelos a serem utilizados.