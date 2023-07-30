document.getElementById('fileInput').addEventListener('change', function(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    var data = event.target.result;
    var parsedData = parseCSV(data); // CSVデータの解析などの処理

    var trace = {
      x: parsedData.x,
      y: parsedData.y,
      type: 'scatter',
      mode: 'lines+markers'
    };
    var layout = {
      title: 'アップロードされたデータのグラフ'
    };
    Plotly.newPlot('graphContainer', [trace], layout);
  };

  reader.readAsText(file);
});

function parseCSV(data) {
  var lines = data.split('\n');
  var x = [];
  var y = [];

  for (var i = 1; i < lines.length; i++) {
    var values = lines[i].split(',');
    if (values.length >= 2) {
      x.push(parseFloat(values[0]));
      y.push(parseFloat(values[1]));
    }
  }

  return { x: x, y: y };
}
