

const arr=[100,90,80,70,60,50,40,30,20,5];
let parentDiv=document.querySelector(".parentDiv");
let startBtn=document.querySelector(".start-btn");
let algorithmSelect=document.querySelector("#algorithm-select")
let inputbox=document.querySelector("#input-arr")



for(let i=0;i<arr.length;i++){
    let eleBar=document.createElement("div");
    eleBar.style.height=arr[i]*6+"px";
    eleBar.innerHTML=arr[i];
    eleBar.setAttribute("id","eleBar"+i);
    eleBar.classList.add("eleBar");
    parentDiv.appendChild(eleBar);
}

startBtn.addEventListener("click",async() => {
    
     
    let inputarr=inputbox.value.trim().split(" ");
    console.log(inputarr);
    let ARR=inputarr.map((ele)=>{
        return parseInt(ele);
    })
    console.log(ARR);
    




    //for the type of algo
    let selectedAlgorithm = algorithmSelect.value;
    if (selectedAlgorithm === "bubbleSort") {
        await bubbleSort(arr);
    } else if (selectedAlgorithm === "selectionSort") {
        await selectionSort(arr);
    } else if (selectedAlgorithm === "mergeSort") {
        await mergeSort(arr,0,arr.length-1);
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

async function mergeSort(arr, low, high) {
    if (low >= high) return;

    let mid = Math.floor((low + high) / 2);
    
    // Recursively sort the first half
    await mergeSort(arr, low, mid);
    
    // Recursively sort the second half
    await mergeSort(arr, mid + 1, high);
    
    // Merge the sorted halves
    await merge(arr, low, mid, high);
}

async function merge(arr, low, mid, high) {
    let temp = [];
    let left = low;
    let right = mid + 1;

    // Merge the two halves with delay for visualization
    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp.push(arr[left]);
            left++;
        } else {
            temp.push(arr[right]);
            right++;
        }

        // Simulate delay to visualize the merge process
        await sleep(500);
        swapMergeBars(arr, low, temp); // Update the bars visually
    }

    // Copy the remaining elements
    while (left <= mid) {
        temp.push(arr[left]);
        left++;
    }
    while (right <= high) {
        temp.push(arr[right]);
        right++;
    }

    // Move from temp back to the original array
    for (let i = low; i <= high; i++) {
        arr[i] = temp[i - low];
    }

    // Final update to visualize the array after merging
    await sleep(500);
    swapMergeBars(arr, low, temp);
}



function swapNumber(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function swapBars(index1,index2){


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
//swapping of bars for merge sort
function swapMergeBars(arr, low, temp) {
    // 'arr' is the full array, 'low' is the starting index of the segment being merged,
    // 'temp' is the temporary array containing the merged result

    for (let i = 0; i < temp.length; i++) {
        let bar = document.getElementById("eleBar" + (low + i));
        bar.style.height = temp[i] * 6 + "px"; // Adjust the height based on the element's value
        bar.innerHTML = temp[i];              // Update the displayed value
    }
}