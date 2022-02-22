const s = document.createElement("script");
s.type = "text/javascript";
s.src = chrome.runtime.getURL("dist/script.js");
document.body.appendChild(s);
