const cardNbr=document.getElementById("card-Nbr");
const cardNbrInput=document.getElementById("card-Nbr-Input");
const cardName=document.getElementById("card-Name");
const cardNameInput=document.getElementById("card-Name-Input");
const year=document.getElementById("year");
const month=document.getElementById("month");
const date=document.getElementById("date");
const cvcInput=document.getElementById("cvc-Input");
const cvc=document.getElementById("cvc");
const confirmation=document.getElementById("confirmation");
const button=document.getElementById("conf-btn");
const contBtn=document.getElementById("continue-btn");
const infoForm=document.getElementById("information");
const nameError=document.getElementById("error-name");
const nbrError=document.getElementById("error-nbr");
const dateError=document.getElementById("error-date");
const cvcError=document.getElementById("error-cvc");

infoForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    if (verifForm()) return;
    document.querySelector(".confirmation").style.display="flex";
    document.querySelector(".form").style.display="none";
})  


cardNameInput.addEventListener("input",()=>{
    cardName.textContent=capitalize(cardNameInput.value);
})

cardNbrInput.addEventListener("input",()=>{
    cardNbr.textContent=cardNbrInput.value.replace(/(.{4})/g, "$1 ");;
})

year.addEventListener("input",()=>{
    if (month.value){
        date.textContent=month.value+"/"+year.value;
    }
    else{
        date.textContent="--/"+year.value;
    }
})

month.addEventListener("input",()=>{
    if (year.value){
        date.textContent=month.value+"/"+year.value;
    }
    else{
        date.textContent=month.value+"/--";
    }
})

cvcInput.addEventListener("input",()=>{
    cvc.textContent=cvcInput.value;
})

contBtn.onclick=()=>{
    document.querySelector(".confirmation").style.display="none";
    document.querySelector(".form").style.display="block";
}

function capitalize(str){
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function verifForm(){
    let x,y,z,w;
    w=cardNameInput.value.length<1;
    if (w){
        cardNameInput.classList.add("error");}
    else{
        cardNameInput.classList.remove("error");
    }
    x=nbrverif(cardNbrInput.value);
    y=cvcVerif(cvcInput.value);
    z=dateVerif(year.value,month.value);
    if (x || y || z || w) return 1;
}

function nbrverif(str){
    if (str.length!=16 || Number(str)<0){
        cardNbrInput.classList.add("error");
        return 1;
    }
    else{
        cardNbrInput.classList.remove("error");
        return 0;
    }
}

function dateVerif(y,m){
    if ( !isFutureDate(m,y) || Number(m)<1 || Number(m)>12 ){
        document.querySelector("#error-date").style.display="block";
        year.classList.add("error");
        month.classList.add("error");
        return 1;
    }
    else{
        document.querySelector("#error-date").style.display="none";
        year.classList.remove("error");
        month.classList.remove("error");
        return 0;
    }
}


function cvcVerif(str){
      if (str.length!=3){
        cvcInput.classList.add("error");
        return 1;
    }
    else{
        cvcInput.classList.remove("error");
        return 0;
    }
}

function isFutureDate(mm, yy) {
    // Convert yy to a full year (e.g., "25" → 2025)
    yy = Number("20" + yy);
    mm = Number(mm);

    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JS months: 0–11
    const currentYear = today.getFullYear();

    // Compare year first
    if (yy > currentYear) return true;
    if (yy < currentYear) return false;

    // If same year, compare months
    return mm > currentMonth;
}

const inputs = document.querySelectorAll("input");


inputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // stop the form from submitting

            // If not the last input → go to next input
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } 
            // If last input → submit the form
            else {
                if (verifForm()) return;
                document.querySelector(".confirmation").style.display="flex";
                document.querySelector(".form").style.display="none";  
            }
        }
    });
});



