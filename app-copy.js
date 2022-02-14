const http = require("http");
const express = require('express')
const log4js = require("log4js")
const fs = require("fs");

log4js.configure({
    appenders: { 'file': { type: 'file', filename: 'srt.log' } },
    categories: { default: { appenders: ['file'], level: 'all' } }
  });
var logger = new log4js.getLogger('srt');

//logger.setLevel(log4js.Level.ALL);
http.createServer(function(request, response){
    //console.log(`Запрошенный адрес: ${request.url}`);
    logger.info(`requested: ${request.url} `)
    // получаем путь после слеша
    const filePath = request.url.substr(1);
    // смотрим, есть ли такой файл
    fs.access(filePath, fs.constants.R_OK, err => {
        // если произошла ошибка - отправляем статусный код 404
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
            logger.error(`${response.statusCode}: Response not found`)
        }
        else{
            logger.info(`connected to: ${request.url}`)
            fs.createReadStream(filePath).pipe(response);
        }
      });

}).listen(3000, function(){
    logger.info(`server started at 3000 socket`)
    //console.log("Server started at 3000");
}); 