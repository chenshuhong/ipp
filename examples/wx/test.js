const axios = require("axios");
const endpoint = (中文) => `http://aa-device-svc.stage.mq-ai.cn/${encodeURI(中文)}`
// axios.get(endpoint(`作业机/$`), { params: { query: JSON.stringify({ uuid: { $or: ['6d4ff0ce-6b11-11d8-8020-349f7ba85a0e'] } }) } })

axios.get(endpoint(`作业机/$`), { params: { query: JSON.stringify({ $or: [{ uuid: '作业机uuid' }, { 设备: '外键_设备id' }] }) } }).then(data=>{
    console.log(data)
}).catch(e=>{
    console.log(e)
})