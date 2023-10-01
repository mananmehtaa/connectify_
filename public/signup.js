function signup() {

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var dob = document.getElementById("dob").value;
    var gender = document.getElementById("gender").value;
    var email = document.getElementById("email").value;

    localStorage.setItem("firstname1", firstname)
    localStorage.setItem("lastname1", lastname)
    localStorage.setItem("dob1", dob)
    localStorage.setItem("gender1", gender)
    localStorage.setItem("email1", email)

}