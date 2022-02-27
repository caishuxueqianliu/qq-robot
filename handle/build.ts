import { Client, Gfs } from 'oicq'
const exec = require('child_process').exec;
const fs = require('fs')
const download = require('download')
const compress = require('../utils/compress')


/**
 * 获取文件url
 * @param client
 * @param data
 * @param str
 */
function getUrl (client:Client, data:any,str:string) {

    var Gfss = new Gfs(client,data.group_id)
    Gfss.dir('/',0,100).then((res:any)=>{
        let zip = res.filter((item:any)=>{
            return item.name == str + '.zip'
        })[0] || []
        // TODO 这边需要加一个同名压缩包 取最新 目前是默认第一个
        if(!zip.fid){
            client.sendGroupMsg(data.group_id, [
                {type:"at",qq:data.sender.user_id},
                {type:'text',text:'\n'  +  '未发现打包参数！请上传后再次执行此命令！'},
            ])
        }
        // 下载文件
        downloadZip(client,data,Gfss,zip.fid,str)
    }).catch((err:any)=>{
        console.log(err)
    })


}

/**
 * 下载文件到指定目录
 * @param client
 * @param data
 * @param Gfss
 * @param fid
 * @param str
 */

function downloadZip(client:Client,data:any,Gfss:Gfs,fid:string,str:string){
    // TODO  暂时指定下载目录为assets下 后期自己调整
    let downloadPath = './assets/'
    Gfss.download(fid).then(async (res:any)=>{
        let d = await download(res.url)
        await fs.promises.writeFile(downloadPath + str + '.zip',d)
        // client.sendGroupMsg(data.group_id, [
            // {type:"at",qq:data.sender.user_id},
            // {type:'text',text:'\n'  +  '下载地址'},
            // {type:'text',text:'\n'  +  res.url}
        // ])
        unzip(client,data,downloadPath,str+'.zip')
    }).catch((err:any)=>{
        console.log(err)
    })
}


/**
 * 解压缩
 * @param client
 * @param data
 * @param downloadPath
 * @param zipName
 */

async function unzip(client:Client,data:any,downloadPath:string,zipName:string){
    await compress.unzip(downloadPath+zipName,downloadPath)
    client.sendGroupMsg(data.group_id, [
    {type:"at",qq:data.sender.user_id},
    {type:'text',text:'\n'  +  '解压成功'},
    ])
}

module.exports = {getUrl}
