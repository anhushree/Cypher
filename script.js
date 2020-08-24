$(document).ready(function() {
  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  // Click on a close button to hide the current list item
   
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

  // Add a "checked" symbol when clicking on a list item
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
});

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  var p = document.createElement("p");
  p.appendChild(t);
  li.appendChild(p);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

// <i class="fas fa-trash-alt"></i>
  var i = document.createElement("I");
  i.className = ("fas fa-trash-alt close");
  li.appendChild(i);

// <div class="date-time "><input type="datetime-local"></input></div>
  var divi = document.createElement("DIV");
  var dateElement = document.createElement("INPUT");
  dateElement.setAttribute("type", "datetime-local");
  divi.classList.add("date-time");
  divi.appendChild(dateElement);

  var button=document.createElement("BUTTON");
  button.textContent="Notify";
  button.classList.add("notify-button");
  button.onclick = function myFunction() {
    button.innerHTML = "Updated";
    navigator.serviceWorker.getRegistration().then(reg => {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          alert('you need to allow push notifications');
        } else {
          const timestamp = Date.parse(dateElement.value);
          reg.showNotification(
            'Cypher',
            {
              tag: timestamp, // a unique ID
              body: inputValue, // content of the push notification
              showTrigger: new TimestampTrigger(timestamp), // set the time for the push notification
              data: {
                url: window.location.href, // pass the current url to the notification
              },
            }
          );
        }
      });
    });
  }
  divi.appendChild(button);
  li.appendChild(divi);

  
  var close = document.getElementsByClassName("close");
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
  