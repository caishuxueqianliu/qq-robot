const compressing = require('compressing')
async function zip(path:string){
    // compressing.zip.compressDir('nodejs-compressing-demo', 'nodejs-compressing-demo.zip')
    //     .then(() => {
    //         console.log('success');
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });
// or    如果支持 ES7
    await compressing.zip.compressDir(path, path + '.zip');

}

async function unzip(path:string,dest:string){
    // 解压缩
// compressing.zip.uncompress('nodejs-compressing-demo.zip', 'nodejs-compressing-demo3')
//     .then(() => {
//         console.log('success');
//     })
//     .catch(err => {
//         console.error(err);
//     })
// or    如果支持 ES7
    await compressing.zip.uncompress(path,dest);

}

module.exports = {
    zip,
    unzip
}
