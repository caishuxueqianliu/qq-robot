const exec = require('child_process').exec;
const common = require('./common');
import { Client } from 'oicq'
/**
 * 上传svn、执行pack脚本
 * @param packAddress
 * @param zipName
 * @param data
 * @param client
 * @param remarks
 */
function svnExec(packAddress:string, zipName:string, data:any, client:any, remarks:string) {
    let fullPath = packAddress + zipName;
    let svnUp = `cd ${fullPath} && svn add --force * --parents && svn commit -m ${remarks}`;
    let lsSvnUp = exec(svnUp);
    lsSvnUp.on('exit', async (code:any) => {
        if(code == 0) {
            await common.commonClient(data, client, '出包参数已上传', code)
            implementPack(packAddress, zipName, data, client)
        }else {
            common.commonClient(data, client, '出包参数上传错误', code)
        }
    });

    lsSvnUp.stderr.on('data', (err:any)=> {
        common.commonClient(data, client, '出包参数上传错误内容', err)
    });

    lsSvnUp.on('close', (code:any) => {
        console.log(`child process exited with code ${code}`);
    });
}

function implementPack(packAddress:string, zipName:string, data:any, client:any) {
    let fullPath = packAddress.replace('android', '');
    let pack = `cd ${fullPath} && sh pack1.sh android/${zipName}/`;
    let lsPack = exec(pack);
    lsPack.on('exit', (code:any) => {
        if(code == 0) {
            common.commonClient(data, client, '执行脚本完成', code)
        }else {
            common.commonClient(data, client, '执行脚本错误', code)
        }
    });

    lsPack.stderr.on('data', (err:any)=> {
        common.commonClient(data, client, '执行脚本错误内容', err)
    });

    lsPack.on('close', (code:any) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = {
    svnExec
}
