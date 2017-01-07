var serialPort = {}, ledState;

exports.init = function ( SARAH ) {
  var config = SARAH.ConfigManager.getConfig(),
      serial = require ("serialport"),
      SerialPort = serial.SerialPort,
      portName = config.modules.DuinoRemote.Port;

  console.log ('[INFO] Plugin DuinoRemote is initializing ...');
  if (!portName) return console.log ('[ERROR] Plugin DuinoRemote: Undefined COM Port...');

  serialPort = new SerialPort (portName, {
    baudrate: 9600,
    parser: serial.parsers.readline ('\n')
  })
  .on ('data', function (data) {
    ledState = data
  })
  .on ('error', function (erreur) {
    console.log ('[ERROR] Plugin DuinoRemote: ' + erreur)
  });
}

exports.action = function(data, callback, config){
  
  data.cmd == '?' && ledState != 0 ? data.tts=data.tts.replace ('%','éteinte') : data.tts=data.tts.replace ('%', 'allumée');

  serialPort.write (data.cmd, function (err ,byteWritten){
    if (err) console.log ('[ERROR] Plugin DuinoRemote: ' + err);
    console.log ("[INFO] Plugin DuinoRemote: Command = " + data.cmd + " (Sending " + byteWritten + " bytes)");
  });

  callback ({'tts': data.tts});
}