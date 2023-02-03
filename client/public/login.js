async function login(){
    //const username = username_input.value;

    const email = document.getElementById("email_input").value;
    const password = document.getElementById("password_input").value;

    const response = await fetch("/api/login", {
        headers: {"content-type": "application/json"},
        method: "POST",
        body: JSON.stringify({email, password})
    });

    const result = await response.json();

    if(result.message){
        alert(result.message)
    }else{
        window.location="/gokart_list";
    }
    
}