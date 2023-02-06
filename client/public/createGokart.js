const socket = io();

async function createGokart(){
    
    const driver = document.getElementById("driver_input").value;
    const age = document.getElementById("age_input").value;
    const cc = document.getElementById("cc_input").value;
    const bestLabTime = document.getElementById("best_lab_time_input").value;
    const totalTime = document.getElementById("total_time_input").value;
    const pitstops = document.getElementById("pitstops_input").value;
    
    const response = await fetch("/api/gokart", {
        headers: {"content-type": "application/json"},
        method: "POST",
        body: JSON.stringify({driver, age, cc, bestLabTime, totalTime, pitstops})
    });

    const result = await response.json();

    if(response.status == 201){

        alert(result.message);

        socket.emit("update_from_client");

        window.location = "/gokart_list";

    }else if(result.message == "Failed: Must be logged in"){

        alert(result.message);

        window.location = "/login";

   }else{
    
       alert(result.message);
   }
}