import validator from "../src/validator.js";
document.getElementById("app").onclick=async ()=>{
  // var t = await validator.validator(validator.rules.cid, "310110199");
  var t = await validator.validator(validator.rules.test, {mobileNum:"1370000001",cid:"310110198710072332"});
  if(!t){
    console.log("校验通过")
  }else{
    console.log(t);
  }
};
