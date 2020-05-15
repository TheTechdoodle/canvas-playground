document.body.innerHTML = '';

var iframe = document.createElement('iframe');
iframe.style.position = 'fixed';
iframe.style.width = '100vw';
iframe.style.height = '100vh';
iframe.style.zIndex = '10000';
iframe.style.top = '0';
iframe.style.border = 'none';
iframe.src = 'http://localhost:8080/#/';
document.body.appendChild(iframe);
window.iframe = iframe;

async function getCanvasTokens()
{
    let str = await fetch('/profile/settings').then(res => res.text());
    let dom = (new DOMParser()).parseFromString(str, 'text/html');
    let tokens = [];
    let tokenElements = dom.getElementById('access_tokens').getElementsByClassName('access_token');
    for(let el of tokenElements)
    {
        if(el.classList.contains('blank'))
        {
            continue;
        }
        
        tokens.push({
            name: el.getElementsByClassName('app_name')[0].innerText,
            purpose: el.getElementsByClassName('purpose')[0].innerText,
            expires: el.getElementsByClassName('expires')[0].innerText,
            used: el.getElementsByClassName('used')[0].innerText,
            tokenUrl: el.getElementsByClassName('show_token_link')[0].rel
        });
    }
    return tokens;
}

async function getCanvasTokenDetails()
{
    let tokens = await getCanvasTokens();
    let details = [];
    for(let token of tokens)
    {
        details.push(await fetch(token.tokenUrl, {
            headers: {
                'Accept': 'application/json, application/json+canvas-string-ids'
            }
        }).then(res => res.json()));
    }
    return details;
}

window.addEventListener('message', (event) =>
{
    if(event.data.hasOwnProperty('framePromiseID'))
    {
        if(event.data.name === 'fetch')
        {
            fetch(...event.data.args).then(res => res.json()).then(data =>
            {
                iframe.contentWindow.postMessage({
                    framePromiseID: event.data.framePromiseID,
                    resolve: data
                }, new URL(iframe.src).origin);
            }).catch((...args) =>
            {
                iframe.contentWindow.postMessage({
                    framePromiseID: event.data.framePromiseID,
                    reject: JSON.parse(JSON.stringify(args))
                }, new URL(iframe.src).origin);
            });
        }
        else if(event.data.name === 'tokens')
        {
            getCanvasTokens().then(data =>
            {
                iframe.contentWindow.postMessage({
                    framePromiseID: event.data.framePromiseID,
                    resolve: data
                }, new URL(iframe.src).origin);
            }).catch((data) => {
                iframe.contentWindow.postMessage({
                    framePromiseID: event.data.framePromiseID,
                    resolve: JSON.parse(JSON.stringify(data))
                }, new URL(iframe.src).origin);
            });
        }
        else if(event.data.name === 'tokenDetails')
        {
            getCanvasTokenDetails().then(data =>
            {
                iframe.contentWindow.postMessage({
                    framePromiseID: event.data.framePromiseID,
                    resolve: data
                }, new URL(iframe.src).origin);
            }).catch((data) => {
                iframe.contentWindow.postMessage({
                    framePromiseID: event.data.framePromiseID,
                    resolve: JSON.parse(JSON.stringify(data))
                }, new URL(iframe.src).origin);
            });
        }
    }
}, false);

iframe.onload = () =>
{
    iframe.contentWindow.postMessage({framePromiseReady: true}, new URL(iframe.src).origin);
};
