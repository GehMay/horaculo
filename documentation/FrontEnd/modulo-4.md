## Módulo 4: Workspace do Mentor (Auditoria & Avaliação)

### 1. Leitor de QR Code (Check-in Mobile)

O recurso mais crítico para o mentor é validar a presença do aluno no evento. Isso precisa acontecer em segundos para não gerar filas.

* **Integração com Câmera (Web API):** O React precisará acessar a câmera do smartphone do mentor. Para isso, a biblioteca recomendada é a **`html5-qrcode`** ou a **`react-qr-reader`**. Ambas abstraem a complexidade da API nativa de mídia do navegador.
* **Requisito de Infraestrutura (HTTPS):** É muito importante orientar a equipe de que navegadores modernos (Chrome, Safari) **bloqueiam** o acesso à câmera se o site não estiver rodando sob um certificado SSL (`https://`). Mesmo no ambiente de desenvolvimento local ou no NGROK, o tráfego precisará ser HTTPS.
* **Feedback Sensorial e Visual:**
1. O mentor aponta a câmera. O React lê a *string* e engatilha o `POST /api/v1/events/checkin` em *background*.
2. **Trabalhabilidade em campo:** O mentor não tem tempo de ler textos pequenos. Se a API retornar sucesso (200 OK), o frontend deve disparar um grande *check* verde na tela, e idealmente utilizar a API nativa do navegador (`navigator.vibrate([200])`) para fazer o celular dar uma **leve vibrada**, indicando que ele pode passar para o próximo aluno sem sequer olhar para a tela.



### 2. Painel de Avaliação em Lote (Fast Evaluation)

Após o término da atividade, o mentor entra na plataforma para dar as notas aos alunos que ele bipou. Como um mentor pode ter 10, 20 ou 30 alunos sob sua guarda em um Hackathon, digitar notas manualmente criaria um gargalo imenso.

* **Interface de Sliders (Deslizadores):** O componente central desta tela não é o `input` de texto, e sim o `<Slider/>` (como o do Material-UI ou Radix UI).
* Para cada aluno e cada atributo (ex: Liderança, Comunicação), renderize um controle deslizante que vai de 0 a 100.
* *Vantagem UX:* Arrastar o dedo na tela é muito mais rápido do que clicar, abrir o teclado numérico do celular, digitar e fechar o teclado.


* **Accordions (Sanfonas):** Renderize a lista de alunos utilizando componentes do tipo `Accordion` (ou *Collapse*). Clicar no nome do aluno expande o painel com os *sliders* de avaliação e o campo opcional de feedback escrito. Isso mantém a tela limpa e focada.
* **Integração de Submissão:** Um único botão fixo na parte inferior da tela (Bottom App Bar) chamado "Enviar Todas as Avaliações". Ao clicar, o React consolida o estado local de todas as notas e dispara o payload (array de avaliações) para a rota `POST /api/v1/events/{event_id}/evaluate`.

### 3. Histórico de Mentorias e Feedbacks

O mentor também precisa acompanhar seu próprio impacto dentro da plataforma.

* **Painel de Acompanhamento:** Uma tela secundária que consome uma rota de histórico (ex: lista dos eventos que ele já avaliou).
* **Qualidade do Feedback:** Se houver um campo de texto para justificativa da nota, a UI deve incentivar o preenchimento. Pode-se colocar um contador de caracteres ou um pequeno aviso: *"Empresas dão muito valor a feedbacks escritos!"*.

Este é o centro de comando da instituição. Diferente dos painéis do aluno e do mentor, que focam em telas limpas e gamificadas, o **Backoffice da FECAP** exige alta densidade de informação. Os administradores precisam ver muitos dados simultaneamente e tomar ações em lote sem que a interface trave.