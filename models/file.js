var fs = require("fs");
exports.getdirnames = function(callback){
    //真正读取uploads下的所有的文件夹
    fs.readdir("./uploads",function(err,files){
        var dirNames = [];
        (function iterator(i){
            //判断遍历结束条件
            if(i==files.length){
                //res.end();
                console.log("file:"+dirNames);
                callback(dirNames);
                return;
            }
            //遍历files
            fs.stat("./uploads/"+files[i],function(err,stats){
                if(stats.isDirectory()){
                    dirNames.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);
    })
}
//暴露根据文件夹名称返回的该相册下的所有照片
exports.getAllPotosByDirName = function(dirName,callback){
    fs.readdir("./uploads/"+dirName,function(err,files){
        if(err){
            callback("没有找到该路径下的文件夹",null);
            return;
        }
        //定义一个保存当前文件下的所有图片的空数组
        var allPhoto = [];
        console.log(err);

        //依次判断files是否是文件，是就放入allPhoto
        (function iterator(i){
            //全都读取完成
            if(i==files.length){
                //调用使用者自定义的方法，并将此时的所有图片传进去
                console.log(allPhoto);
                console.log("./uploads/"+dirName+"/"+allPhoto[i]);
                callback(null,allPhoto);
                return;
            }
            //未读取完成,uploads/文件夹名称/文件名称
            fs.stat("./uploads/"+dirName+"/"+files[i],function(err,stats){
                if(err){
                    callback("该文件不存在",null);
                    return;
                }
                if(stats.isFile()){
                    allPhoto.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);
    })
}




