## 类似json-schema的，用于校验参数是否负责规则的插件


```javascript
  import v from "validator.js";
  var t = await v.validator(validator.rules.mobileNum, {mobileNum:"1370000001"});
  if(!t){
    console.log("校验通过")
  }else{
    console.log(t);
  }

```

# 构建  
npm install

# 打包  
npm run build

# 调试  
npm run dev

# 版本更新
npm version patch

# 发布
npm publish