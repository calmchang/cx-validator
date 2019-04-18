import schema from "async-validator";

// transform(value){return value.trim();}

var mobileNum={type:"string",required:true,pattern:/^1\d{10}$/,message:"手机号格式错误"};
var mobileCode = {type:"string",required:true,len:4,message:"短信验证码格式错误"};
var imgCode={type:"string",required:true,len:4,message:"图形验证码格式错误"};
var imgCodeId={type:"string",required:true,message:"请先获取图形验证码"};
var cid={type:"string",required:true,validator:checkCID,message:"身份证格式错误"};
var name={type:"string",required:true,pattern:/^\S{2,16}$/,message:"姓名格式错误,请使用2-16位字符"};
var weChatNo={type:"string",required:true,pattern: /^\S{6,30}$/,message:"微信号格式错误,请使用6-30位字符"};
var email={type:"string",required:true,pattern:/^\S+[@]\S+[.]\S+$/,message:"邮箱格式错误"};
var bankCardNo={type:"string",required:true,pattern:/^\d{16,19}$/,message:"银行卡号格式错误"};

function checkCID(rule,code) {
  return new Promise((reslove,reject)=>{
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      reject("fail");return;
    } else if (!city[code.substr(0, 2)]) {
      reject("fail");return;
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          reject("fail");return;
        }
      }
    }
    reslove();
  })
  
}

var list = {
  getImageCode:{
    mobileNum,
    imgCode
  },
  getSmsCode:{
    mobileNum,
    imgCode,
    imgCodeId
  },
  login:{
    mobileNum,
    mobileCode,
    imgCode,
    imgCodeId,
  },
  mobileNum:{mobileNum},
  weChatNo:{weChatNo},
  realName:{name},
  cid:{cid},
  mobileCode:{mobileCode},
  email:{email},
  bankCardNo:{bankCardNo},
  test:{
    cid,
    mobileNum
  },
  imgCodeId:{imgCodeId},
  imgCode:{imgCode},
  mobileCode:{mobileCode},

}


async function validator(rule,data,error,success){
  if(!rule){
    return {
      message:"validator-不存在的校验规则",
    };
  }
  let val = new schema(rule);
  let ret = await new Promise((reslove,reject)=>{
    data=data||"";
    //当只校验一个参数的时候，简化传入参数的格式要求
    if(typeof data !== "object"){
      for(var key in rule){
        let temp = {};
        temp[key]=data;
        data=temp;
      }
    }

    val.validate(data,{first:true},(errors,fields)=>{
      if(errors){
        reslove(errors[0])
        return;
      }
      reslove();
    });
  })
  return ret;
}

export default {
  validator:validator,
  rules:list
}
