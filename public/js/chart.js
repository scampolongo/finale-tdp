document.addEventListener('DOMContentLoaded', () => {
  async function loadChart() {
    const res = await fetch('/api/stock?symbol=SPY');
    const data = await res.json();
    if (!data.values) {
      console.error('No data values', data);
      return;
    }
    const labels = data.values.map(v => v.datetime).reverse();
    const prices = data.values.map(v => v.close).reverse();
    if (window.myChart) window.myChart.destroy();
    const ctx = document.getElementById('chart').getContext('2d');
    window.myChart = new Chart(ctx, { type: 'line', data: { labels, datasets: [{ label: 'S&P 500', data: prices }] } });
  }
  loadChart();
});
