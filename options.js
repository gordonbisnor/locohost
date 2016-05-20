// Saves options to chrome.storage
function save_options() {

  const items = [];

  /* GET ALL NAME INPUTS */
  const names = document.querySelectorAll('.item_name');
  let i;
  for (i = 0; i < names.length; ++i) {
    items[i] = {};
    items[i].name = names[i].value;
  }
  
  /* GET ALL PORT INPUTS */
  const ports = document.querySelectorAll('.item_port');
  for (i = 0; i < ports.length; ++i) {
    items[i].port = ports[i].value;
  }
  
  /* GET ALL URL INPUTS */
  const urls = document.querySelectorAll('.item_url');
  for (i = 0; i < urls.length; ++i) {
    items[i].url = urls[i].value;
  }
  
  chrome.storage.sync.set({
      items: items
    }, function(items) {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function add_option() {
  addItem({name: "", url: "", port: ""});
}

function addItem (item) {

    let div = document.createElement("div");
    div.className = "item";
    
    /* NAME */
    
    nameInput = document.createElement("input");
    nameInput.value = item.name;
    nameInput.className = "item_name";
    nameInput.placeholder = "Ruby on Rails";

    let formGroup = document.createElement('div');
    formGroup.className = "form-group";
    formGroup.appendChild(nameInput);
    div.appendChild(formGroup);

    /* URL */

    let url   = document.createElement("input");
    url.value = item.url;
    url.className = "item_url";
    url.placeholder = "http://localhost:3000";

    formGroup = document.createElement('div');
    formGroup.className = "form-group";
    formGroup.appendChild(url);
    div.appendChild(formGroup);
  
    /* PORT */ 

    portInput = document.createElement("input");
    portInput.value = item.port;
    portInput.className = "item_port";
    portInput.placeholder = "3000";
    
    formGroup = document.createElement('div');
    formGroup.className = "form-group";
    formGroup.appendChild(portInput);
    div.appendChild(formGroup);

    let removeButton   = document.createElement("button");
    removeButton.className = "remove-button";
    let img = document.createElement("img");
    img.src = "close-circled.svg";
    removeButton.appendChild(img);
    formGroup = document.createElement('div');
    formGroup.className = "form-group remove";
    formGroup.appendChild(removeButton);
    div.appendChild(formGroup);

    /* ADD ALL ITEMS TO CONTAINER */

    const element = document.getElementById("items");
    element.appendChild(div);
}

function setupRemoveButtons () {
  /* Add click event to each remove button */
  const removeButtons = document.querySelectorAll('.remove-button');
  for (i = 0; i < removeButtons.length; ++i) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener('click', function(e) {
      let target = e.target;
      let formGroup = target.parentElement;
      let row = formGroup.parentElement;
      let container = row.parentElement;
      container.removeChild(row);
    });
  }
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    items: [
      {url: "http://localhost:3000", name: "Rails",       port: 3000},
      {url: "http://localhost:4200", name: "Ember",       port: 4200},
      {url: "http://localhost:4000", name: "Elixir",      port: 4000},
      {url: "http://localhost:8000", name: "Elm",         port: 8000},
      {url: "http://localhost:4567", name: "Middleman",   port: 4567}
    ]
  }, function (s) {
     
      let i;

      for (i = 0; i < s.items.length; ++i) {     
        addItem(s.items[i]);
      }; 

      setupRemoveButtons();

  });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);
document.getElementById('add').addEventListener('click', add_option);