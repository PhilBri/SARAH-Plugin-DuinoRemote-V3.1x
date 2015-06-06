var serialPort = {}, ledState;

exports.init = function ( SARAH ) {
  var config = SARAH.ConfigManager.getConfig();
  var serial = require("./serialport"),
      SerialPort = serial.SerialPort,
      portName = config.modules.DuinoRemote3.Port;
  if (!portName) return console.log('[ERROR] Plugin DuinoRemote: Undefined COM Port...');

  serialPort = new SerialPort(portName, {
    baudrate: 9600,
    parser: serial.parsers.readline('\n')
  });

  serialPort.on('data', function (data) {ledState = data});
  serialPort.on('error', function (erreur) {console.log('[ERROR] Plugin DuinoRemote: '+erreur)});
  console.log('[INFO] Plugin DuinoRemote is initializing ...');
}

exports.action = function(data, callback, config){
  
  if(data.cmd=='?') {
    ledState==0 ? data.tts=data.tts.replace('%','éteinte') : data.tts=data.tts.replace('%', 'allumée');
  }

  serialPort.write(data.cmd, function (err ,byteWritten){
    if (err) console.log('[ERROR] Plugin DuinoRemote: '+err);
    console.log("[INFO] Plugin DuinoRemote: Command = "+data.cmd+" (Sending "+byteWritten+" bytes)");
  });

  callback({'tts': data.tts});
}