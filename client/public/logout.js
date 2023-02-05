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

    const result = await response.json();

  //  alert(message);
   


    if(result.message == "Logout failed: Must be logged in"){
         alert(result.message);
    }else{
        alert(result.message);
        window.location="/";
    }
    
}