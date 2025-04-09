
DOCKER_COMPOSE=docker-compose
PROJECT_NAME=test


.PHONY: build up down clean restart full-clean run install reset-db


build:
	@echo "Costruzione dei container..."
	$(DOCKER_COMPOSE) -p $(PROJECT_NAME) build


install:
	@echo "Installazione delle dipendenze frontend..."
	cd to-do-list && npm install
	@echo "Installazione delle dipendenze backend con Node 18..."
	cd backend && bash -c '\
		source $$HOME/.nvm/nvm.sh && \
		if ! nvm ls 18 > /dev/null 2>&1; then \
			echo "Node 18 non trovato, installazione..."; \
			nvm install 18; \
		fi && \
		nvm exec 18 npm install \
	'


up:
	@echo "Avvio dei container..."
	$(DOCKER_COMPOSE) -p $(PROJECT_NAME) up


down:
	@echo "Arresto dei container..."
	$(DOCKER_COMPOSE) -p $(PROJECT_NAME) down


clean:
	@echo "Pulizia dei container e delle immagini Docker (ma non dei volumi/dati)..."
	$(DOCKER_COMPOSE) -p $(PROJECT_NAME) down --rmi all --remove-orphans
	@echo "Pulizia completata! (i dati sono stati preservati)"


restart: clean build up


fclean:
	@echo "Pulizia totale di Docker (container, immagini, volumi, reti)..."
	$(DOCKER_COMPOSE) -p $(PROJECT_NAME) down --rmi all --volumes --remove-orphans
	@echo "Rimozione dei file locali..."
	rm -rf to-do-list/node_modules to-do-list/dist
	rm -rf backend/node_modules
	@echo "Pulizia completa eseguita!"

reset-db:
	@echo "Reset del database: eliminazione del file tasks.db..."
	rm -f backend/tasks.db

run: install build up
	@echo "Applicazione costruita e lanciata con successo!"
