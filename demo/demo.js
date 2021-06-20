const bel = require('bel')
const csjs = require('csjs-inject')
const file = require('path').basename(__filename)
const logs = require('..')

function demoApp () {
    const recipients = []
    const logList = logs( protocol('logs') )
    recipients['logs']({from: 'logs', type: 'ready', fn: 'demoApp', file, line: 9})
    const container = bel`
    <div class="${css.container}">
        <h1>Logs event</h1>
        <div class="${css.actions}">
            <button class="btn" role="button" aria-label="Click" onclick=${() => handleClick('click') }>Click</button>
            <button class="btn" role="button" aria-label="Open" onclick=${() => handleOpen('open') }>Open</button>
            <button class="btn" role="button" aria-label="Close" onclick=${() => handleClose('close') }>Close</button>
            <button class="btn" role="button" aria-label="Error" onclick=${() => handleError('error') }>Error</button>
            <button class="btn" role="button" aria-label="Warning" onclick=${() => handleWarning('warning') }>Warning</button>
        </div>
    </div>`

    const app = bel`
    <div class="${css.wrap}" data-state="debug">
        ${container}${logList}
    </div>`

    return app

    function handleClick (target) {
        recipients['logs']({page: 'JOBS', from: target, flow: 'button', type: 'click', fn: 'handleClick', file, line: 28})
    }
    function handleOpen (target) {
        recipients['logs']({page: 'PLAN', from: target, flow: 'modal/button', type: 'opened', fn: 'handleOpen', file, line: 31})
    }
    function handleClose (target) {
        recipients['logs']({page: 'PLAN', from: target, flow: 'modal/button', type: 'closed', fn: 'handleClose', file, line: 34})
    }
    function handleError (target) {
        recipients['logs']({page: 'USER', from: target, flow: 'transfer', type: 'error', fn: 'handleError', file, line: 37})
    }
    function handleWarning (target) {
        recipients['logs']({page: 'PLAN ', from: target, flow: 'plan', type: 'warning', fn: 'handleError', file, line: 37})
    }
    function protocol (name) {
        return sender => {
            recipients[name] = sender
            return (msg) => {
                const {page, from, flow, type, body, fn, file, line} = msg
                // console.log( `type: ${type}, file: ${file}, line: ${line}`);
                recipients['logs'](msg)
            }
        }
    }
}

const css = csjs`
:root {
    --b: 0, 0%;
    --r: 100%, 50%;
    --color-white: var(--b), 100%;
    --color-black: var(--b), 0%;
    --color-dark: 223, 13%, 20%;
    --color-deep-black: 222, 18%, 11%;
    --color-blue: 214, var(--r);
    --color-red: 358, 99%, 53%;
    --color-orange: 35, 100%, 58%;
    --color-deep-saffron: 31, 100%, 56%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-maya-blue: 205, 96%, 72%;
    --color-slate-blue: 248, 56%, 59%;
    --color-blue-jeans: 204, 96%, 61%;
    --color-dodger-blue: 213, 90%, 59%;
    --color-slimy-green: 108, 100%, 28%;
    --color-maximum-blue-green: 180, 54%, 51%;
    --color-green-pigment: 136, 81%, 34%;
    --color-yellow: 44, 100%, 55%;
    --color-chrome-yellow: 39, var(--r);
    --color-bright-yellow-crayola: 35, 100%, 58%;
    --color-purple: 283, var(--r);
    --color-medium-purple: 269, 100%, 70%;
    --color-grey33: var(--b), 20%;
    --color-grey66: var(--b), 40%;
    --color-grey70: var(--b), 44%;
    --color-grey88: var(--b), 53%;
    --color-greyA2: var(--b), 64%;
    --color-greyC3: var(--b), 76%;
    --color-greyCB: var(--b), 80%;
    --color-greyD8: var(--b), 85%;
    --color-greyD9: var(--b), 85%;
    --color-greyE2: var(--b), 89%;
    --color-greyEB: var(--b), 92%;
    --color-greyED: var(--b), 93%;
    --color-greyEF: var(--b), 94%;
    --color-greyF2: var(--b), 95%;
    --color-green: 136, 81%, 34%;
    --transparent: transparent;
    --define-font: *---------------------------------------------*;
    --size12: 1.2rem;
    --size14: 1.4rem;
    --size16: 1.6rem;
    --size18: 1.8rem;
    --size20: 2rem;
    --size22: 2.2rem;
    --size24: 2.4rem;
    --size26: 2.6rem;
    --size28: 2.8rem;
    --size30: 3rem;
    --size32: 3.2rem;
    --size36: 3.6rem;
    --size40: 4rem;
    --define-primary: *---------------------------------------------*;
    --primary-color: var(--color-black);
    --primary-bgColor: var(--color-greyF2);
    --primary-font: Arial, sens-serif;
    --primary-font-size: var(--size16);
}
* {
    box-sizing: border-box;
}
html {
    font-size: 62.5%;
}
body {
    font-size: var(--primary-font-size);
    font-family: var(--primary-font);
    background-color: hsl( var(--primary-bgColor) );
}
button {
    --color: var(--color-black);
    --bgColor: var(--color-white);
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    color: hsl( var(--color) );
    background-color: hsl( var(--bgColor) );
    transition: background-color .3s, color .3s ease-in-out;
    cursor: pointer;
}
button:hover {
    --color: var(--color-white);
    --bgColor: var(--color-dark);
}
.wrap {
    display: grid;
}
.container {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 90%;
    justify-content: center;
    padding: 20px 0 80px 0;
}
[data-state="debug"] {
    grid-template-rows: auto;
    grid-template-columns: 60vw auto;
}
.actions {
    display: grid;
    grid-auto-flow: column;
    gap: 8px;
}
@media (max-width: 960px) {
    [data-state="debug"] {
        grid-template-rows: auto;
        grid-template-columns: auto;
        padding-bottom: 28vh;
    }
}
`

document.body.append( demoApp() )