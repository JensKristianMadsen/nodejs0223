getGokart();

async function getGokart(){

    const path = window.location.pathname;
    const id = path.split("/").slice(-1)[0];
    console.log(id);

    const response = await fetch("/api/one_gokart/"+id);

    const result = await response.json();

     
    if(response.status == 200){

        const {gokart} = result;

        document.getElementById("id").value=gokart.id;
        document.getElementById("driver_input").value=gokart.driver;
        document.getElementById("age_input").value=gokart.age;
        document.getElementById("cc_input").value=gokart.cc;
        document.getElementById("best_lab_time_input").value=gokart.best_lab_time;
        document.getElementById("total_time_input").value=gokart.total_time;
        document.getElementById("pitstops_input").value=gokart.pitstops;
    }else{
        alert(result.message);
    }


}


async function updateGokart(){

    const id = document.getElementById("id").value;
    const driver = document.getElementById("driver_input").value;
    const age = document.getElementById("age_input").value;
    const cc = document.getElementById("cc_input").value;
    const bestLabTime = document.getElementById("best_lab_time_input").value;
    const totalTime = document.getElementById("total_time_input").value;
    const pitstops = document.getElementById("pitstops_input").value;


    const response = await fetch("/api/gokart", {
        headers: {"content-type": "application/json"},
        method: "PUT",
        body: JSON.stringify({id, driver, age, cc, bestLabTime, totalTime, pitstops})
    })

    const result = await response.json();

    if(response.status == 200){
        alert(result.message);
        window.location = "/gokart_list";
        
    }else if(result.message == "Failed: Must be logged in"){
        alert(result.message);
        window.location="/login";
   }else{
       alert(result.message);
       
   }

}
