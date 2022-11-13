# Elements Link
Este projeto tem o intuito de demonstrar a conexão entre os elementos através de linhas,
o mesmo utiliza uma _tag_ especial `link` para se conectar ao _id_ de outro elemento.

As conexões são calculadas automaticamente, utilizando o meio dos 2 elementos.

Para criar as conexões é visualmente utilizado um elemento de 'mentira' entre os meios dos 2 pontos, 
depois é feito um calulo para saber a posição do alvo, para saber se o mesmo se encontra acima ou abaixo,
na direita ou esquerda da fonte.

Ao encontrar essa posição, são definidas quais bordas serão usadas para fazer a ligação.

#### É possível mover os elementos, ao mover o sistema irá gerar novamente as conexões.
Link da base do sistema de movimentação de items: https://www.w3schools.com/howto/howto_js_draggable.asp