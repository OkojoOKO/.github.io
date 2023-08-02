function drawGraph(data, xAxisLabel, yAxisLabel) {
  var trace = {
    x: data.x,
    y: data.y,
    type: 'scatter',
    mode: 'lines+markers'
  };
  var layout = {
    title: 'アップロードされたデータのグラフ',
    width: window.innerWidth - 100, // 初期の幅をウィンドウサイズに合わせる
    xaxis: {
      title: xAxisLabel // X軸のラベルを設定
    },
    yaxis: {
      title: yAxisLabel // Y軸のラベルを設定
    }
  };
  Plotly.newPlot('graphContainer', [trace], layout);
}

document.getElementById('fileInput').addEventListener('change', function(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    var data = event.target.result;
    var parsedData = parseCSV(data); // CSVデータの解析などの処理

    var xAxisLabel = document.getElementById('xAxisLabel').value;
    var yAxisLabel = document.getElementById('yAxisLabel').value;

    drawGraph(parsedData, xAxisLabel, yAxisLabel); // グラフを描画
  };

  reader.readAsText(file);
}

function parseCSV(data) {
  // CSVデータを解析してデータを抽出する処理
  // ...
}
