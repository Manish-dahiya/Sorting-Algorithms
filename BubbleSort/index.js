

const arr=[50,40,30,20,10];
let parentDiv=document.querySelector(".parentDiv");
let startBtn=document.querySelector(".start-btn");
let algorithmSelect=document.querySelector("#algorithm-select")


for(let i=0;i<arr.length;i++){
    let eleBar=document.createElement("div");
    eleBar.style.height=arr[i]*6+"px";
    eleBar.innerHTML=arr[i];
    eleBar.setAttribute("id","eleBar"+i);
    eleBar.classList.add("eleBar");
    parentDiv.appendChild(eleBar);
}

startBtn.addEventListener("click",async() => {
    let selectedAlgorithm = algorithmSelect.value;
    if (selectedAlgorithm === "bubbleSort") {
        await bubbleSort(arr);
    } else if (selectedAlgorithm === "selectionSort") {
        await selectionSort(arr);
    } else if (selectedAlgorithm === "mergeSort") {
        await mergeSort(arr);
    }

});
//so that it does change immediately;
const sleep=(time)=>{
    return new Promise(resolve=>setTimeout(resolve,time));
}


async function bubbleSort(arr){
    
    for(let i=arr.length;i>0;i--){
        // let didswap=0;
        for(let j=0;j<i-1;j++){
            if(arr[j]>arr[j+1]){
                await sleep(500);//to add the delay 
                swapNumber(arr,j,j+1);
                swapBars(j,j+1);
            }
            
        }
        // if(didswap==0) break;
    }
}

async function selectionSort(arr){
    for (let i = 0; i < arr.length; i++){
        let miniat = i;
        for (let j = i; j < arr.length; j++){
            await sleep(500);
          if(arr[miniat]>arr[j]){
            miniat=j;
          }
        }
        swapNumber(arr,i,miniat);
        swapBars(i,miniat)
      }
        
}



function swapNumber(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function swapBars(index1,index2){
  
    // let a="eleBar"+j;
    // let b="eleBar"+(j+1);
    
    // let bar1=document.getElementById(a)
    // let bar2=document.getElementById(b)

    let bar1 = document.getElementById("eleBar" + index1);
    let bar2 = document.getElementById("eleBar" + index2);

    let height1=bar1.clientHeight;
    let height2=bar2.clientHeight;
    bar1.style.height=height2+"px";
    bar2.style.height=height1+"px";

    let text1=bar1.innerHTML;
    let text2=bar2.innerHTML
    bar1.innerHTML=text2;
    bar2.innerHTML=text1;
}