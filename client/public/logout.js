async function  logout(){
    
    const response = await fetch("/api/logout");

    const message = await response.text();

    alert(message);
   
}