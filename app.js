function drawGraph() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    var data = event.target.result;
    var parsedData = parseCSV(data); // CSVデータの解析などの処理

    var xAxisLabel = document.getElementById('xAxisLabel').value;
    var yAxisLabel = document.getElementById('yAxisLabel').value;
    var xAxisRange = document.getElementById('xAxisRange').value.split(',');
    var yAxisRange = document.getElementById('yAxisRange').value.split(',');

    var trace = {
      x: parsedData.x,
      y: parsedData.y,
      type: 'scatter',
      mode: 'lines+markers'
    };
    var layout = {
      title: 'アップロードされたデータのグラフ',
      xaxis: {
        title: xAxisLabel,
        range: [parseFloat(xAxisRange[0]), parseFloat(xAxisRange[1])]
      },
      yaxis: {
        title: yAxisLabel,
        range: [parseFloat(yAxisRange[0]), parseFloat(yAxisRange[1])]
      },
      margin: { l: 40, r: 0, t: 40, b: 30 }
    };
    Plotly.newPlot('graphContainer', [trace], layout);
  };

  reader.readAsText(file);
}

function parseCSV(data) {
  // CSVデータを解析してデータを抽出する処理
  // 以下は仮の実装です
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
