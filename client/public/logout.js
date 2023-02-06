async function  logout(){
    
    const response = await fetch("/api/logout");

    const result = await response.json();

    if(result.message == "Logout failed: Must be logged in"){

         alert(result.message);

    }else{

        alert(result.message);

        window.location="/";
    }
}