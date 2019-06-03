const menubar = () =>{
    document.getElementById('menu-bar').style.display = 'block';
    document.getElementById('bar-icon').style.display = 'none';
    document.getElementById('menu-bar').style.transition= '1.2s';
}
const away = () =>{
    document.getElementById('menu-bar').style.display = 'none';
    document.getElementById('bar-icon').style.display = 'block';
}
const openNav = () => {
    document.getElementById("myNav").style.width = "100%";
}
  
const closeNav = () => {
    document.getElementById("myNav").style.width = "0%";
}

const showNew = () => {
    document.getElementById('new-cars').style.display = 'block';
    document.getElementById('old-cars').style.display = 'none';
    document.getElementById('all').style.display = 'none';
    document.getElementById('myBtnContainer').style.display = 'none';
    document.getElementById('newBtn').style.display = 'block';
    document.getElementById('usedBtn').style.display = 'none';
}
const showOld = () => {
    document.getElementById('new-cars').style.display = 'none';
    document.getElementById('old-cars').style.display = 'block';
    document.getElementById('all').style.display = 'none';
    document.getElementById('myBtnContainer').style.display = 'none';
    document.getElementById('newBtn').style.display = 'none';
    document.getElementById('usedBtn').style.display = 'block';
    
}
const showAll = () => {
    document.getElementById('new-cars').style.display = 'none';
    document.getElementById('old-cars').style.display = 'none';
    document.getElementById('all').style.display = 'block';
    document.getElementById('myBtnContainer').style.display = 'block';
    document.getElementById('newBtn').style.display = 'none';
    document.getElementById('usedBtn').style.display = 'none';
}

// login
const loginSubmitFunction = () => {
    const loginform = document.getElementById('loginForm');
    const adminEmail = 'admin@gmail.com';
    const person = document.getElementById('loginEmailField').value;
  
    if (( person === adminEmail)) {
      loginform.setAttribute('action', '../html/admin.html');
    } else {
      loginform.setAttribute('action', '../html/home.html');
    }
  };
