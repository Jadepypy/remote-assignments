function binarySearchPosition(numbers, target) {
  if (numbers.length  === 0){
      return -1
  }else if (numbers.length === 1){
      return (numbers[0] === target) - 1
  }
  
  let hi = numbers.length - 1
  let lo = 0
  let mid = Math.floor((numbers.length - 1)/2)
 
  while (lo <= hi){        
      if (numbers[mid] === target){
          return mid
      }else if (numbers[mid] > target){
          hi = mid - 1
          mid = lo + Math.floor((mid - lo)/ 2)
      }else {
          lo = mid + 1
          mid = hi - Math.floor((hi - mid)/ 2)
      }      
  }
  return -1
}
console.log( binarySearchPosition([1, 2, 5, 6, 7], 1) ); // should print 0 
console.log( binarySearchPosition([1, 2, 5, 6, 7], 6) ); // should print 3