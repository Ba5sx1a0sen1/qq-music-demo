const express = require('express')
const request = require("request-promise")
const cors = require('cors')
const app = express()
const HEADERs = {
    'accept':'application/',
    'origin':'https://m.y.qq.com',
    'authority':'c.y.qq.com',
    'referer':'https://m.y.qq.com',
    'user-agent':'"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"'
}
app.get('/',async (req,res)=>{
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1115341784&uin=314121378&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`
    try{
        res.json(await request({
            uri:url,
            json:true,
            headers:{
                'accept':'application/',
                'origin':'https://m.y.qq.com',
                'authority':'c.y.qq.com',
                'referer':'https://m.y.qq.com',
                'user-agent':'"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"'
            }
        }))
    }catch(e){
        res.json({error:e.message})
    }
})
app.get('/search',async(req,res)=>{
    const {keyword,page = 1} = req.query
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1115341784&uin=314121378&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${+new Date()}`
    try{
        res.json(await request({
            uri:url,
            json:true,
            headers:HEADERs
        }))
    }catch(e){
        res.json({error:e.message})
    }
})
app.listen(4000);