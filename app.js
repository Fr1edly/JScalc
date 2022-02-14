const express = require("express");
const log4js = require('log4js');

log4js.configure({
    appenders: { 'file': { type: 'file', filename: 'srt.log' } },
    categories: { default: { appenders: ['file'], level: 'all' } }
  });
var logger = new log4js.getLogger('srt');

const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();


//Это у нас подключение начальной страницы (здесь подключаается всё, сама страница, скрипты и стиль)
app.use(express.static(`${__dirname}/assets`));
//записываем в лог, что мы запустили сервер
logger.info('Server started at 3000 socket')

//обработчик запроса POST к /log
app.post('/log', jsonParser, function(request, response){
  logger.warn(request.body)
});
//обработчик запроса POST к /fail
app.post('/fail', jsonParser, function(request, response){
  logger.info(request.body)
});
//говорим приложению слушать 3000 порт
app.listen(3000);