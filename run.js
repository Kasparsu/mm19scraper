const axios = require('axios');
const cheerio = require('cheerio');
const downloader = require('image-downloader');
// axios.get(`http://wumo.com/wumo`).then(function (response) {
//     //console.log(response.data);
//     const $ = cheerio.load(response.data);
//     let src = $('div.box-content a img').eq(0).attr('src');
//     let prev = $('.prev').attr('href');
//     let comic = {
//         src: 'http://wumo.com' + src,
//         prev: 'http://wumo.com' + prev
//     }
//     console.log(comic)
//
// });

async function main(){
    let comic = await getComic('http://wumo.com/wumo', 0);
    console.log(comic)
    for(let i = 1; i<=10; i++){
        comic = await getComic(comic.prev, i);
        console.log(comic)
    }
};

async function getComic(url, i){
    let response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let src = $('div.box-content a img').eq(0).attr('src');
    let prev = $('.prev').attr('href');
    let comic = {
        src: 'http://wumo.com' + src,
        prev: 'http://wumo.com' + prev
    }
    downloader.image({url: comic.src, dest: `./images/${i}.jpg`, extractFilename: false});
    return comic;
}

main();