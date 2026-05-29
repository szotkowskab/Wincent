let material = []
class Creature {
	constructor(imageUrl, sourceUrl, isDog, text){
		this.imageUrl = imageUrl
		this.sourceUrl = sourceUrl
		this.isDog = isDog
		this.text = text
	}
}

// ---------------------------------------------------------------------------
// ------------------- DOGS - DOGS - DOGS - DOGS - DOGS ----------------------
// ---------------------------------------------------------------------------

material.push(new Creature("https://media.discordapp.net/attachments/1046849722419253448/1046849747207585922/unknown.png?width=419&height=669",
 "https://www.shutterstock.com/cs/image-photo/fluffy-keeshond-puppy-on-plain-background-1540203995",
  true, "\n Breed: keeshond"))
material.push(new Creature("https://media.discordapp.net/attachments/1046849722419253448/1048682669770289233/image.png",
 "https://www.boredpanda.com/puppy-looks-like-cat-dog-hybrid/?utm_source=google&utm_medium=organic&utm_campaign=organicurceUrl",
  true, "\n catlike"))
  material.push(new Creature("https://media.discordapp.net/attachments/1046849722419253448/1048684115861446676/s-l1600.png?width=670&height=670",
  "https://www.ebay.com/itm/273990232599",
   true, "\n wig"))

// ---------------------------------------------------------------------------
// -------- NOT DOGS - NOT DOGS - NOT DOGS - NOT DOGS - NOT DOGS -------------
// ---------------------------------------------------------------------------

   material.push(new Creature("https://media.discordapp.net/attachments/1046849722419253448/1048697189695766609/4c571b01fea10c847905a41a47ab1105.png?width=630&height=670",
   "https://cz.pinterest.com/pin/249949848048610176/",
   false, "\n It was an ewok"))
	material.push(new Creature("https://media.discordapp.net/attachments/1046849722419253448/1048697695864356885/260px-Thylacinus.png",
   "https://en.wikipedia.org/wiki/Thylacine",
   false, "\n It was a thylacine"))
	material.push(new Creature("https://media.discordapp.net/attachments/1046849722419253448/1048698121850458172/ND_3.png?width=1021&height=670",
   "https://www.nps.gov/articles/000/coyote-info.htm",
	false, "\n It was a coyote"))





module.exports = { material: material }
/*
   creatures.push(new Creature("imageUrlString",
   "sourceUrl",
	true, ""))
	*/