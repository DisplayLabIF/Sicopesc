# Sicopesc - Sistema de Controle de Pescadores

### Pré-requisitos
- Docker
- Docker Compose
- Git

### Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd Sicopesc
```

2. **Execute o script para orquestrar a ordem dos containers do backend:**
```bash
cd Sicopesc/Backend/ 

    curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
chmod +x wait-for-it.sh
```
3. **Configuere as variaveis de ambiente do Backend e Frontend:**
```bash
# .env do backend
cd Sicopesc/Backend/

sudo nano .env

# Adicione essas variaveis

PORT=4000 #não alterar
NODE_ENV=nome

DB_HOST=db_siscol #não alterar
DB_PORT=3306
DB_USER=nome_do_usuario
DB_PASS=senha_do_banco
DB_NAME=siscol0_production
DB_ROOT_PASS=senha_do_root
DB_DIALECT=mysql #não alterar

# .env do Frontend
cd Sicopesc/Frontend/

sudo nano .env


# Adicione a variavel

REACT_APP_API_URL=http://localhost:4000
```

4. **Inicie os containers:**
```bash
# Iniciar o container do Backend

cd Sicopesc/Backend/

sudo docker compose down && sudo docker compose up --build

# Iniciar o container do Frontend

cd Sicopesc/Frontend/

sudo docker compose down && sudo docker compose up --build
```
5. **Acesse o sistema:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- phpMyAdmin: http://localhost:8082

## Estrutura do Projeto

```
Sicopesc/
├── Backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── controllers/    # Controladores da API
│   │   ├── models/         # Modelos do Sequelize
│   │   ├── routes/         # Rotas da API
│   │   └── database/
│   │       └── migrations/ # Migrações do banco
│   └── docker-compose.yml  # Configuração Docker Backend
├── Frontend/               # Interface React
│   ├── src/
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── components/    # Componentes React
│   │   └── services/      # Serviços de API
│   └── docker-compose.yml # Configuração Docker Frontend
└── setup.sh               # Script de setup automático
```

### Ver logs dos containers:
```bash
# Backend
sudo docker logs backend-siscol-container

# Frontend
sudo docker logs frontend-sicopesc
```

### Parar serviços:
```bash
# Backend
cd Backend && sudo docker-compose down

# Frontend
cd Frontend && sudo docker-compose down
```

### Reiniciar serviços:
```bash
# Backend
cd Backend && sudo docker-compose restart

# Frontend
cd Frontend && sudo docker-compose restart
```

### Problema: Página não renderiza
```bash
sudo docker logs frontend-sicopesc
```

DB_HOST=nome_da_maquina
### Problema: API não responde
```bash
sudo docker logs backend-siscol-container
```

### Problema: Banco não conecta
```bash
sudo docker logs mysql-container
``` 
