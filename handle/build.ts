import { Client, Gfs } from 'oicq'
const exec = require('child_process').exec;
const fs = require('fs')
const download = require('download')
const compress = require('../utils/compress')


/**
 * 获取文件url
 * @param client
 * @param data
 * @param packageParam
 * @param packAddress
 */
function getUrl (client:Client, data:any, packageParam:string, packAddress:string) {
    var Gfss = new Gfs(client,data.group_id)
    Gfss.dir('/',0,100).then((res:any)=>{
        let zip = res.filter((item:any)=>{
            return item.name == packageParam + '.zip'
        })[0] || []
        // TODO 这边需要加一个同名压缩包 取最新 目前是默认第一个
        if(!zip.fid){
            client.sendGroupMsg(data.group_id, [
                {type:"at",qq:data.sender.user_id},
                {type:'text',text:'\n'  +  '未发现打包参数！请上传后再次执行此命令！'},
            ])
        }
        // 下载文件
        downloadZip(client, data, Gfss, zip.fid, packageParam, packAddress)
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
 * @param packageParam
 * @param packAddress
 */

function downloadZip(client:Client, data:any, Gfss:Gfs, fid:string, packageParam:string, packAddress:string){
    // TODO  暂时指定下载目录为assets下 后期自己调整
    let downloadPath = './assets/'
    Gfss.download(fid).then(async (res:any)=>{
        let d = await download(res.url)
        await fs.promises.writeFile(downloadPath + packageParam + '.zip', d)
        // client.sendGroupMsg(data.group_id, [
            // {type:"at",qq:data.sender.user_id},
            // {type:'text',text:'\n'  +  '下载地址'},
            // {type:'text',text:'\n'  +  res.url}
        // ])
        await compress.unzip(downloadPath + packageParam + '.zip', packageParam, packAddress, data, client)
    }).catch((err:any)=>{
        console.log(err)
    })
}

module.exports = {getUrl}
