# To-Do List Project (test Instal)

Questo progetto è composto da due parti principali:
1. **Backend**: Un'API REST per la gestione delle task, costruita con Node.js e Express.
2. **Frontend**: Un'applicazione Angular che utilizza un servizio per comunicare con l'API e gestire le task.

Puoi testare direttamente dall'app il funzionamento dell'API, in alternativa con Postman o Curl.

## Prerequisiti

Assicurati di avere installato Docker e Docker Compose.

## Comandi di base

Il progetto utilizza un Makefile per semplificare le operazioni. I comandi principali sono:

### 1. Avvio dell'applicazione

Per costruire e avviare i container, eseguire il seguente comando:

`make run`

Questo comando eseguirà i seguenti passaggi:

Installerà le dipendenze del frontend e del backend.
Costruirà i container Docker per il frontend e il backend.
Avvierà i container.

### 2. Fermare i container
Per fermare i container in esecuzione, eseguire:

`make down`

Questo comando fermerà i container Docker.

### 3. Riavviare i container

Per fare una pulizia completa, ricostruire i container e avviarli di nuovo:

`make restart`

### 4. Pulizia completa

Per eseguire una pulizia completa del progetto, che include la rimozione dei container, delle immagini Docker e dei file generati localmente, eseguire:

`make full-clean`

###  Architettura del progetto

**Backend**

Il backend è un'API REST costruita con Node.js e Express che gestisce una lista di task. L'API permette di eseguire le seguenti operazioni:

GET /tasks: Ottiene tutte le task.

POST /tasks: Crea una nuova task.

PUT /tasks/:id: Modifica una task esistente.

DELETE /tasks/:id: Elimina una task.

Il backend utilizza SQLite per la persistenza dei dati, quindi i dati delle task saranno memorizzati in un database locale.

**Frontend**

Il frontend è un'applicazione Angular che interagisce con il backend tramite un servizio che richiama le API descritte sopra. Le funzionalità principali del frontend includono:

Visualizzazione della lista delle task.

Creazione di nuove task.

Modifica dello stato delle task (completata/non completata).

Eliminazione delle task.

L'app Angular è configurata per funzionare sulla porta 4200, mentre il backend funziona sulla porta 3000.

###  Dettagli tecnici

Frontend: Angular 15 o superiore

Backend: Node.js 18

Database: SQLite

Containerizzazione: Docker con Docker Compose
