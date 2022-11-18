let modal = {
    closeModal: ()=>{
      this.forma.style.display = "none";
      window.history.pushState({"formtoggle": false},"","index.html");
    },
    openModal: ()=>{
      this.forma.style.display = "flex";
      window.history.pushState({"formtoggle": true},"","#form");
    }
  };
  window.addEventListener("DOMContentLoaded", function(event){
    modal["showbutton"] = document.getElementById("showbutton");
    modal["forma"] = document.getElementById("forma");
    modal["closeX"] = document.getElementById("close"); 
    modal["fields"] = document.querySelectorAll(".fields");
    modal["submitButton"] = document.getElementById("submitbutton");
    modal["postForm"] = document.getElementById("contact");
    modal.fields.forEach((element) => {   //LOCAL STORAGE
        element.value = localStorage.getItem(element.name);
        element.addEventListener("blur",
        (event)=>localStorage.setItem(event.target.name, event.target.value));
    });
    modal.closeX.addEventListener("click",modal.closeModal);
    modal.showbutton.onclick = modal.openModal;
    window.history.pushState({"formtoggle": false},"","index.html"); //HISTORY API
    window.addEventListener("popstate",(event) => {
    (event.state.formtoggle)? (modal.forma.style.display = "flex") : (modal.forma.style.display = "none");
    });
    (modal.fields.item(3).checked)? (modal.submitButton.disabled=false) : (modal.submitButton.disabled=true);
    modal.fields.item(3).addEventListener("change", (event)=>
    {(event.target.checked)? (modal.submitButton.disabled=false) : (modal.submitButton.disabled=true);});
    modal.postForm.addEventListener("submit", function(event){  
        event.preventDefault();
        fetch("https://formcarry.com/s/Dg67n7vay",
        {
            method:"POST",
            headers:
            {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(Object.fromEntries(new FormData(modal.postForm)))
        })
        .then(function(response){
            if(!response.ok)
            {
                throw new Error(response.status);
            }
            return response;
        })
        .then((response)=>{alert("Данные отправлены");
            console.log(response.text());})
        .catch((error)=>{alert("Ищи ошибки");
            console.log(error);});
        modal.fields.forEach((element) => {element.value = "";});
        localStorage.clear();
    });
  });
