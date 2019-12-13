const fetchData = () =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('done!');
        }, 1500);
    });
}

setTimeout(()=>{
    fetchData()
    .then(text => {
        console.log(`${text} - promise 1`);
        return fetchData();
    })
    
    .then( text =>{
        console.log(`${text} - promise 2`);
    })
}, 2000);


setTimeout(async () =>{
    const response = await fetchData();
    console.log(`${response} - async await 1`);

    const response2 = await fetchData();
    console.log(`${response2} - async await 2`);
}, 1200);

console.log('sync log 1');
console.log('sync log 2');