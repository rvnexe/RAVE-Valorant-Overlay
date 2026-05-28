const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Path to the state.json file
const stateFilePath = path.join(__dirname, 'state.json');

// Load the state from the JSON file
let overlayState = {
    "format": "bo5",
    "half": "1",
    "map": "4",
    "mapname": "Lotus",
    "event_name": "Valorant Champions 2024",
    "event_stage": "Playoffs: Lower Final",
    "color": "#b6a56d",
    "timeout": {
        "max": 2,
        "isActive": 0,
        "team": "L",
        "L_remain": 2,
        "R_remain": 2
    },
    "header": {
        "type": "mp",
        "isActive": 0,
        "team": "L"
    },
    "nameL": "LEVIATÁN",
    "abbrL": "LEV",
    "logoL": "./userdata/lev.png",
    "scoreL": 1,
    "p1L": "Mazino",
    "p2L": "kiNgg",
    "p3L": "aspas",
    "p4L": "tex",
    "p5L": "C0M",
    "CL": "Itopata",
    "nameR": "Team Heretics",
    "abbrR": "TH",
    "logoR": "./userdata/th.png",
    "scoreR": 2,
    "p1R": "MiniBoo",
    "p2R": "Boo",
    "p3R": "RieNs",
    "p4R": "benjyfishy",
    "p5R": "Wo0t",
    "CR": "neilzinho"
};
let winby = {"bo5": "3", "bo3": "2", "bo1": "1"};

// Load the state from the JSON file
function loadStateFile() {
    if (fs.existsSync(stateFilePath)) {
        try {
            const data = fs.readFileSync(stateFilePath, "utf-8");
            overlayState = JSON.parse(data);
            console.log("State configuration loaded.");
        } catch (error) {
            console.error("Error reading state file:", error);
        }
    }
}
loadStateFile();

// Save the state to the JSON file
function saveStateToFile() {
    try {
        fs.writeFileSync(stateFilePath, JSON.stringify(overlayState, null, 2));
        console.log('State configuration saved.');
    } catch (error) {
        console.error('Error saving state to file:', error);
    }
}

app.use(express.static('public'));
console.log('====================================');
console.log('  RAVE VALORANT OBSERVER OVERLAY');
console.log('  BY RVNeXe.github.io');
console.log('====================================');

if (!fs.existsSync(stateFilePath)) {
    fs.writeFileSync(stateFilePath, JSON.stringify(overlayState, null, 2));
    console.log('!!!! Couldn\'t find State configuration file, So recreated it with default sample state.');
}

io.on('connection', (socket) => {
    // console.log('A user connected:', socket.id);

    // Send the current state to the newly connected client
    socket.emit('initialize-overlay', overlayState);

    socket.on('request-state', () => {
        console.log('Received an update request.');
        socket.emit('answer', overlayState);
    })

    // Receive admin commands
    socket.on('admin-command', (data) => {
        console.log('Received command:', data);

        // Update the state on the server
        switch (data.action) {
            case 'change-color':
                overlayState.color = data.value;
                break;
            case 'update':
                overlayState[data.target] = data.value;
                break;
            case 'reload-file':
                loadStateFile();
                break;
            case 'apply-format':
                overlayState.format = data.value;
                overlayState.scoreL = 0;
                overlayState.scoreR = 0;
                break;
            case 'score-add':
                if (overlayState['score'+data.value] != winby[overlayState.format]) {
                    overlayState['score'+data.value] ++;
                }
                break;
            case 'score-rem':
                if (overlayState['score'+data.value] != 0) {
                    overlayState['score'+data.value] --;
                }
                break;
            case 'timeout-start':
                overlayState.timeout.isActive = 1;
                overlayState.timeout[data.value+'_remain'] --;
                overlayState.timeout.team = data.value;
                break;
            case 'timeout-end':
                overlayState.timeout.isActive = 0;
                break;
            case 'timeout-reset':
                overlayState.timeout.isActive = 0;
                overlayState.timeout.L_remain = overlayState.timeout.max;
                overlayState.timeout.R_remain = overlayState.timeout.max;
                break;
            case 'header-start':
                overlayState.header.isActive = 1;
                overlayState.header.team = data.team;
                overlayState.header.type = data.type;
                break;
            case 'header-end':
                overlayState.header.isActive = 0;
                break;
            default:
                console.log('Unknown command:', data.action);
                break;
        }

        // Save the updated state to the JSON file
        if (data.action != 'reload-file') {
            saveStateToFile();
        }

        // Broadcast the update to all connected clients (overlay and admin)
        socket.broadcast.emit('update-overlay', overlayState);
        io.emit('admin-update', overlayState); // Notify admins of the updated state
    });

    socket.on('disconnect', () => {
        // console.log('A user disconnected:', socket.id);
    });
});

const PORT = 7777;
server.listen(PORT, () => {
    console.log(`Server is now running on localhost:${PORT}`);
    console.log(`- Admin page: http://localhost:${PORT}/admin.html`);
    console.log(`- Match setup page: http://localhost:${PORT}/setup.html`);
    console.log(' ');
    console.log(`- Overlay: http://localhost:${PORT}/overlay.html`);
});
