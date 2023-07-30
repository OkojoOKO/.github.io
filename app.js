
グラフの幅をウィンドウサイズに合わせるには、JavaScriptを使用してグラフの幅を動的に変更する必要があります。以下の方法で実現できます。

app.jsファイルを修正して、グラフの幅をウィンドウサイズに合わせるコードを追加します。
javascript
Copy code
// ウィンドウサイズが変更されたときにグラフの幅を更新
window.addEventListener('resize', function() {
  var graphContainer = document.getElementById('graphContainer');
  Plotly.relayout(graphContainer, { width: window.innerWidth - 100 }); // 100は余白の調整用の値です
});

// グラフ描画関数
function drawGraph(data) {
  var trace = {
    x: data.x,
    y: data.y,
    type: 'scatter',
    mode: 'lines+markers'
  };
  var layout = {
    title: 'アップロードされたデータのグラフ',
    width: window.innerWidth - 100 // 初期の幅をウィンドウサイズに合わせる
  };
  Plotly.newPlot('graphContainer', [trace], layout);
}

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
