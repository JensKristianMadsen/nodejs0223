async function signup(){
    //const username = username_input.value;
    const username = document.getElementById("username_input").value;
    const email = document.getElementById("email_input").value;
    const password = document.getElementById("password_input").value;
    const confirmPassword = document.getElementById("confirm_password_input").value;

    if(password != confirmPassword){

        return alert("Passwords donsn't match");
    }


    const response = await fetch("/api/signup", {
        headers: {"content-type": "application/json"},
        method: "POST",
        body: JSON.stringify({username, email, password})
    });
  

    const result = await response.json();

    alert(result.message);

    if(response.status == 201){
        
        window.location = "/login";
    }
}