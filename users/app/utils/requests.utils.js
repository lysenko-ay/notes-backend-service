const http = require('http');

module.exports = {
  post: (host, port, path, data) => {
    return new Promise((resolve, reject) => {
      let postData = new URLSearchParams(data).toString();

      let options = {
        host: host,
        port: port,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      let request = http.request(options, (res) => {
        res.setEncoding('utf8');
        let output = "";

        res.on('data', (chunk) => {
          output += chunk;
        });

        res.on('end', () => {
          resolve(output);
        });
      });

      // post the data
      request.write(postData);
      request.end();
    })
  }
}
