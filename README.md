# Jogo

Jogo: Mimi no Mundo dos Sonhos

Objetivo:
Ajudar a Mimi, uma menina sonhadora, a escapar do seu próprio sonho pulando sobre pesadelos e coletando estrelas para acordar.  

Como Jogar:
- Pular: Pressione espaço, seta para cima ou toque na tela para fazer a Mimi pular e evitar os pesadelos.  
- Coletar Estrelas: Pegue as estrelas que aparecem aleatoriamente para aumentar sua pontuação.  
- Game Over: Se Mimi tocar em um pesadelo, o jogo acaba.  

Explicação do Código

1. Estrutura Básica (HTML + CSS)  
- HTML: Define os elementos do jogo (Mimi, pesadelos, estrelas, placar).  
- CSS: Controla o visual (cores roxas, animações de pulo, movimento dos obstáculos).  

2. Lógica do Jogo (JavaScript) 

Variáveis Principais:
- isJumping, isGameOver → Controlam o estado do jogo.  
- score, jumpCount, starCount → Armazenam pontuação, pulos e estrelas coletadas.  
- gameSpeed → Aumenta a dificuldade com o tempo.  

Funções Importantes:
  
- jump() → Faz a Mimi pular (com animação CSS).  
- checkCollisions()→ Detecta se Mimi encostou em um pesadelo ou coletou uma estrela.  
- collectStar() → Aumenta o contador de estrelas e ativa efeito visual.  
- gameOver() → Para o jogo e exibe a tela de reinício.  
- startGame() → Reinicia o jogo, zera pontuações e recria os  os elementos.  

Dificuldade Progressiva:
- A cada 500 pontos, a velocidade aumenta (gameSpeed diminui).  

Toques Especiais: 
- Nuvens animadas geradas aleatoriamente no fundo.  
- Sistema de toque para mobile.
