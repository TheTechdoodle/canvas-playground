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

window.addEventListener('message', (event) =>
{
    if(event.data.hasOwnProperty('frameFetchID'))
    {
        fetch(...event.data.arguments).then(res => res.json()).then(data =>
        {
            iframe.contentWindow.postMessage({
                frameFetchID: event.data.frameFetchID,
                resolve: data
            }, new URL(iframe.src).origin);
        }).catch((...args) =>
        {
            iframe.contentWindow.postMessage({
                frameFetchID: event.data.frameFetchID,
                reject: JSON.parse(JSON.stringify(Array.from(args)))
            }, new URL(iframe.src).origin);
        });
    }
}, false);

iframe.onload = () =>
{
    iframe.contentWindow.postMessage({frameFetchReady: true}, new URL(iframe.src).origin);
};
