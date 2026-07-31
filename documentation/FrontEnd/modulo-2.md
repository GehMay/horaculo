## Módulo 2: Workspace do Aluno (Dashboard e Gamificação)

Este módulo foca na apresentação dos dados, consumo de listagens paginadas e na renderização de componentes visuais avançados (gráficos e QR Codes) baseados nas informações devolvidas pelo FastAPI.

### 1. Vitrine de Vagas e Feedback de Match

A tela principal do aluno é um *feed* de oportunidades. O grande diferencial não é apenas mostrar a vaga, mas sim o **nível de compatibilidade** do aluno com ela.

* **Integração (Listagem):** O componente principal dispara um `GET /api/v1/jobs` assim que a página é carregada (usando `useEffect` no React ou bibliotecas como `React Query` / `SWR` para cache e *loading states* automáticos).
* **Componente Visual (Job Card):** Cada vaga é renderizada como um cartão.
* Dentro desse cartão, o front-end deve usar os dados do backend (ex: `match_score: 85`) para preencher uma barra de progresso.
* **Lógica de Cores:** A interface deve aplicar cores semânticas condicionalmente. Se `match_score >= 80`, a barra fica verde (padrão FECAP). Se estiver entre `50 e 79`, amarela. Abaixo de `50`, cinza ou vermelha discreta.


* **Ação de Candidatura:** O botão "Candidatar-se" dispara o `POST /api/v1/jobs/{job_id}/apply`.
* *Trabalhabilidade:* É crucial gerenciar o estado do botão. Ao clicar, o botão deve mudar para `disabled` e exibir um *spinner* de carregamento. Em caso de sucesso (HTTP 201), o botão muda para "Candidatura Enviada" e desabilita permanentemente para evitar envios duplicados na interface.



### 2. Painel de Atividades e Motor de Check-in (QR Code)

Para garantir a credibilidade das presenças, o frontend precisa lidar com o QR Code de forma dinâmica e segura.

* **Integração e Renderização:** O aluno acessa a aba "Meu Ingresso" no detalhe do evento. O React faz um `GET /api/v1/events/{event_id}/qrcode` e recebe a string criptografada (ex: um JWT temporário).
* **Uso de Biblioteca:** Utilize a biblioteca `qrcode.react` para converter essa string recebida em uma imagem legível na tela.
* **Lógica Anti-Fraude (Polling no Frontend):** O frontend *não pode* gerar o QR Code apenas uma vez. O React deve implementar um temporizador (usando `setInterval` dentro de um `useEffect`).
* A cada 60 segundos, o React bate na API novamente, pega uma nova string e atualiza o componente `<QRCode/>`.
* *Nota Técnica:* É vital incluir a função de limpeza (`clearInterval`) no retorno do `useEffect` para evitar vazamento de memória quando o aluno fechar a aba do ingresso.



### 3. Gamificação e Radar de Atributos

Esta é a tela de perfil público do aluno, onde ele enxerga o acúmulo de pontos que validam suas *skills* para o mercado.

* **Integração:** O frontend consome os dados consolidados do perfil do aluno (tabela `student_attributes` no Módulo 4 do backend). O payload trará uma lista de habilidades e suas respectivas pontuações somadas.
* **Gráfico de Radar (Recharts):**
* Para sair da monotonia das listas de texto, a equipe de front-end deve utilizar a biblioteca **Recharts** (ou *Chart.js*).
* O componente `RadarChart` pega o array de atributos devolvido pela API e gera um polígono visual. Quanto mais pontos em "Liderança", mais o gráfico estica naquela direção.
* Isso fornece um apelo de "RPG" (Gameficação), onde o aluno enxerga suas *status* crescerem visualmente após cada evento validado por um mentor.


* **Sistema de Conquistas (Badges):** A UI deve mapear limites de pontuação. Se o payload indicar que o aluno passou de 500 pontos em um eixo específico, o React renderiza condicionalmente um ícone dourado/verde (Selo de Proficiência) ao lado do atributo.

### 4. Responsividade (Mobile-First)

Como o estudante acessará a plataforma majoritariamente pelo celular (especialmente para mostrar o QR Code na porta dos eventos ou aplicar para vagas no transporte público):

* **Navegação:** Em telas menores, a barra de navegação superior (Navbar) deve virar um *Bottom Navigation Bar* (barra de ícones na parte inferior da tela, padrão de aplicativos) ou um menu Hambúrguer muito fluido.
* **Tamanho de Toque:** Os botões de ação principal ("Inscrever-se", "Gerar Ingresso") devem ter altura mínima de 44px para garantir excelente usabilidade (acessibilidade de toque em telas móveis).

O Workspace da Empresa é onde a plataforma precisa brilhar em termos de usabilidade e eficiência. Para os profissionais de RH que usarão o sistema diariamente, cada clique extra é um atrito. O objetivo aqui é produtividade e clareza na tomada de decisão.