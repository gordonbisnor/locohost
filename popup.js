function getCurrentTabUrl(callback) {

  let queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    let tab = tabs[0];
    let url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });

}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  
  const ul = document.getElementById('items');
  let li;

  /* add each item in storage an an <li> in ul#items */
  chrome.storage.sync.get('items', function (s) {
    const items = s.items;    
    let i; let item; let text;
    for (i = 0; i < items.length; ++i) {
      item = items[i];
      li = document.createElement("li");
      let name = document.createElement("span");
      name.className = "name";
      let port = document.createElement("span");
      port.className = "port";
      let nameText = document.createTextNode(item.name);
      let portText = document.createTextNode(item.port);
      name.appendChild(nameText);
      port.appendChild(portText);
      li.className = "button";
      li.dataset.url = item.url;
      li.appendChild(name);
      li.appendChild(port);
      ul.appendChild(li);
    }

    /* Add click event to each item */
    const buttons = document.querySelectorAll('.button');
    for (i = 0; i < buttons.length; ++i) {
      const button = buttons[i];
      button.addEventListener('click', function(e) {
        getCurrentTabUrl(function(url) {
          chrome.tabs.create({active: true, url: button.dataset.url});  
        });
      });
    }

  });

  
});
