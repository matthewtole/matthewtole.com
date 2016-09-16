var targetData = [];
weightLabels.forEach(function (label, index) {
  if (index === 0 || index === weightLabels.length - 2) {
    targetData.push(80);
  }
  targetData.push(null);
});
var ctx = document.getElementById("weightloss__chart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: weightLabels,
    datasets: [
      {
        data: weightValues,
        label: 'Weight',
        borderColor: 'red',
        pointRadius: 0
      },
      {
        data: targetData,
        label: "Target",
        borderColor: 'blue',
        spanGaps: true,
        pointRadius: 0,
        fill: false
      }
    ]
  },
  options: {
    legend: { display: false },
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:false,
          min: 70
        }
      }],
      xAxes: [
        {
          type: 'time'
        }
      ]
    }
  }
});
