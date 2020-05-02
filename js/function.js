const context = {
    handCount: 0,
    isCircleTurn: true,
    cells: new Array(9),
    progress: true,
    cellElements: document.querySelectorAll('.js-cell'),
    restartButtonElement: document.querySelector('.js-restart'),
    circleElement: document.querySelector('.turn-item.circle'),
    crossElement: document.querySelector('.turn-item.cross'),
    stateMessageElement: document.querySelector('.js-state-message')
}

const STATUSES = {
    stating: 'starting...',
    win: '%name% win!!',
    draw: 'draw'
}

const CHARACTERS = {
    circle: '○',
    cross: '×'
}

const winLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWinner(cells) {
    for (let i = 0; i <= winLine.length - 1; i++) {
        const winLineCell = winLine[i];
        let a = cells[winLineCell[0]]
        let b = cells[winLineCell[1]]
        let c = cells[winLineCell[2]]
        if (a === undefined || b === undefined || c === undefined) {
            continue;
        }
        if (a === b && b === c) {
            return true;
        }
    }
}

function toggleTurn({ isCircleTurn, circleElement, crossElement }) {
    if (isCircleTurn) {
        circleElement.classList.remove('active')
        crossElement.classList.add('active')
    } else {
        circleElement.classList.add('active')
        crossElement.classList.remove('active')
    }
}

function onClickCell(e) {
    const { cells, progress, isCircleTurn, stateMessageElement } = context
    const index = Number(e.target.getAttribute('data-key')) - 1
    if (cells[index] || !progress) {
        return
    }

    const value = isCircleTurn ? CHARACTERS.circle : CHARACTERS.cross
    e.target.innerHTML = value
    cells[index] = value

    if (checkWinner(cells)) {
        context.progress = false
        const message = isCircleTurn ? STATUSES.win.replace('%name%', CHARACTERS.circle) : STATUSES.win.replace('%name%', CHARACTERS.cross)
        stateMessageElement.innerHTML = message
        return

    } else {
        toggleTurn(context)
        context.isCircleTurn = !context.isCircleTurn
    }

    context.handCount++
    if (context.handCount === 9) {
        context.progress = false
        stateMessageElement.innerHTML = STATUSES.draw
    }
}

function subscribe() {
    context.cellElements.forEach(item => {
        item.addEventListener('click', onClickCell)
    })
    context.restartButtonElement.addEventListener('click', () => location.reload())
}

subscribe()