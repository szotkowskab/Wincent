N = 100;
user_input = document.getElementById("user_num");
rng_output = document.getElementById("pc_num");
res = document.getElementById("res");

user_input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    
        val = parseInt(user_input.value)
        if (!val)
        {
            alert("zadej int pls");
            user_input.value = ""
            return;
        }
        random = Math.floor(Math.random()*N)+1;
        rng_output.value = random;

        if (val == random){
            res.innerHTML = "<a href='../../6/kvetinac/index.html'>květináč</a>";
        }
        else{
            res.innerHTML = "Snaž se víc";

        }
        user_input.value = ""
    }
  
});