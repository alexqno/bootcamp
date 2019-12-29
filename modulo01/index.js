const express = require('express');

const server = express();
server.use(express.json());

let countRequests = 0;
const projects = [];

server.use((req, res, next) => {
    console.log(`${++countRequests} requisições executadas`);
    return next();
});

function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
    
    if(!project) {
        return res.status(400).json({ error: "Project does not exists" });
    }

    return next();
    
}

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project);
    
    return res.json(project);
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    
    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(project);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    
    let idx = project = projects.findIndex(p => p.id == id);

    projects.splice(idx, 1);

    return res.send();
});

/**
 * Tasks
 */

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    
    const project = projects.find(p => p.id == id);;

    project.tasks.push(title);

    return res.json(project);
});

server.listen(3000);