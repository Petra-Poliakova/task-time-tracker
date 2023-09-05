let user_signed_in = false;
const CLIENT_ID = encodeURIComponent('76953267876-08l188sc9iptcr5roq38um62uuingres.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://dckjicfcfohaaobhcjfepgmpijjgbhcj.chromiumapp.org');
const STATE = encodeURIComponent('jsdfgsz');
const SCOPE = encodeURIComponent('openid');
const PROMPT = encodeURIComponent('consent');


function create_oauth2_url() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

    let url = 
    `https://accounts.google.com/o/oauth2/v2/auth
    ?client_id=${CLIENT_ID}
    &response_type=${RESPONSE_TYPE}
    &redirect_uri=${REDIRECT_URI}
    &state=${STATE}
    &scope=${SCOPE}
    &prompt=${PROMPT}
    &nonce=${nonce}
    `;
    console.log('url', url);

    return url
}

function is_user_signed_in() {
    return user_signed_in;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        sendResponse({ success: true });
        if(is_user_signed_in()) {
            console.log('User is already singed in')
        } else {
            create_oauth2_url();
        }

    } else if (request.message === 'logout') {
        sendResponse({ success: true });
    } 

})