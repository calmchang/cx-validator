import schema from "async-validator";

// transform(value){return value.trim();}

var mobileNum={type:"string",required:true,pattern:/^1\d{10}$/,message:"手机号格式错误"};
var mobileCode = {type:"string",required:true,len:4,message:"短信验证码格式错误"};
var imgCode={type:"string",required:true,len:4,message:"图形验证码格式错误"};
var imgCodeId={type:"string",required:true,message:"请先获取图形验证码"};
var cid={type:"string",required:true,pattern:/^\d{17}(\d|x|X)$/,message:"身份证格式错误"};
var name={type:"string",required:true,pattern:/^\S{2,16}$/,message:"姓名格式错误,请使用2-16位字符"};
var weChatNo={type:"string",required:true,pattern: /^\S{6,30}$/,message:"微信号格式错误,请使用6-30位字符"};
var email={type:"string",required:true,pattern:/^\S+[@]\S+[.]\S+$/,message:"邮箱格式错误"};
var bankCardNo={type:"string",required:true,pattern:/^\d{16,19}$/,message:"银行卡号格式错误"};

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
  bankCardNo:{bankCardNo}
}


async function validator(rule,data,error,success){
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
