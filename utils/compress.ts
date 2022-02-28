const compressing = require('compressing')
const handleSvn = require('../utils/exec')
const fs = require('fs')
async function zip(path:string){
	//压缩zip
    await compressing.zip.compressDir(path, path + '.zip');

}
/**
 * 解压缩
 * @param path
 * @param zipName
 * @param packAddress
 * @param data
 * @param client
 */
function unzip(path:string, zipName:string, packAddress:string, data:any, client:any){
    // 解压缩zip
    fs.exists(packAddress, (exists:any)=> {
        if(exists) {
            compressing.zip.uncompress(path, packAddress);
            client.sendGroupMsg(data.group_id, [
                {type:"at", qq:data.sender.user_id},
                {type:'text', text:'\n' + '解压成功'},
            ])
        }else {
            client.sendGroupMsg(data.group_id, [
                {type:"at", qq:data.sender.user_id},
                {type:'text', text:'\n' + '解压失败，检查是否存在打包项目路径'},
            ])
        }
    })
    handleSvn.svnExec(packAddress, zipName, data, client)
}

module.exports = {
    zip,
    unzip
}
