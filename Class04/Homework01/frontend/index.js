const userFirstName = document.getElementById("first-name");
const userLastName = document.getElementById("last-name");
const userAddress = document.getElementById("address");
const userCity = document.getElementById("city");
const submitButton = document.getElementById("submit-btn");

const USERS_URL = "http://localhost:3000/users";

const fetchUsers = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(`There, has been an error. ${error}`);
    }
};

fetchUsers(USERS_URL);

class User {
    constructor(userFirstName, userLastName, userAddress, userCity) {
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userAddress = userAddress;
        this.userCity = userCity;
    }
}

const createUser = (userFirstName, userLastName, userAddress, userCity) => {
    return new User(userFirstName, userLastName, userAddress, userCity);
};

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const user = createUser(
        userFirstName.value,
        userLastName.value,
        userAddress.value,
        userCity.value
    );

    console.log(user)
});