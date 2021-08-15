function twoSum(nums, target) {
  const resid = new Map();
  for (let i = 0; i < nums.length; i++){
      let num = nums[i]
      if (resid.has(target - num)){
          return [resid.get(target - num), i]
      }else{
          resid.set(num, i)
      }
  }
}

console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1] 