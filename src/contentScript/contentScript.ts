chrome.runtime.sendMessage('From the content script!', (response)=> {
    console.log(response)
} );

// const init = () => {
//     const injectElement = document.createElement('div');
//     injectElement.className = 'rustyZone-element';
//     injectElement.innerHTML = 'Hello from the Rusty Zone Element';
//     document.body.appendChild(injectElement);
// }
// init();
