/**
 *
 * @param fullPath
 */
export {}
const fs = require('fs')

// fullPath：要删除的文件夹路径
function removeFileDir(fullPath:string){
    let files = fs.readdirSync(fullPath);
    for (let item of files) {
        let stats = fs.statSync(`${fullPath}/${item}`);
        if (stats.isDirectory()) {
            removeFileDir(`${fullPath}/${item}`)
        } else {
            fs.unlinkSync(`${fullPath}/${item}`)
        }
    }
    fs.rmdirSync(fullPath)
}

module.exports = {
    removeFileDir
}

