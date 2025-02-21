document.getElementById("submit-btn").addEventListener("click", function () {
    let dob = document.getElementById("input-box").value;
    if (!/^[0-9]{8}$/.test(dob)) {
        document.getElementById("yourdetails").innerHTML = "Please enter a valid DOB in DDMMYYYY format.";
        return;
    }
    
    let day = parseInt(dob.slice(0, 2));
    let moolank = reduce(day);
    let bhagyank = reduce([...dob].reduce((sum, digit) => sum + parseInt(digit), 0));
    
    fetch("Lucky_no.json")
        .then(response => response.json())
        .then(data => {
            let moolankFriends = getFriends(data, moolank);
            let bhagyankFriends = getFriends(data, bhagyank);
            let luckyNumbers = moolankFriends.filter(num => bhagyankFriends.includes(num));
            
            document.getElementById("yourdetails").innerHTML = `
                <p>Your Moolank is: <strong>${moolank}</strong></p>
                <p>Your Bhagyank is: <strong>${bhagyank}</strong></p>
                <p>Your Lucky Number(s): <strong>${luckyNumbers.join(", ") || "None"}</strong></p>
            `;
        })
        .catch(error => console.error("Error loading JSON:", error));
});

function reduce(num) {
    while (num >= 10) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
}

function getFriends(data, num) {
    let entry = data.find(item => item.Number == num);
    return entry ? entry.Friend.split(",") : [];
}
