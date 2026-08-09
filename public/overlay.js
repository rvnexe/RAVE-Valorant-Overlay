const socket = io();

function setMapScore(team, format, score) {
    if (format != "bo5") {
        let i = score;
        while (i > 0) {
            document.getElementById("mp" + team + i).setAttribute("fill", "");
            i--;
        }

        let j = 2;
        while (j > score) {
            document.getElementById("mp" + team + j).removeAttribute("fill");
            j--;
        }
    } else {
        let i = score;
        while (i > 0) {
            document
                .getElementById("mp" + team + (i - 1))
                .setAttribute("fill", "");
            i--;
        }

        let j = 2;
        while (j >= score) {
            document.getElementById("mp" + team + j).removeAttribute("fill");
            j--;
        }
    }
    return;
}
function removeAllHeaders() {
    document.querySelectorAll(".mpt").forEach((element) => {
        element.removeAttribute("show", "");
    });
    document.querySelectorAll(".mpl").forEach((element) => {
        element.removeAttribute("show", "");
    });
    document.querySelectorAll(".tpt").forEach((element) => {
        element.removeAttribute("show", "");
    });
}

function removeButMatchPoint() {
    document.querySelectorAll(".tpt").forEach((element) => {
        element.removeAttribute("show", "");
    });
}
function removeButTechPause() {
    document.querySelectorAll(".mpt").forEach((element) => {
        element.removeAttribute("show", "");
    });
    document.querySelectorAll(".mpl").forEach((element) => {
        element.removeAttribute("show", "");
    });
}

function updateOverlay(state) {
    switch (state.format) {
        case "bo1":
            document.getElementById("map-points").classList = "bo1";
            break;
        case "bo3":
            document.getElementById("map-points").classList = "bo3";
            break;
        case "bo5":
            document.getElementById("map-points").classList = "bo5";
            break;
    }

    switch (state.half) {
        case "1":
            document.getElementById("nameplateL").classList = "ct";
            document.getElementById("nameplateR").classList = "t";
            break;
        case "2":
            document.getElementById("nameplateL").classList = "t";
            document.getElementById("nameplateR").classList = "ct";
            break;
    }

    document.getElementById("abbrL").innerHTML = state.abbrL;
    document.getElementById("logoL").style = `content: url("${state.logoL}")`;
    setMapScore("L", state.format, state.scoreL);

    document.getElementById("abbrR").innerHTML = state.abbrR;
    document.getElementById("logoR").style = `content: url("${state.logoR}")`;
    setMapScore("R", state.format, state.scoreR);

    if (state.timeout.isActive == 1) {
        document.getElementById("ttname").innerText =
            state["name" + state.timeout.team];
        document.getElementById("ttused").innerText =
            state.timeout.max -
            state.timeout[state.timeout.team + "_remain"] +
            "/" +
            state.timeout.max;
        document.getElementById("ttlogo").style = `content: url("${
            state["logo" + state.timeout.team]
        }")`;
        document.getElementById("ttglow").classList = "ctglow ttt";
        if (
            (state.half == 1 && state.timeout.team == "R") ||
            (state.half == 2 && state.timeout.team == "L")
        ) {
            document.getElementById("ttglow").classList = "tglow ttt";
        }
        document.querySelectorAll(".ttt").forEach((element) => {
            element.setAttribute("show", "");
        });
        document.querySelectorAll(".ttn").forEach((element) => {
            element.style.display = "block";
        });
        ttanima.forEach((i) => i.beginElement());
    } else {
        document.querySelectorAll(".ttt").forEach((element) => {
            element.removeAttribute("show", "");
        });
        document.querySelectorAll(".ttn").forEach((element) => {
            element.style.display = "none";
        });
        setTimeout(() => {
            ttanima.forEach((i) => i.endElement());
        }, 500);
    }

    if (state.header.isActive == 1) {
        switch (state.header.type) {
            case "mp":
                removeAllHeaders();
                document.getElementById("mpname").innerText =
                    state["name" + state.header.team];
                document.querySelectorAll(".mpt").forEach((element) => {
                    element.setAttribute("show", "");
                });
                if (
                    (state.half == 1 && state.header.team == "R") ||
                    (state.half == 2 && state.header.team == "L")
                ) {
                    document
                        .getElementById("mpbg")
                        .setAttribute("fill", "rgb(120, 48, 68)");
                } else {
                    document
                        .getElementById("mpbg")
                        .setAttribute("fill", "rgb(45, 143, 113)");
                }
                document
                    .getElementById("mpline" + state.header.team)
                    .setAttribute("show", "");
                break;
            case "tp":
                removeButTechPause();
                document.querySelectorAll(".tpt").forEach((element) => {
                    element.setAttribute("show", "");
                });
                break;
            default:
                break;
        }
    } else {
        removeAllHeaders();
    }
}

// Set up the overlay based on the server's state
socket.on("initialize-overlay", (state) => {
    updateOverlay(state);
    ttanima.forEach((i) => i.endElement());
});

// Listen for updates from admin
socket.on("update-overlay", (data) => {
    updateOverlay(data);
    /* switch (data.action) {
                case 'change-color':
                    document.body.style.backgroundColor = data.value;
                    console.log(`Changing color to: ${data.value}`);
                    break;

                case 'update-text':
                    document.getElementById(data.target).innerText = data.value;
                    console.log(`Updating text to: ${data.value}`);
                    break;

                case 'update-image':
                    document.getElementById(data.target).style = `content: url("${data.value}")`;
                    console.log(`Updating ${data.target} to: ${data.value}`);
                    break;
                case 'apply-format':
                    switch (data.value) {
                        case "bo1":
                            document.getElementById('map-points').classList = "bo1"
                            break;
                        case "bo3":
                            document.getElementById('map-points').classList = "bo3"
                            break;
                        case "bo5":
                            document.getElementById('map-points').classList = "bo5"
                            break;
                    }
                    break;

                default:
                    console.log('Unknown action:', data.action);
                    break;
            }*/
});
