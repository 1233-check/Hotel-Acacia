/* ============================================
   HOTEL ACACIA — Admin Dashboard Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Chart.js Configuration
  const ctx = document.getElementById('revenueChart').getContext('2d');
  
  // Gradient for the chart
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(200, 164, 94, 0.4)');
  gradient.addColorStop(1, 'rgba(200, 164, 94, 0.0)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(26, 58, 42, 0.4)');
  gradient2.addColorStop(1, 'rgba(26, 58, 42, 0.0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Direct Bookings (Automated)',
          data: [12000, 19000, 15000, 22000, 38000, 42000, 30000],
          borderColor: '#c8a45e',
          backgroundColor: gradient,
          borderWidth: 3,
          pointBackgroundColor: '#c8a45e',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          tension: 0.4
        },
        {
          label: 'OTA Bookings',
          data: [25000, 20000, 22000, 18000, 25000, 28000, 20000],
          borderColor: '#1a3a2a',
          backgroundColor: gradient2,
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: '#1a3a2a',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: { family: "'Inter', sans-serif", size: 12 }
          }
        },
        tooltip: {
          backgroundColor: '#1a3a2a',
          titleFont: { family: "'Inter', sans-serif", size: 13 },
          bodyFont: { family: "'Inter', sans-serif", size: 14 },
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) { label += ': '; }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { borderDash: [2, 4], color: '#e0e6ed', drawBorder: false },
          ticks: {
            font: { family: "'Inter', sans-serif", size: 11 },
            color: '#999',
            callback: function(value) {
              return '₹' + (value / 1000) + 'k';
            }
          }
        },
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: '#999' }
        }
      },
      interaction: { intersect: false, mode: 'index' },
    }
  });

  // Action Buttons Interactivity (Demo only)
  document.querySelectorAll('.btn-sm').forEach(btn => {
    btn.addEventListener('click', function() {
      const originalText = this.innerText;
      if(originalText === 'View') return;
      
      this.innerText = 'Sending...';
      setTimeout(() => {
        this.innerText = 'Sent ✅';
        this.style.color = '#2e7d32';
        this.style.borderColor = '#2e7d32';
        this.style.backgroundColor = '#e8f5e9';
      }, 800);
    });
  });
});
