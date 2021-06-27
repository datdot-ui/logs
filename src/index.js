const styleSheet = require('supportCSSStyleSheet')
const bel = require('bel')
const file = require('path').basename(__filename)

module.exports = logs

function logs ( protocol ) {
    const sender = protocol ( get )
    sender({from: 'logs', flow: 'logs-layout', type: 'ready', fn: 'logs', file, line: 8})
    const ilog = document.createElement('i-log')
    const shadow = ilog.attachShadow({mode: 'closed'})
    const title = bel`<h4>Logs</h4>`
    const content = bel`<section class="content">${title}</section>`
    const logList = document.createElement('log-list')
    styleSheet(shadow, style)
    content.append(logList)
    shadow.append(content)

    document.addEventListener('DOMContentLoaded', () => {
        logList.scrollTop = logList.scrollHeight
    })

    return ilog

    function get ({page = 'Demo', from, flow, type, body, fn, file, line}) {
        try {
            const f = flow ? bel`<span class="flow">${flow} :: </span>` : ''
            var log = bel`
            <aside class="list">
                <span aria-label=${page} class="page">${page}</span>
                <div class="log">
                    <span aria-label="info" class="info">${f} ${from}</span>
                    <span aria-type="${type}" class="type">${type}</span>
                    <span aira-label="message" class="message">${typeof body === 'object' ? JSON.stringify(body) : body}</span>
                    ${fn && bel`<span aria-type="${fn}" class="function">Fn: ${fn}</span>`}
                </div>
                <div class="file">${file} : ${line}</div>
            </aside>
            `
            logList.append(log)
            logList.scrollTop = logList.scrollHeight
            
        } catch (error) {
            document.addEventListener('DOMContentLoaded', () => {
                logList.append(log)
            })
            return false
        }
    }
}

const style = `
:host(i-log) {}
:host(i-log) .content {
    --bgColor: var(--color-dark);
    --opacity: 1;
    width: 100%;
    height: 100%;
    font-size: var(--size12);
    color: #fff;
    background-color: hsla( var(--bgColor), var(--opacity));
}
:host(i-log) h4 {
    --bgColor: var(--color-deep-black);
    --opacity: 1;
    margin: 0;
    padding: 10px 10px;
    color: #fff;
    background-color: hsl( var(--bgColor), var(--opacity) );
}
:host(i-log) log-list {
    display: block;
    height: calc(100% - 44px);
    overflow-y: auto;
    margin: 8px;
}
:host(i-log) .list {
    --bgColor: 0, 0%, 30%;
    --opacity: 0.25;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: minmax(auto, 60px) auto;
    grid-column-gap: 10px;
    padding: 2px 10px 4px 10px;
    margin-bottom: 4px;
    background-color: hsla( var(--bgColor), var(--opacity) );
    border-radius: 8px;
    transition: background-color 0.6s ease-in-out;
}
:host(i-log) log-list .list:last-child {
    --bgColor: var(--color-verdigris);
    --opacity: 0.5;
}
:host(i-log) .log {
    grid-column-start: 2;
    line-height: 2.2;
    word-break: break-all;
    white-space: pre-wrap;
}
:host(i-log) .log span {
    --size: var(--size12);
    font-size: var(--size);
}
:host(i-log) .info {}
:host(i-log) .type {
    --color: var(--color-greyD9);
    --bgColor: var(--color-greyD9);
    --opacity: .25;
    color: hsl( var(--color) );
    background-color: hsla( var(--bgColor), var(--opacity) );
    padding: 2px 10px;
    border-radius: 8px;
}
:host(i-log) log-list .list:last-child .type {}
:host(i-log) .page {
    --color: var(--color-maximum-blue-green);
    display: grid;
    color: hsl( var(--color) );
    border: 1px solid hsl( var(--color) );
    padding: 2px 4px;
    border-radius: 4px;
    grid-row-start: span 2;
    justify-content: center;
    align-items: center;
}
:host(i-log) .file {
    --color: var(--color-grey70);
    display: grid;
    color: hsl( var(--color) );
    justify-content: right;
}
:host(i-log) log-list .list:last-child .file {
    --color: var(--color-white);
}
:host(i-log) [aria-type="click"] {
    --color: var(--color-dark);
    --bgColor: var(--color-yellow);
    --opacity: 1;
}
:host(i-log) [aria-type="triggered"] {
    --color: var(--color-white);
    --bgColor: var(--color-blue-jeans);
    --opacity: .5;
}
:host(i-log) [aria-type="opened"] {
    --bgColor: var(--color-slate-blue);
    --opacity: 1;
}
:host(i-log) [aria-type="closed"] {
    --bgColor: var(--color-ultra-red);
    --opacity: 1;
}
:host(i-log) [aria-type="error"] {
    --color: var(--color-white);
    --bgColor: var(--color-red);
    --opacity: 1;
}
:host(i-log) [aria-type="warning"] {
    --color: var(--color-white);
    --bgColor: var(--color-deep-saffron);
    --opacity: 1;
}
:host(i-log) [aria-type="checked"] {
    --color: var(--color-dark);
    --bgColor: var(--color-blue-jeans);
    --opacity: 1;
}
:host(i-log) [aria-type="unchecked"] {
    --bgColor: var(--color-blue-jeans);
    --opacity: .3;
}
:host(i-log) [aria-type="selected"] {
    --color: var(--color-dark);
    --bgColor: var(--color-lime-green);
    --opacity: 1;
}
:host(i-log) [aria-type="unselected"] {
    --bgColor: var(--color-lime-green);
    --opacity: .25;
}

:host(i-log) log-list .list:last-child [aria-type="ready"] {
    --bgColor: var(--color-deep-black);
    --opacity: 0.3;
}
:host(i-log) .function {
    --color: 0, 0%, 70%;
    color: var(--color);
}
:host(i-log) log-list .list:last-child .function {
    --color: var(--color-white);
}
:host(i-log) [aria-label="demo"] {}
`