let fs = require('fs');
let Mock = require('mockjs');
let Random = Mock.Random;

let res = Mock.mock({
    'userlist|100':[{
        'id|+1': 1,
        name:()=>Random.cname(),
        id:()=>Random.id(),
        'code|10000-60000':1,
        'phone': /^1[3578][1-9]\d{8}/,
        email:()=>Random.email(),
        'group|1':["工程维护部",
        "黄永璋组",
        "企业营销",
        "专网事业部",
        "资产管理部",
        "电信通行政",
        "人事行政部",
        "财务部",
        "电信通帐务",
        "法务部"],
        "uppergroup|1":["电信通后台2部",
        "教育业务部",
        "北京电信通电信工程有限公司",
        "北京电信通电信工程有限公司",
        "电信通后台1部",
        "北京电信通电信工程有限公司",
        "电信通后台1部",
        "电信通后台1部",
        "北京电信通电信工程有限公司",
        "电信通后台1部"],
        date:()=>Random.date()
    }]
});
fs.writeFile('user.json',JSON.stringify(res),()=>{
    console.log('success')
})
