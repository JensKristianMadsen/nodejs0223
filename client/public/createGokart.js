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

    alert(result.message);

    
    if(response.status == 201){
        
        window.location = "/";
    }

}