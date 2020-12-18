const table = document.querySelector("#table"); //väljer elementet på sidan med id = "table" mha DOM.

main();

async function getAPI() 
{
  //hämta information om resultaten
  let response = await fetch('https://stryk.herokuapp.com/tipset');
  let data = await response.json(); //konvetera till json file
  return data;
}

async function main()
{
    getAPI()
        .then((responseData) =>
        {            
            //Skapa tabellen via yttre funktioner   
            initTable(responseData);  
            makeTable(responseData);
        })
}

async function initTable(res)
{
    for (let i = 0; i < res.length; i++) 
    {
        //Skapa cellerna i tabellen
        let cell1 = document.createElement('tr');
        let cell2 = document.createElement('td');
        cell1.append(cell2);
        let cell3 = document.createElement('td');        
        cell1.append(cell3);                
        let cell4 = document.createElement('td');
        cell1.append(cell4);                
        let cell5 = document.createElement('td');
        cell1.append(cell5);                
        let cell6 = document.createElement('td');
        cell1.append(cell6);
        table.append(cell1);
    }
}

async function makeTable(res)
{            
    //loopa genom de 13 matcherna
    for (let i = 0; i < 13; i++) 
    {
        let nbr1 = table.rows[i+1].cells[0];
        let nbr2 = table.rows[i+1].cells[1];

        //hämta resultaten och spara dessa i variabler. 
        nbr1.innerHTML = res[i].gameNumber;
        nbr2.innerHTML = res[i].teams;

        //skapa checkmarks
        let div = document.createElement('div');
        div.innerHTML =  '<span class="checkmark"><div class="stem"></div><div class="kick"></div></span>';
        
        //om resultatet är ett, kryss eller två sätt checkmark i rätt ruta.
        if(res[i].outcome == "1")
        {
            table.rows[i+1].cells[2].append(div);
        }
        if(res[i].outcome =="X")
        {
            table.rows[i+1].cells[3].append(div);
        }
        if(res[i].outcome =="2")
        {
            table.rows[i+1].cells[4].append(div);
        }
        
    }    
}
