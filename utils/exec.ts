const exec = require('child_process').exec;
const getURL = require('../utils/getReUrl')
import { Client } from 'oicq'
/**
 * 上传svn
 * @param packAddress
 * @param zipName
 * @param data
 * @param client
 */
async function svnExec(packAddress:string, zipName:string, data:any, client:any) {
    let remarks = '出包参数上传测试'
    let newZipName = zipName + '/'
    let svnUrl = `cd ${packAddress + newZipName} && svn info`
    const lsSvnUrl = exec(svnUrl)
    lsSvnUrl.stdout.on('data', async (res:any) => {
        // let URL = await getURL.getSvnHttpURL(res)
        /**
         * @！！！！！用自己创建的svn！！！！！
         */
        // let svnUpload = `cd ${packAddress} && svn import -m ${remarks} ${newZipName} ${URL}`
        // const lsUpload = exec(svnUpload)
        // lsUpload.stdout.on('data', (res:any) => {
        //     client.sendGroupMsg(data.group_id, [
        //         {type:"at", qq:data.sender.user_id},
        //         {type:"text", text:'出包参数已上传svn'},
        //         {type:'text', text:'\n' + res}
        //     ])
        // })
        // client.sendGroupMsg(data.group_id, [
        //     {type:"at",qq:data.sender.user_id},
        //     {type:'text',text:'\n' + URL[0]}
        // ])
    });

    lsSvnUrl.stderr.on('data', (err:any)=> {
        client.sendGroupMsg(data.group_id, [
            {type:"at",qq:data.sender.user_id},
            {type:'text',text:'\n' + err}
        ])
    });

    lsSvnUrl.on('close', (code:any) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = {
    svnExec
}
