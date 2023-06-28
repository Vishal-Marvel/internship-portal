const signup = document.getElementById('signup');
const signin = document.getElementById('signin');
const container = document.getElementById('container');
console.log("dhanush")

signup.addEventListener('click', () =>{
    container.classList.add("right-panel-active");

})

signin.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
})