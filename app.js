const apiKey = 'bc416e3c661ca0b18c9420c338ddc9ed'; // ここにOpenWeatherMapから取得したAPIキーを入力してください

// APIから神奈川県の気温データを取得する関数
async function fetchTemperature() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Kanagawa,jp&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.main && data.main.temp) {
            return data.main.temp;
        } else {
            throw new Error('データの取得に失敗しました。');
        }
    } catch (error) {
        console.error('エラー:', error.message);
        return null;
    }
}

// HTMLに気温を表示する関数
async function displayTemperature() {
    const temperatureElement = document.getElementById('temperature');
    temperatureElement.textContent = 'データ取得中...';

    const temperature = await fetchTemperature();
    if (temperature !== null) {
        temperatureElement.textContent = `神奈川県の気温: ${temperature}℃`;
    } else {
        temperatureElement.textContent = 'データの取得に失敗しました。';
    }
}

// ページ読み込み時に気温を表示
window.addEventListener('load', displayTemperature);
