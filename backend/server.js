const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Abilita il middleware CORS per tutte le richieste
app.use(cors());
app.use(express.json());

// Connessione al database SQLite
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('Errore di connessione al database:', err.message);
    } else {
        console.log('Connesso al database SQLite');
        // Creazione della tabella tasks se non esiste
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            completed BOOLEAN NOT NULL
        )`);
    }
});

// 1. Creare una nuova attività (task)
app.post('/tasks', (req, res) => {
    const { name } = req.body;
    const sql = `INSERT INTO tasks (name, completed) VALUES (?, ?)`;
    db.run(sql, [name, false], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, completed: false });
    });
});

// 2. Ottenere la lista di tutte le attività
app.get('/tasks', (req, res) => {
    const sql = `SELECT * FROM tasks`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 3. Modificare lo stato di un'attività (completata/non completata)
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE tasks SET completed = NOT completed WHERE id = ?`;
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Stato aggiornato' });
    });
});

// 4. Eliminare un'attività
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tasks WHERE id = ?`;
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
