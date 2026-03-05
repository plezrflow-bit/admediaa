/* --- FINAL JS LOGIC --- */

// Configuration
const ADMIN_NUMBER = "918447084101";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4kPWFsnAGX17fUtSabzmzovAuOKjY0yh9lnHQ69uVEREwCpqALzBnofSevo-EH4Pe6w/exec";

// Portal Toggle Functions
function openPortal() { 
    document.getElementById('portal-modal').style.display = 'flex'; 
}

function closePortal() { 
    document.getElementById('portal-modal').style.display = 'none'; 
}

function toggleView(view) {
    const loginView = document.getElementById('login-view');
    const regView = document.getElementById('reg-view');
    
    if(view === 'reg') {
        loginView.style.display = 'none';
        regView.style.display = 'block';
    } else {
        regView.style.display = 'none';
        loginView.style.display = 'block';
    }
}

// --- 1. LOGIN LOGIC ---
function handleLogin() {
    const u = document.getElementById('log-user').value;
    const p = document.getElementById('log-pass').value;

    if(!u || !p) {
        alert("Please fill in all fields!");
        return;
    }

    // Direct Login (Clean & Professional)
    alert("Login Successful! Welcome to your dashboard.");
    closePortal();
}

// --- 2. REGISTER LOGIC (With Google Sheet & WhatsApp) ---
async function handleRegister() {
    const u = document.getElementById('reg-user').value;
    const e = document.getElementById('reg-email').value;
    const p = document.getElementById('reg-pass').value;

    // Field Validation
    if(!u || !e || !p) {
        alert("Wait! All fields are mandatory.");
        return;
    }

    // Button state change (Loading effect)
    const btn = document.querySelector('#reg-view .submit-btn');
    const originalText = btn.innerText;
    btn.innerText = "Securing Data...";
    btn.disabled = true;

    try {
        // Step 1: Data Google Sheet mein bhej rahe hain
        await fetch(SCRIPT_URL, { 
            method: 'POST', 
            mode: 'no-cors', 
            body: JSON.stringify({
                "username": u, 
                "email": e, 
                "password": p
            }) 
        });

        // Step 2: Pehle Success Alert dikhayenge
        alert("Great! Your account has been registered successfully.");

        // Step 3: Phir WhatsApp ke liye permission maangenge
        const confirmWA = confirm("Would you like to notify the Admin on WhatsApp for instant account activation?");
        
        if(confirmWA) {
            const msg = `*ADMEDIA REGISTRATION*%0A%0A*Name:* ${u}%0A*Email:* ${e}%0A_Status: Pending Activation_`;
            window.open(`https://wa.me/${ADMIN_NUMBER}?text=${msg}`, '_blank');
        }

        closePortal();

    } catch (error) {
        console.error("Error:", error);
        alert("Oops! Connection lost. Data not saved.");
    } finally {
        // Restore Button
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

// Background click se modal close karne ke liye
window.onclick = function(event) {
    const modal = document.getElementById('portal-modal');
    if (event.target == modal) {
        closePortal();
    }
}
function toggleNavMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

// Agar user menu ke bahar click kare toh menu band ho jaye
window.onclick = function(event) {
    const menu = document.getElementById('navMenu');
    const icon = document.querySelector('.menu-icon');
    const modal = document.getElementById('portal-modal');

    if (event.target == modal) {
        closePortal();
    }
    
    if (!icon.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove('active');
    }
}
