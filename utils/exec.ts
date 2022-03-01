const exec = require('child_process').exec;
import { Client } from 'oicq'
/**
 * 上传svn
 * @param packAddress
 * @param zipName
 * @param data
 * @param client
 */
function svnExec(packAddress:string, zipName:string, data:any, client:any) {
    let fullPath = packAddress + zipName;
    let remarks = '出包参数上传测试';
    let svnUp = `cd ${fullPath} && svn commit -m ${remarks}`;
    let lsSvnUp = exec(svnUp);
    lsSvnUp.stdout.on('data', (res:any) => {
        client.sendGroupMsg(data.group_id, [
            {type:"at", qq:data.sender.user_id},
            {type:"text", text:'\n' + '出包参数已上传'},
            {type:'text', text:'\n' + res}
        ])
    });

    lsSvnUp.stderr.on('data', (err:any)=> {
        client.sendGroupMsg(data.group_id, [
            {type:"at", qq:data.sender.user_id},
            {type:"text", text:'\n' + '出包参数错误信息'},
            {type:'text', text:'\n' + err}
        ])
    });

    lsSvnUp.on('close', (code:any) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = {
    svnExec
}
