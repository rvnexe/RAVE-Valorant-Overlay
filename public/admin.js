const socket = io();

const winby = { bo5: "3", bo3: "2", bo1: "1" };
const applyables = [ "logoL", "logoR", "abbrL", "abbrR", "nameL", "nameR", "event_name", "event_stage"];

let localstate = {};

function setText(el, value) {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.value = value;
    } else {
        el.innerText = value;
    }
}
function setImg(el, value) {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.value = value;
    } else {
        el.style.content = `url("${value}")`;
    }
}

// Update admin panel UI when state changes
function updateAdminUI(state) {
    let tm = "";
    if (state.timeout.isActive == 1) {
        tm =
            " - TIMEOUT ACTIVE: " +
            state["name" + state.timeout.team].toUpperCase();
    }
    document.querySelectorAll(".eventname").forEach((el) => {
        setText(el, state.event_name);
    });
    document.querySelectorAll(".eventstage").forEach((el) => {
        setText(el, state.event_stage);
    });
    document.getElementById("map").innerText =
        "Map " +
        state.map +
        ": " +
        state.mapname +
        " - Half " +
        state.half +
        tm;

    // Left LLLLLLLLLLLLLL
    document.querySelectorAll(".tnameL").forEach((el) => {
        setText(el, state.nameL);
    });
    document.querySelectorAll(".abbrL").forEach((el) => {
        setText(el, state.abbrL.toUpperCase());
    });
    document.querySelectorAll(".logoL").forEach((el) => {
        setImg(el, state.logoL);
    });
    document.getElementById("scoreL").innerText =
        "■".repeat(state.scoreL) +
        "□".repeat(winby[state.format] - state.scoreL);
    document.getElementById("remL").innerText = state.timeout.L_remain;

    // Right RRRRRRRRRRRRR
    document.querySelectorAll(".tnameR").forEach((el) => {
        setText(el, state.nameR);
    });
    document.querySelectorAll(".abbrR").forEach((el) => {
        setText(el, state.abbrR.toUpperCase());
    });
    document.querySelectorAll(".logoR").forEach((el) => {
        setImg(el, state.logoR);
    });
    document.getElementById("scoreR").innerText =
        "■".repeat(state.scoreR) +
        "□".repeat(winby[state.format] - state.scoreR);
    document.getElementById("remR").innerText = state.timeout.R_remain;

    if (state.half == "1") {
        document.getElementById("tl").classList = "ct";
        document.getElementById("tr").classList = "t";
    } else if (state.half == "2") {
        document.getElementById("tl").classList = "t";
        document.getElementById("tr").classList = "ct";
    }
}

function applySettings() {
    for (const i of applyables) {
        socket.emit("admin-command", {
            action: "update",
            target: i,
            value: document.querySelector(`#${i}`).value
        });
    }
    Edit0();
}

function Edit1() {
    document.querySelector('body').classList = 'editmode';
}
function Edit0() {
    document.querySelector('body').classList = 'noteditmode';
}

// Initialize the admin panel with the current state
socket.on("initialize-overlay", (state) => {
    updateAdminUI(state);
    localstate = state;
});

// Listen for updates from the server
socket.on("admin-update", (state) => {
    updateAdminUI(state);
    localstate = state;
});

// Request a state update to store locally
function requestState() {
    socket.emit("request-state");
    console.log("Sent an update request.");
}

// Process answer for state update request + also update the ui :p
socket.on("answer", (state) => {
    localstate = state;
    updateAdminUI(state);
});

// Send commands from admin panel
function sendCommand(action, value) {
    socket.emit("admin-command", { action: action, value: value });
}
function header(type, team) {
    socket.emit("admin-command", {
        action: "header-start",
        type: type,
        team: team,
    });
}

function update(target, source) {
    try {
        var value = document.getElementById(source).value;
    } catch (e) {
        value = source;
    }
    socket.emit("admin-command", {
        action: "update",
        target: target,
        value: value,
    });
}

// Switch sides
function switchsides() {
    if (localstate.half == "1") {
        update("half", "2");
    } else if (localstate.half == "2") {
        update("half", "1");
    }
}
