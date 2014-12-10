/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/****************************************
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
****************************************************/
//grocery listings 

var myList = [];


//document.addEventListener("DOMContentLoaded", function(ev){
document.addEventListener("deviceready", function(ev){
  if(localStorage.getItem("mcgi0145-grocery")){
    myList = JSON.parse(localStorage.getItem("mcgi0145-grocery"));
  }
  
    
  showList();
  
  document.querySelector("#btnAdd").addEventListener("click", function(ev){
    ev.preventDefault();
    var newItem = document.querySelector("#item");
    if (!newItem.value.trim() == "") {  
        myList.push( [newItem.value, 0] );
        localStorage.setItem("mcgi0145-grocery", JSON.stringify(myList) );
        newItem.value = "";
        showList();
    }else {
        alert ("You must enter some text");
    }
    
  });

});

function removeItem(ev){
 // var txt = ev.currentTarget.previousSibling.firstChild.nodeValue;
  var position = ev.currentTarget.parentElement.dataset.pos;
  for(var i=0;i<myList.length;i++){
  	if(i == position){
      myList.splice(i, 1);
    }
  }
  localStorage.setItem("mcgi0145-grocery", JSON.stringify(myList) );
  showList();
}


function showList(){
  var output = document.querySelector(".output");
  output.innerHTML = "";
  for(var i=0;i<myList.length;i++){
      console.log (i);
    var boxbox = document.createElement('div');
    boxbox.setAttribute('data-pos', i);
    var p = document.createElement("p");
      
    if (myList[i][1] == 1) {
        p.className = "green";
    }
    
    var img = document.createElement("img");
      img.setAttribute('src', 'img/xicon.png');
    p.innerHTML = myList[i][0];
    
    
    boxbox.appendChild(p);
    boxbox.appendChild(img);
    output.appendChild(boxbox);
    
    //event.stopPropagation();
    
  }
    var paras = output.querySelectorAll("p");
    var removes = output.querySelectorAll("img");
    
    for (var j=0; j < paras.length; j++ ) {
       paras[j].addEventListener("click", markthing);
       removes[j].addEventListener("click", removeItem); 
    }
    
   // boxbox.querySelector("img").addEventListener("click", removeItem);
}

function markthing() {
 var position = this.parentElement.dataset.pos;
 if (this.className == "green"){
     myList[position][1] = 0;     
 }else {
     myList[position][1] = 1;
 }
 this.classList.toggle("green");
}

    //document.querySelector("p").addEventListener("click", markthing);  


//function markItem(ev){
//  var txt = ev.currentTarget.firstChild.nodeValue;
//  for(var i=0;i<myList.length;i++){
//  	if(myList[i] == txt){
//      ev.currentTarget.style.color = "green";
//    }
//  }
// txt.addeventListener("click", unmarkItem);
//     
//}

//function unmarkItem(ev){
//    var txt = ev.currentTarget.firstChild.nodeValue;
//    for(var i=0;i<myList.length;i++){
//        if(myList[i] = txt){
//            ev.currentTarget.style.color = "black";
//        }
//    }
// txt.addEventListener("click", markItem);
//}
//}
