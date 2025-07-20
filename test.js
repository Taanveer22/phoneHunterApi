async function promiseCase() {
  let result = "first!";
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });
  result = await promise;
  console.log(result);
}
promiseCase();
