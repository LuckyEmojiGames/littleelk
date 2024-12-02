function calculateArbitrage() {
    const amount = parseFloat(document.getElementById('amount').value);
    const months = parseInt(document.getElementById('months').value);

    if (isNaN(amount) || isNaN(months)) {
        document.getElementById('result').textContent = 'Please enter valid numbers.';
        return;
    }

    // Расчет по формуле: (amount - 2%) + 68% = intermediate_result
    const intermediateResult = (amount - (amount * 0.02)) + (amount * 0.68);

    // intermediate_result - amount = profit
    const profit = intermediateResult - amount;

    // profit * months = total_profit
    const totalProfit = profit * months;

    // total_profit - 30% = final_result
    const finalResult = totalProfit - (totalProfit * 0.30);

    document.getElementById('result').textContent = `Ваш доход: ${finalResult.toFixed(2)} ₽`;
}
