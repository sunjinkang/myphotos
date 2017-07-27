var express = require("express");
var app = express();
var router = require("./controllers");
app.listen(4000);
app.get("/",router.showIndex);
app.set("view engine","ejs");
//若要一个文件夹可以直接被访问到，可以使用express.static方法
app.use(express.static("./public"));
app.use(express.static("./uploads"));
//添加处理 /:dirName
app.get("/:dirName",router.showPhotos);
app.get("/up",router.showUpload);
//处理上传图片功能
app.post("/up",router.doPost);
//一定要写在最后，中间件如果有范围问题，小范围在上，大范围在下，报错的写在最下面
app.use(function(req,res){
    res.render("err");
});