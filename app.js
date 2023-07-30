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
  // CSVデータを解析してxとyのデータを抽出する処理
  // 例えば、以下のような形式を想定
  // x,y
  // 1,5
  // 2,10
  // ...
  // 解析した結果を返す
}

