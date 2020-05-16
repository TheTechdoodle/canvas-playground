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

// From https://stackoverflow.com/a/25490531
function getCookieValue(a)
{
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

async function regenerateToken(tokenUrl)
{
    const formData = new URLSearchParams();
    formData.append('access_token[regenerate]', '1');
    formData.append('_method', 'PUT');
    formData.append('authenticity_token', unescape(getCookieValue('_csrf_token')));
    
    return await fetch(tokenUrl, {
        method: 'POST',
        'Accept': 'application/json, application/json+canvas-string-ids',
        body: formData
    }).then(res => res.json());
}

async function deleteToken(tokenUrl)
{
    const formData = new URLSearchParams();
    formData.append('_method', 'DELETE');
    formData.append('authenticity_token', unescape(getCookieValue('_csrf_token')));
    
    return await fetch(tokenUrl, {
        method: 'POST',
        'Accept': 'application/json, application/json+canvas-string-ids',
        body: formData
    }).then(res => res.json());
}

async function generateToken(url, purpose, expires)
{
    const formData = new URLSearchParams();
    formData.append('utf8', '');
    formData.append('authenticity_token', unescape(getCookieValue('_csrf_token')));
    formData.append('_method', 'post');
    formData.append('purpose', purpose);
    formData.append('access_token[purpose]', purpose);
    formData.append('expires_at', expires);
    formData.append('access_token[expires_at]', expires);
    
    return await fetch(url, {
        method: 'POST',
        'Accept': 'application/json, application/json+canvas-string-ids',
        body: formData
    }).then(res => res.json());
}

function framePromiseReturn(event, data, resolve)
{
    iframe.contentWindow.postMessage({
        framePromiseID: event.data.framePromiseID,
        [resolve ? 'resolve' : 'reject']: data
    }, new URL(iframe.src).origin);
}

function framePromiseWrap(promise, event)
{
    promise.then(data =>
    {
        framePromiseReturn(event, data, true);
    }).catch((...args) =>
    {
        framePromiseReturn(event, JSON.parse(JSON.stringify(args)), false);
    });
}

window.addEventListener('message', (event) =>
{
    if(event.data.hasOwnProperty('framePromiseID'))
    {
        switch(event.data.name)
        {
            case 'fetch': framePromiseWrap(fetch(...event.data.args).then(res => res.json()), event); break;
            case 'getTokens': framePromiseWrap(getCanvasTokens(), event); break;
            case 'getTokenDetails': framePromiseWrap(getCanvasTokenDetails(), event); break;
            case 'generateToken': framePromiseWrap(generateToken(...event.data.args), event); break;
            case 'regenerateToken': framePromiseWrap(regenerateToken(...event.data.args), event); break;
            case 'deleteToken': framePromiseWrap(deleteToken(...event.data.args), event); break;
            case 'getUrl': framePromiseReturn(event, JSON.parse(JSON.stringify(window.location)), true); break;
            case 'reload': framePromiseReturn(event, {}, true); window.location.reload(); break;
        }
    }
}, false);

iframe.onload = () =>
{
    iframe.contentWindow.postMessage({framePromiseReady: true}, new URL(iframe.src).origin);
};
