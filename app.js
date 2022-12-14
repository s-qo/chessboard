let chess = document.getElementById("chess");
function  display()
{
    
    
    for(let i=0;i<8;i++)
    {
        let div = document.createElement("div");
        for(let j=0;j<8;j++)
        {
            let temp = document.createElement("div");
            
            if((i+j) % 2 === 1)
            {
                temp.style.backgroundColor = "grey";
            }
            let img = document.createElement("img");
            if(j===1)
            {
                img.src = "pawnw.png";
                temp.appendChild(img);
            }
            else if((j===0 && i===0) || (j===0 && i===7))
            {
                img.src = "rookw.png";
                temp.appendChild(img);
            }
            else if((i===1 && j===0) || (i===6 && j===0 ))
            {
                img.src = "horsew.png";
                temp.appendChild(img);
            }
            else if((i===2 && j===0) || (i===5 && j===0 ))
            {
                img.src = "bishopw.png";
                temp.appendChild(img);
            }
            else if((i===3 && j===0))
            {
                img.src = "queenw.png";
                temp.appendChild(img);
            }
            else if((i===4 && j===0) )
            {
                img.src = "kingw.png";
                temp.appendChild(img);
            }
            
            else if(j===6)
            {
                img.src = "pawnb.png";
                temp.appendChild(img);
            }
            else if((j===7 && i===0) || (j===7 && i===7))
            {
                img.src = "rookb.png";
                temp.appendChild(img);
            }
            else if((i===1 && j===7) || (i===6 && j===7 ))
            {
                img.src = "horseb.png";
                temp.appendChild(img);
            }
            else if((i===2 && j===7) || (i===5 && j===7 ))
            {
                img.src = "bishopb.png";
                temp.appendChild(img);
            }
            else if((i===3 && j===7))
            {
                img.src = "queenb.png";
                temp.appendChild(img);
            }
            else if((i===4 && j===7) )
            {
                img.src = "kingb.png";
                temp.appendChild(img);
            }

            temp.setAttribute("rowind",j);
            temp.setAttribute("colind",i);
            let s = img.src.split("/");
            img.setAttribute("name",s[s.length-1]);
            temp.style.display = "flex";
            temp.style.justifyContent = "center"
            temp.style.alignItems = "center";
            div.appendChild(temp);
        }
        chess.appendChild(div);
    }
}
display();




chess = document.querySelectorAll("img");
let laststepobj = {
    laststep: "123",
    lastrow: -1,
    lastcolumn: -1

};


let flag = false;
let greenoness = [];

function onclickgreen(event)
{
                    
    let lastelement = document.querySelector(`div[rowind='${laststepobj.lastrow}'][colind='${laststepobj.lastcolumn}']`);
    alert(lastelement.outerHTML);
    event.target.innerHTML = lastelement.innerHTML ;
    lastelement.innerHTML = " ";
    let green = document.querySelectorAll("div");

    for(let j=0;j<green.length;j++)
    {
         
        if(green[j].style.backgroundColor === "green")
       {
        //alert(green[i].getAttribute("rowind") + "  "+green[i].getAttribute("colind"));   
            if((parseInt(green[j].getAttribute("rowind"))+parseInt(green[j].getAttribute("colind"))) % 2 === 1 )
            green[j].style.backgroundColor = "grey";
            else if((parseInt(green[j].getAttribute("rowind"))+parseInt(green[j].getAttribute("colind"))) % 2 === 0 )
            {
                green[j].style.backgroundColor = "white";
            }
            green[j].removeEventListener("click",onclickgreen);
            chess = document.querySelectorAll("img");

            for(let i=0;i<chess.length;i++)
            {
    
                chess[i].removeEventListener("click",allimgclick);
    
    
            }

            for(let i=0;i<chess.length;i++)
            {
    
                chess[i].addEventListener("click",allimgclick);
    
    
            }
        }
        
    }

    flag = !flag;
}

function allimgclick(event)
{
        
    if((event.target.getAttribute("name")).includes(laststepobj.laststep.slice(laststepobj.laststep.length-5,laststepobj.laststep.length)))
    {
        
        let green = document.querySelectorAll("div");
        
        for(let i=0;i<green.length;i++)
        {
           
            if(green[i].style.backgroundColor === "green")
           {
            //alert(green[i].getAttribute("rowind") + "  "+green[i].getAttribute("colind"));   
            if((parseInt(green[i].getAttribute("rowind"))+parseInt(green[i].getAttribute("colind"))) % 2 === 1 )
            green[i].style.backgroundColor = "grey";
            else if((parseInt(green[i].getAttribute("rowind"))+parseInt(green[i].getAttribute("colind"))) % 2 === 0 )
            {
                green[i].style.backgroundColor = "white";
            }
            }
        }
        laststepobj.laststep = "123";
        return;
    }
    if(!flag && event.target.name === "pawnw.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        
        let leftindx = rowind + 1;
        let leftindy =  colind - 1;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindy >=0)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            pcell.style.backgroundColor = "green";
            //alert(pcell.outerHTML);
        }
        let straightindx = rowind + 1;
        document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`).style.backgroundColor = "green";
        
        
        let rightindx = rowind + 1;
        let rightindy = colind + 1;
        if(rightindx >= 0 && rightindy <=7)
        {
            
            document.querySelector(`div[rowind='${rightindx}'][colind='${rightindy}']`).style.backgroundColor = "green";
        }

        
        
        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);
       let greenones = document.querySelectorAll("div[style*='green']");;
        for(let i=0;i<greenones.length;i++)
        {
            greenones[i].addEventListener("click",onclickgreen);
        }
        
        




        
    }
    else if( flag && event.target.name === "pawnb.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        
        let leftindx = rowind - 1;
        let leftindy =  colind - 1;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindy >=0)
        {

            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
            pcell.style.backgroundColor = "green";
            //alert(pcell.outerHTML);
        }
        let straightindx = rowind - 1;
        document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`).style.backgroundColor = "green";
        
        
        let rightindx = rowind - 1;
        let rightindy = colind + 1;
        if(rightindx >= 0 && rightindy <=7)
        {
            
            document.querySelector(`div[rowind='${rightindx}'][colind='${rightindy}']`).style.backgroundColor = "green";
        }
        
        
        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));

        

        let greenones = document.querySelectorAll("div[style*='green']");;
        for(let i=0;i<greenones.length;i++)
        {
            greenones[i].addEventListener("click",onclickgreen);
        }
        
        

        

        
    }
}

for(let i=0;i<chess.length;i++)
{
    
    chess[i].addEventListener("click",allimgclick);
    
    
}