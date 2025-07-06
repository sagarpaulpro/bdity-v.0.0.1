function calculateReturn() {
      const rate = parseFloat(document.getElementById('investmentType').value);
      const amount = parseFloat(document.getElementById('amount').value);
      const years = parseInt(document.getElementById('years').value);
      const resultDiv = document.getElementById('result');

      if (!amount || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid investment amount.';
        return;
      }
      if (!years || years <= 0) {
        resultDiv.textContent = 'Please enter a valid investment duration.';
        return;
      }

      // Compound interest formula: A = P(1 + r/100)^t
      const finalAmount = amount * Math.pow((1 + rate / 100), years);
      const profit = finalAmount - amount;

      resultDiv.innerHTML = `
        Initial Investment: $${amount.toFixed(2)}<br />
        Duration: ${years} year(s)<br />
        Interest Rate: ${rate}% per year<br />
        <strong>Estimated Return: $${finalAmount.toFixed(2)}</strong><br />
        <strong>Profit: $${profit.toFixed(2)}</strong>
      `;
    }