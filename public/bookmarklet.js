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
    }
}, false);

iframe.onload = () =>
{
    iframe.contentWindow.postMessage({framePromiseReady: true}, new URL(iframe.src).origin);
};
