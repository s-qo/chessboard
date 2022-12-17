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
        let chess2 = document.getElementById("chess");
        chess2.appendChild(div);
    }
}
display();


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
    //alert(lastelement.outerHTML);
    //alert(event.target.outerHTML);
    if(event.target.outerHTML.includes("<img")) {
     //   alert(lastelement.outerHTML);
        event.target.parentElement= "";
        event.target.parentElement.innerHTML = lastelement.innerHTML ;
    lastelement.innerHTML = " ";
    }
    else{
    event.target.innerHTML = lastelement.innerHTML ;
    lastelement.innerHTML = " ";}
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
            let chess = document.querySelectorAll("img");

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
    let kingw = document.querySelector("img[src='kingw.png']");
    if(!kingw)
    {
        alert("Black wins!");
        let chess1 = document.querySelectorAll("img");
        document.getElementById("chess").innerHTML = "";
        display();
        
    }
    let kingb = document.querySelector("img[src='kingb.png']");
    if(!kingb)
    {
        alert("White wins!");
        let chess1 = document.querySelectorAll("img");
        document.getElementById("chess").innerHTML = "";
        display();
        
    }
    let chess2 = document.querySelectorAll("img");

    for(let i=0;i<chess2.length;i++)
    {
        chess2[i].addEventListener("click",allimgclick);
    }
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
                green[i].removeEventListener("click",onclickgreen); 
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
            if(pcell.innerHTML.includes("b.png") && !pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
            
        }
        let straightindx = rowind + 1;
        let mcell = document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`);
       // alert(mcell.outerHTML);
        if(!mcell.innerHTML.includes("w.png"))
        {
            mcell.style.backgroundColor = "green";
            mcell.addEventListener("click",onclickgreen);
        }
        if(rowind === 1)
        {
            straightindx = rowind + 2;
            mcell = document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`);
       // alert(mcell.outerHTML);
            if(!mcell.innerHTML.includes("w.png"))
            {
                mcell.style.backgroundColor = "green";
                mcell.addEventListener("click",onclickgreen);
            }
        }

        let rightindx = rowind + 1;
        let rightindy = colind + 1;
        if(rightindx >= 0 && rightindy <=7)
        {
            
            let ncell = document.querySelector(`div[rowind='${rightindx}'][colind='${rightindy}']`);
            if(ncell.innerHTML.includes("b.png") && !ncell.innerHTML.includes("w.png"))
            {
                ncell.style.backgroundColor = "green";
                ncell.addEventListener("click",onclickgreen);
            }
        }

        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);

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
            if(pcell.innerHTML.includes("w.png") && !pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
            //alert(pcell.outerHTML);
        }
        let straightindx = rowind - 1;
        let mcell = document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`);
        if(!mcell.innerHTML.includes("b.png"))
        {
            mcell.style.backgroundColor = "green";
            mcell.addEventListener("click",onclickgreen);
        }
        
        if(rowind === 6)
        {
            straightindx = rowind - 2;
            mcell = document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`);
            if(!mcell.innerHTML.includes("b.png"))
            {
                mcell.style.backgroundColor = "green";
                mcell.addEventListener("click",onclickgreen);
            }
        }


        let rightindx = rowind - 1;
        let rightindy = colind + 1;
        if(rightindx >= 0 && rightindy <=7)
        {
            
            let ncell = document.querySelector(`div[rowind='${rightindx}'][colind='${rightindy}']`);
            if(ncell.innerHTML.includes("w.png") && !ncell.innerHTML.includes("b.png"))
            {
                ncell.style.backgroundColor = "green";
                ncell.addEventListener("click",onclickgreen);
            }
        }

        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));

    }
    else if(!flag && event.target.name === "horsew.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        //straight move
        let leftindx = rowind + 2;
        let leftindy =  colind + 1;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
            if( !pcell.innerHTML.includes("w.png"))
            {
                //alert(pcell.outerHTML);
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
            
        }

         leftindx = rowind + 2;
         leftindy =  colind - 1;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(!pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
            
        }

        //right side move
        leftindx = rowind + 1;
         leftindy =  colind + 2;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }

        leftindx = rowind - 1;
         leftindy =  colind + 2;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
            
        }

        //back straight side move
        leftindx = rowind - 2;
         leftindy =  colind + 1;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        leftindx = rowind - 2;
         leftindy =  colind - 1;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        //left side move
        leftindx = rowind + 1;
         leftindy =  colind - 2;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }

        leftindx = rowind - 1;
        leftindy =  colind - 2;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(!pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);
    }
    else if(flag && event.target.name === "horseb.png")
    {
       // alert("hii");
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        //straight move
        let leftindx = rowind + 2;
        let leftindy =  colind + 1;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
            if( !pcell.innerHTML.includes("b.png"))
            {
                //alert(pcell.outerHTML);
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }

         leftindx = rowind + 2;
         leftindy =  colind - 1;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(!pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }   
        }

        //right side move
        leftindx = rowind + 1;
         leftindy =  colind + 2;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }   
        }

        leftindx = rowind - 1;
         leftindy =  colind + 2;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }

        //back straight side move
        leftindx = rowind - 2;
         leftindy =  colind + 1;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
           // alert("hi");
            if( !pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        leftindx = rowind - 2;
         leftindy =  colind - 1;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        //left side move
        leftindx = rowind + 1;
         leftindy =  colind - 2;

       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        leftindx = rowind - 1;
        leftindy =  colind - 2;

       // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(!pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);

    }
    else if(!flag && event.target.name === "bishopw.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        
        let leftindx = rowind ;
        let leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy + 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                
                    break;
                }
            }
            else break;
        }
        
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }

                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy + 1;
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }

        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);

    }
    else if(flag && event.target.name === "bishopb.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));

        let leftindx = rowind ;
        let leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy + 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                
                    break;

                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }

                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy + 1;
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }

        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);
    }
    else if(!flag && event.target.name === "rookw.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));

        let leftindx = rowind ;
        let leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx ;
            leftindy =  leftindy + 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                
                    break;
                }
                
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx ;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy ;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy ;
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }
        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);

    }
    else if(flag && event.target.name === "rookb.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        let leftindx = rowind ;
        let leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx ;
            leftindy =  leftindy + 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx ;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy ;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy ;
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);

    }
    else if(!flag && event.target.name === "queenw.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        
        let leftindx = rowind ;
        let leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx ;
            leftindy =  leftindy + 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx ;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy ;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }

                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy ;
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }
         leftindx = rowind ;
         leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy + 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }

                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy + 1;
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                if(!pcell.innerHTML.includes("w.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("b.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("w.png"))
                {
                    break;
                }
            }
            else break;
        }      
        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);

    }    
   if(flag && event.target.name === "queenb.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        
        let leftindx = rowind ;
        let leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx ;
            leftindy =  leftindy + 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
        
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx ;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy ;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy ;
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
         leftindx = rowind ;
         leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy + 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
        
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx + 1;
            leftindy =  leftindy - 1;
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }

                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
        leftindx = rowind ;
        leftindy =  colind ;
        while(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            leftindx = leftindx - 1;
            leftindy =  leftindy + 1;
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
            {
                if(!pcell.innerHTML.includes("b.png"))
                {
                    pcell.style.backgroundColor = "green";
                    pcell.addEventListener("click",onclickgreen);
                    if(pcell.innerHTML.includes("w.png"))
                    break;
                }
                else if(pcell.innerHTML.includes("b.png"))
                {
                    break;
                }
            }
            else break;
        }
        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);
    }
    else if(!flag && event.target.name === "kingw.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        
        let leftindx = rowind + 1;
        let leftindy =  colind - 1;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }

        let straightindx = rowind + 1;
        
        let mcell = document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`);
       // alert(mcell.outerHTML);
        if(!mcell.innerHTML.includes("w.png"))
        {
            mcell.style.backgroundColor = "green";
            mcell.addEventListener("click",onclickgreen);
        }
        
        let rightindx = rowind + 1;
        let rightindy = colind + 1;
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            
            let ncell = document.querySelector(`div[rowind='${rightindx}'][colind='${rightindy}']`);
            if( !ncell.innerHTML.includes("w.png"))
            {
                ncell.style.backgroundColor = "green";
                ncell.addEventListener("click",onclickgreen);
            }
        }

         leftindx = rowind - 1;
         leftindy =  colind + 1;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        
        straightindx = rowind - 1;
        if(straightindx <= 7 && straightindx >= 0 && colind >=0 && colind <=7)
        {
            mcell = document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`);
       // alert(mcell.outerHTML);
            if(!mcell.innerHTML.includes("w.png"))
            {
                mcell.style.backgroundColor = "green";
                mcell.addEventListener("click",onclickgreen);
            }
        }
         rightindx = rowind - 1;
         rightindy = colind - 1;
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let ncell = document.querySelector(`div[rowind='${rightindx}'][colind='${rightindy}']`);
            if( !ncell.innerHTML.includes("w.png"))
            {
                ncell.style.backgroundColor = "green";
                ncell.addEventListener("click",onclickgreen);
            }
        }

         leftindx = rowind ;
         leftindy =  colind + 1;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("w.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        leftindx = rowind ;
        leftindy =  colind - 1;

      // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
       {
           let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
           if(!pcell.innerHTML.includes("w.png"))
           {
               pcell.style.backgroundColor = "green";
               pcell.addEventListener("click",onclickgreen);
           }  
       }
        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);
    }
    else if(flag && event.target.name === "kingb.png")
    {
        let par = event.target.parentElement;
        let rowind = parseInt(par.getAttribute("rowind"));
        let colind = parseInt(par.getAttribute("colind"));
        
        let leftindx = rowind + 1;
        let leftindy =  colind - 1;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }

        let straightindx = rowind + 1;
        if(straightindx <= 7 && straightindx >= 0 && colind >=0 && colind <=7)
        {
            let mcell = document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`);
       // alert(mcell.outerHTML);

            if(!mcell.innerHTML.includes("b.png"))
            {
                mcell.style.backgroundColor = "green";
                mcell.addEventListener("click",onclickgreen);
            }
        }
        let rightindx = rowind + 1;
        let rightindy = colind + 1;
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            
            let ncell = document.querySelector(`div[rowind='${rightindx}'][colind='${rightindy}']`);
            if( !ncell.innerHTML.includes("b.png"))
            {
                ncell.style.backgroundColor = "green";
                ncell.addEventListener("click",onclickgreen);
            }
        }

         leftindx = rowind - 1;
         leftindy =  colind + 1;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        
        straightindx = rowind - 1;
        if(straightindx <= 7 && straightindx >= 0 && colind >=0 && colind <=7)
        {
           let mcell = document.querySelector(`div[rowind='${straightindx}'][colind='${colind}']`);
       // alert(mcell.outerHTML);
            if(!mcell.innerHTML.includes("b.png"))
            {
                mcell.style.backgroundColor = "green";
                mcell.addEventListener("click",onclickgreen);
            }
        }
         rightindx = rowind - 1;
         rightindy = colind - 1;
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            
            let ncell = document.querySelector(`div[rowind='${rightindx}'][colind='${rightindy}']`);
            if( !ncell.innerHTML.includes("b.png"))
            {
                ncell.style.backgroundColor = "green";
                ncell.addEventListener("click",onclickgreen);
            }
        }
         leftindx = rowind ;
         leftindy =  colind + 1;

       // alert(leftindx+"hi"+leftindy);
        if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
        {
            let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
            if( !pcell.innerHTML.includes("b.png"))
            {
                pcell.style.backgroundColor = "green";
                pcell.addEventListener("click",onclickgreen);
            }
        }
        
        leftindx = rowind ;
        leftindy =  colind - 1;

      // alert(leftindx+"hi"+leftindy);
       if(leftindx <= 7 && leftindx >= 0 && leftindy >=0 && leftindy <=7)
       {
           let pcell = document.querySelector(`div[rowind='${leftindx}'][colind='${leftindy}']`);
           if(!pcell.innerHTML.includes("b.png"))
           {
               pcell.style.backgroundColor = "green";
               pcell.addEventListener("click",onclickgreen);
           }
       }

        laststepobj.laststep = event.target.getAttribute("name");
        laststepobj.lastrow = parseInt(par.getAttribute("rowind"));
        laststepobj.lastcolumn = parseInt(par.getAttribute("colind"));
        console.log(laststepobj);
    }
}


let chess1 =  document.querySelectorAll("img");

for(let i=0;i<chess1.length;i++)
{
    
    chess1[i].addEventListener("click",allimgclick);
}