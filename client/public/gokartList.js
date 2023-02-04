let gokarts;


seeAll();

async function seeAll(){

    const response = await fetch("/api/gokart", {
        credentials: 'include'
    });

    const result = await response.json();

    if(response.status == 200){

        gokarts = result.gokarts;
        //gokarts.reverse();

        const gokartTable = document.getElementById("gokart_table");

        gokartTable.innerHTML = "";

        gokarts.forEach(gokart => {

            const {id, driver, age, cc, best_lab_time, total_time, pitstops} = gokart;
            
            gokartTable.innerHTML += 
            `<tr>
                <td>${driver}</td>
                <td>${age}</td>
                <td>${cc}</td>
                <td>${best_lab_time}</td>
                <td>${total_time}</td>
                <td>${pitstops}</td>
                <td class="td-update" > <a href="/update_gokart/${id}"> <button  class="btn btn-primary btn-sm" type="button">UPDATE </button> </a></td>
                <td class="td-delete" > <button onclick="deleteGokart(${id})" class="btn btn-primary btn-sm" type="button">DELETE </button></td>
            </tr>`
        });

    }else if(result.message == "Failed: Must be logged in"){
        alert(result.message);
        window.location="/login";
   }else{
       alert(result.message);
       
   }
}

function top5TotalTime(){
    const top5List = [...gokarts];

    top5List.sort((a, b) => a.total_time - b.total_time)
    top5List.length = 5;
    //top5List.reverse();

    const gokartTable = document.getElementById("gokart_table");

    gokartTable.innerHTML = "";

    top5List.forEach((gokart, index) => {

        const {driver, age, cc, best_lab_time, total_time, pitstops} = gokart;
        
        gokartTable.innerHTML += 
        `<tr>
            <td>${index+1}</td>
            <td>${driver}</td>
            <td>${age}</td>
            <td>${cc}</td>
            <td>${best_lab_time}</td>
            <td>${total_time}</td>
            <td>${pitstops}</td>
        </tr>`
    });
}

function searchDriverName(){
    //Spread Operator
    const gokartsCopy = [...gokarts];

    const searchInput = document.getElementById("search_input").value.toLowerCase();

    const searchResult = gokartsCopy.filter(gokart => {

        const lowerCaseName = gokart.driver.toLowerCase();

        return lowerCaseName.includes(searchInput);
    })

    console.log(searchResult)

    const gokartTable = document.getElementById("gokart_table");

    gokartTable.innerHTML = "";

    searchResult.forEach(gokart => {

        const {driver, age, cc, best_lab_time, total_time, pitstops} = gokart;
        
        gokartTable.innerHTML += 
        `<tr>
            <td>${driver}</td>
            <td>${age}</td>
            <td>${cc}</td>
            <td>${best_lab_time}</td>
            <td>${total_time}</td>
            <td>${pitstops}</td>
        </tr>`
    });
}


async function deleteGokart(id){

    const response = await fetch("/api/gokart/"+id, {
        method: "DELETE"
    })

    const result = await response.json();

    if(response.status == 200){
        alert(result.message);
        seeAll();
    }else if(result.message == "Failed: Must be logged in"){
        alert(result.message);
        window.location="/login";
   }else{
       alert(result.message);
       
   }

}

/*

const socket = io("ws://localhost:3000");

socket.on("update from server", () => {
    seeAll();
});

*/