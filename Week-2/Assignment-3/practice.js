function count(input) {
  const result = {};

  for (const letter of input){
    if (letter in result){
      result[letter] += 1;
    }else{
      result[letter] = 1;
    }
  }
  return result;
}

let input1 = ['a', 'b', 'c', 'a', 'c', 'a', 'x']; 
console.log(count(input1));// should print {a:3, b:1, c:2, x:1}

function groupByKey(input) {
  const result = {};

  for (const obj of input){
    if (obj.key in result){
      result[obj.key] += obj.value;
    }else{
      result[obj.key] = obj.value;
    }
  }
  return result
}

let input2 = [
{key: 'a', value: 3}, {key: 'b', value: 1}, {key: 'c', value: 2}, {key: 'a', value: 3}, {key: 'c', value: 5}
] 
console.log(groupByKey(input2)); // should print {a:6, b:1, c:7}