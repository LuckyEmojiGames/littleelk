function calculateArbitrage() {
    const amount = parseFloat(document.getElementById('amount').value);
    const months = parseInt(document.getElementById('months').value);

    if (isNaN(amount) || isNaN(months)) {
        document.getElementById('result').textContent = 'Проверьте правильность заполненных полей. Убедитесь, что поле, где вы указываете сумму арбитража, не содержат пробелов, точек и запятых. Сумма должна указываться только целым числом. В поле "Месяц" выберите срок, в течение которого хотите получать доход с арбитража.';
        return;
    }

    // Расчет по формуле: (amount - 2%) + 68% = intermediate_result
    const intermediateResult = (amount + (amount * 0.015));

    // intermediate_result - amount = profit
    const profit = intermediateResult - amount;

    // profit * months = total_profit
    const totalProfit = profit * months * 20;

    // total_profit - 30% = final_result
    const finalResult = totalProfit;

    document.getElementById('result').textContent = `Ваш доход: ${finalResult.toFixed(2)} ₽`;
}
