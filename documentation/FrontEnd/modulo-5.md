## Módulo 5: Backoffice FECAP (Admin & Vitrines)

### 1. Central de Aprovações (DataGrids)

Como discutimos, empresas e mentores entram no sistema com o status `PENDENTE`. A equipe da FECAP precisa auditar esses cadastros rapidamente.

* **Implementação Visual (DataGrids):** Para renderizar a lista de cadastros (`GET /api/v1/admin/users/pending`), não utilize a tag `<table>` padrão do HTML. A equipe deve implementar bibliotecas robustas como **MUI DataGrid** ou **AG Grid**.
* *Por que?* Essas bibliotecas já resolvem problemas complexos nativamente: ordenação por coluna, filtros de busca embutidos e paginação, suportando milhares de linhas sem congelar o navegador do usuário.


* **Colunas de Ação (Action Columns):** Na última coluna da tabela, renderize botões de "Aprovar" e "Recusar".
* **Gestão de Estado e Feedback:**
1. O administrador clica em "Aprovar".
2. O React dispara o `PATCH /api/v1/admin/users/{id}/approve`.
3. Em caso de sucesso, remova a linha da tabela dinamicamente (sem dar *refresh* na página inteira) para não interromper o fluxo de trabalho.
4. Dispare uma notificação visual no canto da tela (utilizando `react-toastify` ou `sonner`) com a mensagem: *"Empresa X aprovada com sucesso"*.



### 2. Gestão de Chamados (Helpdesk Interno)

A comunicação com os usuários precisa ser organizada para que nada se perca em caixas de e-mail.

* **Padrão de UI (Master-Detail):** A melhor interface para leitura de tickets é o padrão *Master-Detail*.
* No lado esquerdo da tela (Master), uma lista rolável com o resumo de todos os chamados abertos (`GET /api/v1/admin/tickets`).
* Ao clicar em um item da lista, o lado direito da tela (Detail) renderiza o histórico daquela conversa e o campo de texto para resposta (`POST /api/v1/admin/tickets/{id}/reply`).


* **Indicadores Visuais (Chips/Badges):** Utilize *Tags* coloridas para sinalizar o status do chamado: Vermelho para `ABERTO`, Amarelo para `EM_ATENDIMENTO` e Verde/Cinza para `RESOLVIDO`.

### 3. Gestão das Vitrines (Horáculo e FECAP TECH)

A instituição precisa de autonomia para ligar e desligar campanhas promocionais e novos projetos de consultoria que aparecerão no painel dos alunos e empresas.

* **Formulários de Criação:** A tela de cadastro de campanhas (`POST /api/v1/admin/campaigns`) precisará lidar com o upload das imagens (banners).
* *Integração de Arquivos:* Lembre a equipe de que o arquivo de imagem deve primeiro ser enviado para a rota de upload do backend (`POST /api/v1/upload`), que devolverá a URL definitiva. Só então o React submete o JSON contendo o título, link e a URL da imagem.


* **Componente de Preview (Visualização Prévia):** Para evitar erros de formatação, enquanto o administrador preenche o formulário da campanha, a tela deve exibir um componente simulando exatamente como o banner aparecerá no painel do aluno.
* **Controles de Ativação (Toggles/Switches):** Em vez de precisar deletar uma campanha de Pós-Graduação quando o período de matrícula acabar, utilize um componente de *Switch* (botão de ligar/desligar). Ele dispara um `PATCH` rápido alterando apenas o status booleano (`ativo: true/false`), removendo o item instantaneamente dos painéis dos usuários através da rota pública `GET /api/v1/showcase`.