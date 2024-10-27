
DOCKER_COMPOSE=docker-compose
PROJECT_NAME=test


.PHONY: build up down clean restart full-clean run install


build:
	@echo "Costruzione dei container..."
	$(DOCKER_COMPOSE) build


install:
	@echo "Installazione delle dipendenze..."
	cd to-do-list && npm install
	cd backend && npm install


up:
	@echo "Avvio dei container..."
	$(DOCKER_COMPOSE) up


down:
	@echo "Arresto dei container..."
	$(DOCKER_COMPOSE) down


clean:
	@echo "Pulizia dei container e delle immagini Docker associate..."
	$(DOCKER_COMPOSE) down --rmi all
	@echo "Rimozione dei volumi orfani..."
	$(DOCKER_COMPOSE) down -v
	@echo "Pulizia completata!"


restart: clean build up


full-clean: clean
	@echo "Pulizia dei file locali..."
	rm -rf to-do-list/node_modules to-do-list/dist
	rm -rf backend/node_modules
	@echo "Pulizia completa eseguita!"


run: install build up
	@echo "Applicazione costruita e lanciata con successo!"
