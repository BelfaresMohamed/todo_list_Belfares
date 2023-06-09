let btn = document.querySelector("#btn_add")
let input = document.querySelector("input");
let boxs = document.querySelectorAll(".box_pages3")
let drag = null


btn.addEventListener("click",()=>{
    if(input.value!==" "){
        boxs[0].innerHTML += `<p class="item" draggable="true">${input.value}</p>`
        input.value =" "
    }
    draggItem();    
})

function draggItem() {
    let items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.addEventListener("dragstart",()=>{
            drag = item;
    });
        
        item.addEventListener("dragend",()=>{
            
            drag = null
        });

        boxs.forEach(box => {
            box.addEventListener("dragover",(e)=>{
                e.preventDefault();
                box.style.backgound ="#090";
                box.style.color="#fff"
            })

            box.addEventListener("dragleave",()=>{
                box.style.backgound ="#fff";
                box.style.color="#000"
        });

        box.addEventListener("drop",()=>{
            box.append()
            box.style.backgound ="#fff";
                box.style.color="#000"
        })

        
           
           
        })




    }
    )}