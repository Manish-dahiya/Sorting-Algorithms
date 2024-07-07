

// Default array
const defaultArr = [100, 90, 80, 70, 60, 50, 40, 30, 20, 5];
let currentArr = [...defaultArr]; 

let parentDiv = document.querySelector(".parentDiv");
let startBtn = document.querySelector(".start-btn");
let resetBtn = document.querySelector(".reset-btn");
let algorithmSelect = document.querySelector("#algorithm-select");
let inputbox = document.querySelector("#input-arr");

// Function to initialize positioning of bars
function initialPositioning(array) {
    parentDiv.innerHTML = ""; // Clear previous bars
    for (let i = 0; i < array.length; i++) {
        let eleBar = document.createElement("div");
        eleBar.style.height = array[i] * 6 + "px";
        eleBar.innerHTML = array[i];
        eleBar.setAttribute("id", "eleBar" + i);
        eleBar.classList.add("eleBar");
        parentDiv.appendChild(eleBar);
    }
}

// Initialize with the default array on page load
initialPositioning(defaultArr);

// Reset button event listener
resetBtn.addEventListener("click", () => {
    let inputArr=inputbox.value.trim().split(" ").map((ele)=>{
        return parseInt(ele);
    });
    // Use default or user input array
    if (inputArr.length > 1) {
        currentArr = [...inputArr];
    } else {
        currentArr = [...defaultArr];
    }

    // Reinitialize the visualization
    initialPositioning(currentArr);
});

// Start button event listener
startBtn.addEventListener("click", async () => {
   
    let inputArr=inputbox.value.trim().split(" ").map((ele)=>{
                return parseInt(ele);
            });
    console.log(inputArr);
    

    // Use default or user input array
    if (inputArr.length > 1) {
        currentArr = [...inputArr];
    } else if(inputArr) {
        console.log(inputArr);
        
        currentArr = [...defaultArr];
    }

    // Reinitialize the visualization with the chosen array
    initialPositioning(currentArr);

    // Sort the chosen array using the selected algorithm
    let selectedAlgorithm = algorithmSelect.value;
    if (selectedAlgorithm === "bubbleSort") {
        await bubbleSort(currentArr);
    } else if (selectedAlgorithm === "selectionSort") {
        await selectionSort(currentArr);
    } else if (selectedAlgorithm === "insertionSort") {
        await insertionSort(currentArr);
    } else if (selectedAlgorithm === "mergeSort") {
        await mergeSort(currentArr, 0, currentArr.length - 1);
    }
});

// Function to create a delay
const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

// Sorting algorithm functions

async function bubbleSort(arr) {
    for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                await sleep(500); // Add delay
                swapNumber(arr, j, j + 1);
                swapBars(j, j + 1); // Update bars based on the new indices
            }
        }
    }
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let miniat = i;
        for (let j = i; j < arr.length; j++) {
            await sleep(400);
            if (arr[miniat] > arr[j]) {
                miniat = j;
            }
        }
        swapNumber(arr, i, miniat);
        swapBars(i, miniat); // Update bars based on the new indices
    }
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            swapNumber(arr, j, j - 1);
            swapBars(j, j - 1); // Update bars based on the new indices
            j--;
            await sleep(500);
        }
    }
}

async function mergeSort(arr, low, high) {
    if (low >= high) return;

    let mid = Math.floor((low + high) / 2);

    await mergeSort(arr, low, mid);

    await mergeSort(arr, mid + 1, high);

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

function swapBars(index1, index2) {
    let bar1 = document.getElementById("eleBar" + index1);
    let bar2 = document.getElementById("eleBar" + index2);

    let height1 = bar1.clientHeight;
    let height2 = bar2.clientHeight;
    bar1.style.height = height2 + "px";
    bar2.style.height = height1 + "px";

    let text1 = bar1.innerHTML;
    let text2 = bar2.innerHTML;
    bar1.innerHTML = text2;
    bar2.innerHTML = text1;
}

function swapMergeBars(arr, low, temp) {
    for (let i = 0; i < temp.length; i++) {
        let bar = document.getElementById("eleBar" + (low + i));
        bar.style.height = temp[i] * 6 + "px"; // Adjust the height based on the element's value
        bar.innerHTML = temp[i];              // Update the displayed value
    }
}
