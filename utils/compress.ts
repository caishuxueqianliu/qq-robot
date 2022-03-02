const compressing = require('compressing')
const handleSvn = require('./svnUpAndPack');
const common = require('./common');
const exec = require('child_process').exec;
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
 * @param remarks
 */
function unzip(path:string, zipName:string, packAddress:string, data:any, client:any, remarks:string){
    // 解压缩zip
    fs.exists(packAddress, (exists:any)=> {
        if(exists) {
            let ls = exec(`cd ${packAddress} && svn update`)
            ls.on('exit', async (code:any) => {
                await common.commonClient(data, client, '已更新打包分支', code)
                fs.exists(packAddress + zipName, (exists:any) => {
                    if(exists) {
                        let ls = exec(`cd ${packAddress + zipName} && svn delete --force * && svn commit -m "删除出包参数"`)
                        ls.on('exit', (code:any) => {
                            common.commonClient(data, client, '已删除出包参数', code)
                            handlerExecZip(path, packAddress, zipName, data, client, remarks)
                        })
                    }else {
                        handlerExecZip(path, packAddress, zipName, data, client, remarks)
                    }
                })
            })
        }else {
            client.sendGroupMsg(data.group_id, [
                {type:"at", qq:data.sender.user_id},
                {type:'text', text:'\n' + '解压失败，检查是否存在打包项目路径'},
            ])
        }
    })
}

async function handlerExecZip(path:string, packAddress:string, zipName:string, data:any, client:any, remarks:string) {
    await compressing.zip.uncompress(path, packAddress);
    handleSvn.svnExec(packAddress, zipName, data, client, remarks);
}

module.exports = {
    zip,
    unzip
}
