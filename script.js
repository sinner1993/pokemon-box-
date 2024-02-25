const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonHeight = document.getElementById("height");
const pokemonWeight = document.getElementById("weight");
const pokemonImg = document.getElementById("sprite");
const typesWrapper = document.getElementById("types")
const pokemonStats = document.getElementById("stats")
const submit = document.getElementById("form");
const input = document.getElementById("search-input")
const mainStats = document.getElementById("main-stats")
const hpId = document.getElementById("hp"); 
const attackId = document.getElementById("attack"); 
const defenceId = document.getElementById("defense"); 
const spAttackId = document.getElementById("special-attack"); 
const spDefenceId = document.getElementById("special-defense");
const speedId = document.getElementById("speed");
 
const table = (hp, attack, deffence, spAttack, spDeffence, speed) => {
hpId.textContent = hp;
attackId.textContent = attack;
defenceId.textContent = deffence;
spAttackId.textContent = spAttack;
spDefenceId.textContent = spDeffence;
speedId.textContent = speed;
}
const typesFunc  = (typesArr) => {
    typesWrapper.textContent = "";
    return typesArr.map((type)=>{
        let p = document.createElement("p");
        p.setAttribute("class", "type")
        p.textContent = type.type.name.toUpperCase();
        p.style.backgroundColor = `rgb(${randomColor().join()})`
        typesWrapper.append(p);
    })
}


const randomColor = () =>{
    const red =  Math.floor(Math.random() * 256);
    const green =  Math.floor(Math.random() * 256);
    const blue =  Math.floor(Math.random() * 256);
    return [red, green, blue]
}


const pokemonSection = ({name, id, weight, height}, img) =>{
pokemonName.textContent = name.toUpperCase();
pokemonId.textContent = `#${id}`;
pokemonWeight.textContent = `Weight: ${weight}`;
pokemonHeight.textContent = `Height: ${height}`;
pokemonImg.src = img;


}

const getPokemon = async(event) =>{
  event.preventDefault();   
   try{
    const respond = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input.value.toLowerCase()}`);
    if(respond.ok){
        mainStats.style.display = "block";
        pokemonStats.style.display = "flex";
        const data = await respond.json();
        const img = data.sprites.front_default;
        typesFunc(data.types)
        const hp = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const deffence = data.stats[2].base_stat;
        const spAttack = data.stats[3].base_stat;
        const spDeffence = data.stats[4].base_stat;
        const speed = data.stats[5].base_stat;
        pokemonSection(data, img)
        table(hp, attack, deffence, spAttack, spDeffence, speed )
        input.value = "";   
    }
    else{
        input.value = "";
       throw new Error(alert("Pokemon not found"))
    } 
   }catch(error){
    console.log(error,"Sdfsdfsfd")
   }
} 

submit.onsubmit = (event) => getPokemon(event);
