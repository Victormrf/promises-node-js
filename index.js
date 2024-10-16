const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('File could not be found...');
            resolve(data);
        })
    });
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err) reject('File could not be written...');
            resolve('success');
        })
    });
}

const getDogPic = async () => {
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        // const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        // console.log(res.body.message);

        // await writeFilePro('dog-img.txt', res.body.message);
        // console.log('Random dog image saved to file!')
        const resp1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const resp2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const resp3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([resp1, resp2, resp3]);
        const imgs = all.map(el => el.body.message);
        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog images saved to the file!')
    } catch(err){
        console.log(err)
    }
    return '2: Ready!'
} 

(async () => {
    try{
        console.log('1: will get dog pics');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Done gettin dog pics');
    }catch(err){
        console.log('ERROR');
    }
})();
// console.log('1: will get dog pics');
// getDogPic();
// console.log('2: Done gettin dog pics');

// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     })
//     .then(res => {
//         console.log(res.body.message);
//         return writeFilePro('dog-img.txt', res.body.message)
//     })
//     .then(() => {
//         console.log('Random dog image saved to file!')
//     })
//     .catch(err => {
//         console.log(err.message)
//     });


// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    // console.log(`Breed: ${data}`);

    // superagent
    //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
    //     .then(res => {
    //         console.log(res.body.message);

    //         fs.writeFile('dog-img.txt', res.body.message, err =>{
    //             if (err) return console.log(err.message);
    //             console.log('Random dog image saved to file!')
    //         });
    //     }).catch(err => {
    //         console.log(err.message)
    //     });
// });