//引入专门获取数据的对象file
var file = require("../models/file.js");
var formidable = require("formidable");
var path = require("path");
var sd = require("silly-datetime");
var fs = require("fs");
exports.showIndex = function(req,res){
    //res.send("我是route指定的首页");
    //页面
    //读取uploads下所有的文件夹，赋值给dirNames
    //调用回调函数，有值之后填充index
    file.getdirnames(function(names){
        res.render("index",{
            "names":names
        });
    });
}
exports.showPhotos = function(req,res,next){
    //获取相册名
    var dirName = req.params.dirName;
    //根据路径名称读取内容,function为回调函数
    file.getAllPotosByDirName(dirName,function(err,photos){
        if(err){
            next();
            return;
        }
        console.log(photos);
        //将数据填充到页面
        res.render("photo",{
            "photos":photos,
            "dirName":dirName
        });
    })
}
//暴露showUpload，进入上传页面
exports.showUpload = function(req,res){
    file.getdirnames(function(names){
        res.render("upload",{
            "names":names
        });
    });
}
//提交表单信息
exports.doPost = function(req,res){
    //res.end();
    var form = new formidable.IncomingForm();
    console.log("form"+form);
    form.uploadDir = "./uploads";
    var allFile = [];
    form.on("file",function(field,file){
        allFile.push([field,file]);
    })
    .parse(req,function(err,fields,files){
        console.log("fields"+fields);
        console.log("files"+files);
        if(err){
            console.log(err);
        }
        var dirName = fields.dirName;
        allFile.forEach(function(file,index){
            var fName = file[1].name;
            var extName = path.extname(fName);
            var now = sd.format(new Date(),"YYYYMMDDHHmmss");
            var ran = parseInt(Math.random()*9999+10000);
            var oldPath = file[1].path;
            var newPath = "./uploads/"+dirName+"/"+now+ran+extName;
            fs.rename(oldPath,newPath,function(err){
                if(err){
                    res.send("改名失败");
                    return;
                }
            })
        })
        res.redirect("/");
    })
}
