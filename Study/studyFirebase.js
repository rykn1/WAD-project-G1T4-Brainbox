import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, get, set, update} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
import {getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyCEjW5Rq4jgHbSS1GCJy0pl6hpPrFQ9pUI",
    authDomain: "wad2-4fc9e.firebaseapp.com",
    projectId: "wad2-4fc9e",
    storageBucket: "wad2-4fc9e.appspot.com",
    messagingSenderId: "83590678050",
    appId: "1:83590678050:web:6c98cdb011612eb4f5ac7b",
    measurementId: "G-NY0ZMNMQLZ",
    databaseURL: "https://wad2-4fc9e-default-rtdb.asia-southeast1.firebasedatabase.app"
    };
  

const app = initializeApp(firebaseConfig);
const db = getDatabase()
const auth = getAuth(app)

document.getElementById("completedButton").addEventListener("click", () => {
    let value = document.getElementById("dropdown_topics").value
    onAuthStateChanged(auth, user => {
        const completeRef = ref(db, 'studyCompletion/' + user.uid)
        let updates = {}
        updates[value] = true;
        onValue(completeRef, (snapshot) => {
            console.log(snapshot.val())
            update(completeRef, updates)
            console.log('submitted')
        }, {
            onlyOnce:true
        })
    })
    disableConfirm()  
})

function disableConfirm() {
    let value = document.getElementById("dropdown_topics").value
    onAuthStateChanged(auth, user => {
        const completeRef = ref(db,'studyCompletion/' + user.uid)
        onValue(completeRef, (snapshot) => {
            console.log(value,snapshot.val(),snapshot.val()[value])
            if (snapshot.val()[value] != null) {
                console.log("TEST")
                document.getElementById('completedButton').setAttribute("class","mx-auto text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2")
                document.getElementById("completedButton").disabled = true
                document.getElementById("completedButton").innerText = "You have completed this module!"
                
            } else {
                document.getElementById('completedButton').setAttribute("class","mx-auto text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2")
                document.getElementById("completedButton").disabled = false
                document.getElementById("completedButton").innerText = "I have completed everything!"
            }
        })
    })
}


document.addEventListener("DOMContentLoaded",disableConfirm)
document.getElementById("dropdown_topics").addEventListener("change", disableConfirm)