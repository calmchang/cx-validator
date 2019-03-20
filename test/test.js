import validator from "../src/validator.js";
document.getElementById("app").onclick=async ()=>{
  var t = await validator.validator(validator.rules.realName, " ");
  console.log(t);
};
