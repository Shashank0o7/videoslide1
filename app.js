var express                   = require("express"),
    app                       = express(),
    axios                     = require("axios");
    const resizeOptimizeImages = require('resize-optimize-images');
    const fs = require('fs')  
    const Path = require('path')  
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    const ffprobePath = require('@ffprobe-installer/ffprobe').path;
    const ffmpeg = require('fluent-ffmpeg');
    const server=app.listen(process.env.PORT || 3000,function(){
        console.log("Yeah I am connected");
     });
    var text1="hello jikjb mi"
    var proc = new ffmpeg();
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);

    
    app.get("/",function(req,response){
        function getJson(){
            axios({
                method:'get',
                url:'http://www.json-generator.com/api/json/get/cpCTgMjZNK?indent=2'
            })
            
            .then(res=>{
                /* ============================================================
                Function: Download Image
                ============================================================ */

                const download_image = (url, image_path) =>
                axios({
                url,
                responseType: 'stream',
                }).then(
                response =>
                new Promise((resolve, reject) => {
                response.data
                .pipe(fs.createWriteStream(image_path))
                .on('finish', () => resolve())
                .on('error', e => reject(e));
                }),
                );
                
                /* ============================================================
                Download Images in Order
                ============================================================ */

                (async () => {
                let example_image_1 = await download_image(res.data.employees[1].background, 'img001.png');
                fs.writeFile('t1.txt',res.data.employees[1].description,function(err,result){
                    if(err)
                    {
                        console.log(err);
                    }
                })
                
                let example_image_2 = await download_image(res.data.employees[0].background, 'img002.png');
                fs.writeFile('t2.txt',res.data.employees[0].description,function(err,result){
                    if(err)
                    {
                        console.log(err);
                    }
                })
                fs.writeFile('t3.txt',res.data.employees[2].description,function(err,result){
                    if(err)
                    {
                        console.log(err);
                    }
                })
                
                let example_image_3 = await download_image(res.data.employees[2].background, 'img003.png');
               
                 (() => {
                    // Set the options.
                    const options = {
                    images: ['./img001.png','./img002.png','./img003.png'],
                    width: 1920,
                    quality: 90
                    };
                                            
                    // Run the module.
                     resizeOptimizeImages(options);
                     setTimeout(f, 4000);
                      function f(){
                    let command = ffmpeg("./img%03d.png")
                    // let command = ffmpeg(images[1].path)
                    command
                    .inputFPS(1)
                    .outputFPS(30)
                    .videoCodec('libx264')
                    .duration(5000)
                    .videoBitrate(1024)
                    .size('640x?')
                    .loop(13.5)
                    .addInput('./audio.mp3')
                    .save("slidevideo1.mp4")
                    setTimeout(f1, 6000);
                    function f1(){
                    ffmpeg()
                    .input("slidevideo1.mp4")
                    .audioCodec("aac")
                    .audioBitrate("120k")
                    .videoBitrate('1000k', true)
                    .complexFilter([
                   
                    {
                        filter:"drawtext",
                        options: {
                        fontfile:'/usr/share/fonts/dejavu/DejaVuSans.ttf',
                        textfile:"./t2.txt",
                        enable:'between(t,0,3)',
                        // textfile:"./text1.txt",
                        // enable:'between(t,9,13)',
                        reload:1,
                        fontsize: 40,
                        fontcolor: 'yellow',
                        basetime:9000,
                        x:'(W/tw)*n',
                        y:'h-line_h-10',
                        shadowcolor: 'black',
                        shadowx: 3,
                        shadowy: 3,
                        },
                    
                        },
                        ])
                    .save("slide1.mp4")
                    }
                    setTimeout(f2, 12000);
                    function f2(){
                    ffmpeg()
                    .input("slide1.mp4")
                    .audioCodec("aac")
                    .audioBitrate("120k")
                    .videoBitrate('1000k', true)
                    .complexFilter([
                   
                    {
                        filter:"drawtext",
                        options: {
                            fontfile:'/usr/share/fonts/dejavu/DejaVuSans.ttf',
                        textfile:"./t1.txt",
                        enable:'between(t,3,6)',
                        reload:1,
                        fontsize: 40,
                        fontcolor: 'pink',
                        basetime:9000,
                        x:'(W/tw)*n',
                        y:'h-line_h-10',
                        shadowcolor: 'black',
                        shadowx: 3,
                        shadowy: 3,
                        },
                    
                        },
                        ])
                    .save("slide2.mp4")
                    
                      }
                      setTimeout(f3, 18000);
                    function f3(){
                    ffmpeg()
                    .input("slide2.mp4")
                    .audioCodec("aac")
                    .audioBitrate("120k")
                    .videoBitrate('1000k', true)
                    .complexFilter([
                   
                    {
                        filter:"drawtext",
                        options: {
                            fontfile:'/usr/share/fonts/dejavu/DejaVuSans.ttf',
                        textfile:"./t3.txt",
                        enable:'between(t,6,13)',
                        reload:1,
                        fontsize: 30,
                        fontcolor: 'pink',
                        basetime:9000,
                        x:'(W/tw)*n',
                        y:'h-line_h-10',
                        shadowcolor: 'black',
                        shadowx: 3,
                        shadowy: 3,
                        },
                    
                        },
                        ])
                    .save("FINAL.mp4")
                    
                      }
                    }
                    })();
                   
                    })();
                 }
                );
        }
        getJson();
        response.send("Your Video will be created within 15 seconds. Check the root directory.");
    })
    
    
