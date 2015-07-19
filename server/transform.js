var fs = require('fs');

var dir = __dirname+"/data/";
fs.readdir(dir, function(err, files) {
  for (var i=0; i<files.length; i++) {
    var file = dir + files[i];
    try {
      var content = JSON.parse(fs.readFileSync(file));
      var newContent = {
        "root" : [
          content
        ]
      };

      fs.writeFileSync(file, JSON.stringify(newContent, null, 2));
    } catch (e) {
      throw new Error("Issue with " + file + ": " + e.message);
    }
  }
})