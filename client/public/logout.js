/*
// Den orginale
async function  logout(){
    
    const response = await fetch("/api/logout");

    const message = await response.text();

    alert(message);
   
}
*/


async function  logout(){
    
    const response = await fetch("/api/logout");

    const message = await response.text();

  //  alert(message);
   


    if(message == "Logout failed: Must be logged in"){
         alert(message);
    }else{
        alert(message);
        window.location="/";
    }
    
}