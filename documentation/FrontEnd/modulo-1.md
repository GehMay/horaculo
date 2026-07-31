## Módulo 1: Core de Autenticação e Roteamento Privado (Auth & Routing)

Este módulo resolve três problemas fundamentais no frontend: como armazenar a sessão com segurança, como garantir que cada requisição para o FastAPI esteja autenticada e como impedir que um usuário acesse telas que não pertencem ao seu nível de acesso.

### 1. Configuração do Cliente HTTP (Axios Interceptors)

Em vez de espalhar `fetch` ou `axios.get` por todos os componentes do sistema e ter que lembrar de colocar o token no cabeçalho em cada chamada, criamos uma instância global do Axios.

* **Ação de Injeção (Request Interceptor):** Antes de qualquer requisição sair do React para o FastAPI, o interceptor busca o token (ex: no `localStorage` ou em um estado global) e injeta silenciosamente o cabeçalho `Authorization: Bearer <token>`.
* **Ação de Tratamento de Erro (Response Interceptor):** Se o FastAPI devolver um erro `401 Unauthorized` (sinalizando que o token expirou ou é inválido), o interceptor captura esse erro globalmente, limpa o token do armazenamento local e força o redirecionamento do usuário para a tela de `/login`.

### 2. Gerenciamento de Estado Global

O React precisa saber a todo momento quem está logado para adaptar a interface (exibir o menu da empresa ou o menu do aluno).

* **Implementação:** Utilize a **Context API** nativa do React ou uma biblioteca leve como o **Zustand**.
* **O que armazenar:** O estado global deve guardar o token JWT e o objeto do usuário retornado pela rota `GET /api/v1/auth/me` (que contém o `id`, `role` e `status`).
* **Fluxo de Inicialização:** Toda vez que a aplicação é recarregada (F5), o React verifica se existe um token salvo. Se existir, ele bate na rota `/auth/me` em *background* para revalidar a sessão e repopular o estado global antes de renderizar as telas protegidas.

### 3. Roteamento e Proteção (React Router)

A navegação precisa refletir a separação de papéis (RBAC) que definimos no backend. Para isso, criamos um componente chamado `<PrivateRoute>` (ou `<ProtectedRoute>`).

* **Lógica do Componente:**
1. Verifica se o usuário está logado (possui token válido). Se não, joga para `/login`.
2. Verifica se a rota atual exige uma `role` específica. Se a rota for o painel da FECAP (`/admin`) e a `role` do usuário logado for `ALUNO`, o componente bloqueia o acesso e o redireciona para a tela inicial correta dele (`/dashboard-aluno`).


* **Estrutura de Rotas:**
* `/login`, `/cadastro` -> Rotas Públicas.
* `/dashboard-aluno`, `/vagas` -> `<PrivateRoute allowedRoles="{['ALUNO']}">`
* `/dashboard-empresa`, `/candidatos` -> `<PrivateRoute allowedRoles="{['EMPRESA']}">`



### 4. O Fluxo de Onboarding (A "Trava" do Sistema)

Como definimos no Módulo 2 do backend, a tabela `users` é genérica, mas o sistema precisa dos dados específicos (RA, CNPJ) para funcionar.

* **A Regra de Ouro da Interface:** Após o usuário passar pela tela de login com sucesso, o React avalia os dados recebidos. Se o perfil não estiver completo (por exemplo, falta o RA do aluno), o sistema o redireciona obrigatoriamente para a tela `/completar-perfil`.
* **Bloqueio Total:** O menu lateral de navegação (Sidebar) deve ficar oculto ou desabilitado enquanto ele estiver nesta tela. Ele não pode acessar o motor de vagas nem visualizar eventos sem antes enviar o payload correto para `PUT /api/v1/profiles/aluno` (ou empresa/mentor).
* **Feedback Visual:** Para contas do tipo Empresa e Mentor, após completarem o perfil, o status no banco de dados será `PENDENTE`. A interface deve exibir uma tela de "Aguardando Aprovação" e bloquear o acesso ao Dashboard até que a conta Bootstrap da FECAP altere o status para `ATIVO`.

O Workspace do Aluno é a vitrine principal do projeto. É aqui que o estudante visualiza o valor prático das suas atividades extracurriculares e interage com o motor de empregabilidade. Como o público-alvo são jovens universitários, a interface precisa ser altamente responsiva (Mobile-First) e visualmente estimulante.