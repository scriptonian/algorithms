class ScriptoniteSort {
    constructor() {
        //instance variable  
        this.arr = [];
    }

    swap(arr, j, nextslot) {
        //swap
        let temp = arr[j];
        arr[j] = arr[nextslot];
        arr[nextslot] = temp;
    }

    validateCollection(datalist) {
        if(arguments.length === 0 || !Array.isArray(this.arr)) {
            throw new Error('Either No Arguments Passed, Or Passed Param is not an Array');
        }
    }

    bubbleSort(datalist, logging) {
        //assign the data property to the passed in datalist
        this.arr = datalist;
        let numberOfPasses = 0,
            dataLength = this.arr.length;
        
        for(let i = 0; i < dataLength; i++) {
            //inner loop does the swapping
            for(let j = 0; j < dataLength - 1; j++) {
                if(this.arr[j] > this.arr[j+1]) {
                    this.swap(this.arr, j, j+1);
                }
            }
            numberOfPasses++;
        }
        //if display log if true
        if(logging){
            console.log("Number of passes: ", numberOfPasses);
            console.log("Bubble Sort Result: ", this.arr.toString());
        }
    }//end bubbleSort

    bubbleSortEnhanced(datalist, logging) {
        //assign the data property to the passed in datalist
        this.arr = datalist;

        //check if passed in is an array
        if(arguments.length === 0 || !Array.isArray(this.arr)) {
            throw new Error('Either No Arguments Passed, Or Passed Param is not an Array');
        }

        let dataLength = this.arr.length,
            numberOfPasses = 0,
            innerLoopSwap;

        for(let i = 0; i < dataLength; i++) {
            //at the beginning of each pass inner swap is false. during the inner loop we set to 
            //true if a swap really happens. If it doesnt we end the nested loops
            innerLoopSwap = false;

            // by doing dataLength - 1 - i, we avoid unnecessary comparision.
            // for example if the highest # is already at the end, we compare it again?
            for(let j = 0; j < dataLength - 1 - i; j++) {
                if(this.arr[j] > this.arr[j+1]){
                    this.swap(this.arr, j, j+1);
                    //if swap happened set to true
                    innerLoopSwap = true;
                }
            }
            //increate count
            numberOfPasses++;

            //if a swap never happened, the entire collection is sorted.
            //if it did, then lets keep iterating through collection. note: on the next iteration
            //inner loop swap is set to false on the outter for loop
            if(!innerLoopSwap) {
                console.log("Number of passes: " + numberOfPasses);
                console.log("Enhanced Bubble Sort Result: ", this.arr.toString());
                return;
            }
        }
    } //end bubbleSortEnhanced

    insertionSort(datalist) {
        //assign the data property to the passed in datalist
        this.arr = datalist;
        //check if passed in is an array
        this.validateCollection(datalist);
        //set length of array
        let dataLength = this.arr.length;
        //the outter loops starts from the second item. the first item when you start is supposed to the
        //the sorted side. So when you bring items so that side, we compare it to the 5
        for (let i = 1; i < dataLength; i++) {
            //we start at the second item in the collection, so we save that as a temp variable
            //so when we fill its slot we have a reference to its value (to insert elsewhere)
            let temp = this.arr[i];
            //placeholder is where we will insert
            let placeHolderIndex = i;
            //as long as the placeholder is greater than zero (remember always start from the second slot)
            //and the previous slot is greater than the temp var, we keep shift the numbers
            while( (placeHolderIndex > 0) && (this.arr[placeHolderIndex-1] > temp) ) {
                //if condition is met then keep shifting the values
                this.arr[placeHolderIndex] = this.arr[placeHolderIndex-1];
                placeHolderIndex--;
            }
            //after shifting is all done, insert the value into right location
            this.arr[placeHolderIndex] = temp;
        }
        console.log("Insertion Sort Result: ", this.arr.toString());
    }

    //this method uses an inner for loop instead of a while loop. The approach is also different
    //but the idea is pretty much the same
    insertionSortAlternative(datalist) {
        //assign the data property to the passed in datalist
        this.arr = datalist;
        //check if passed in is an array
        this.validateCollection(datalist);
        //set length of array
        let dataLength = this.arr.length;
        //outer loops goes to second to last element. we can do the last swap there is needed
        for (let i = 0; i < dataLength - 1; i++) {
            //bubble the element to the right position
            for(let j = i + 1; j > 0; j--) {
                if(this.arr[j] < this.arr[j-1]) {
                    this.swap(this.arr, j, j-1);
                } else {
                    //break from the loop
                    break;
                }
            }
        }
        console.log("Insertion Sort Alternative Result: ", this.arr.toString());
    }

    //use this insertion sort when working with shell sort
    insertionSortGap(datalist, startIndex, increment) {
        //set length of array
        let dataLength = datalist.length;
        //create sub lists and do sorting
        for (let i = startIndex + increment; i < dataLength; i += increment) {
            let temp = this.arr[i];
            //placeholder is where we will insert
            let placeHolderIndex = i;
            //like the insertion sort method we do the same here only using the increment values
            while( (placeHolderIndex >= increment) && (this.arr[placeHolderIndex - increment] > temp) ) {
                //if condition is met then keep shifting the values
                this.arr[placeHolderIndex] = this.arr[placeHolderIndex - increment];
                placeHolderIndex -= increment;
            }
            //after shifting is all done, insert the value into right location
            this.arr[placeHolderIndex] = temp;
        }
    }

    //this method uses two for loops instead of a while within a loop
    insertionSortGapAlternative(datalist, startIndex, increment) {
        //set length of array
        let dataLength = datalist.length;
        //create sub lists and do sorting
        for(var i = startIndex; i < dataLength; i += increment) {
            //console.log(this.arr[i]);
            for(let j = Math.min(i + increment, dataLength - 1); j - increment >= 0; j = j - increment) {
                if(this.arr[j] < this.arr[j - increment]) {
                    this.swap(this.arr, j, j - increment);
                } else {
                    break;
                }
            }
        }
    }

    shellSort(datalist) {
         //assign the data property to the passed in datalist
         this.arr = datalist;
         //check if passed in is an array
         this.validateCollection(this.arr);
        //set the increment
        let increment = Math.floor(this.arr.length / 2);
        //a long as increment is greater than 1 call the modified insertion sort with gap
        while(increment >= 1) {
            for(let i = 0; i < increment; i++) {
                this.insertionSortGap(datalist, i, increment);
                //or call the other method insertion sort method
                //this.insertionSortGapAlternative(datalist, i, increment);
            }
            //reduce the increment. we want to get to an increment on 1. which means that the 
            //collection is nearly sorted.
            increment = Math.floor(increment / 2);
        }
        //display or return final array
        console.log("---->" + this.arr.toString());
    }

    //split the datalist recursively
    mergeSplit(datalist) {
        if (datalist.length === 1) return datalist;

        const dataLength = datalist.length,
            middle = Math.floor(dataLength / 2),
        
            leftArray = datalist.slice(0, middle),
            rightArray = datalist.slice(middle);

        return this.merge(this.mergeSplit(leftArray), this.mergeSplit(rightArray));
    }

    //take two datalists and merge them into one sorted list
    merge(left, right) {
        
        //store sorted result here
        let results = [];
        
        //as long as there are elements in both passed in arrays, 
        //at the to result array in sorted order.
        while(left.length && right.length) {
            let currentMin;
            //we compare the two arrays and strip out the minimum of first items
            if(left[0] < right[0]) {
                //shift will remove the element from the array completely.
                //this way on the next iteration there is a new number. thats why we use 0 index
                currentMin = left.shift();
            } else {
                currentMin = right.shift();
            }
            results.push(currentMin);
        }

        //if the left array has any elements in it then add those to the results
        if(left.length) {
            //if there is nothing in the left, then the remaining is in the right
            results = results.concat(left);
        } else {
            //else it means left is empty and only right remains
            results = results.concat(right);
        }
        //return the entire array to caller
        return results;
    }

    mergeSort(datalist) {
        //store the results
        const results = this.mergeSplit(datalist);
        console.log("----> " + results);
    }

    partition(datalist, low, high) {
        let pivot = datalist[low]; //alternatively we can choose the middle datalist[Math.floor((right + left) / 2)]
        
        while(low <= high) {
            while(datalist[low] < pivot) {
                low++;
            }
            while(datalist[high] > pivot){
                high--;
            }
            if(low <= high) {
                this.swap(datalist, low, high);
                low++;
                high--;
            }
        }

        return low;
    }

    quickRecursion(datalist, low, high) {
        //return if low is greater or equal to hight
        if(low > high) { return; }
        //set high and low marks
        let pivotPoint;
        
        pivotPoint = this.partition(datalist, low, high);
        
        if(low < pivotPoint - 1){
            this.quickRecursion(datalist, low, pivotPoint - 1);
        }
        if(pivotPoint < high) {
            this.quickRecursion(datalist, pivotPoint, high);
        }
    }

    quickSort(datalist) {
        let low = 0,
            high = datalist.length -1;

        //begin the quick sort algorithm by calling the recursive function
        this.quickRecursion(datalist, low, high);
        //display final results
        console.log(datalist);
    }

    heapSort() {
        //please see heapsort.js for heap sort
        console.log('Please use heapsort.js')
    }
}