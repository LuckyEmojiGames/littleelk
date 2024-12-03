function toggleAnswer(button) {
    const answer = button.parentElement.nextElementSibling;
    if (answer.style.display === "none") {
        answer.style.display = "block";
        button.textContent = "-";
    } else {
        answer.style.display = "none";
        button.textContent = "+";
    }
}