function delayedResult(n1, n2, delayTime, callback) {
  
  //by default setTimeout does not pass any arguement to callback. hence, setTimeout((n1, n2) => callback(n1 + n2), delayTime); would show undefined
  //setTimeout(() => callback(n1 + n2), delayTime);
  setTimeout(callback, delayTime, n1 + n2);
}

delayedResult(4, 5, 3000, function(result) { console.log(result);
}); // 9 (4+5) will be shown in the console after 3 seconds

delayedResult(-5, 10, 2000, function(result) { console.log(result);
}); // 5 (-5+10) will be shown in the console after 2 seconds