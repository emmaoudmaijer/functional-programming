var kolomString = `Wat wil je worden?
Programmeur

ux designer
Designer
Visual Designer
Videograaf
geen idee
Lead front end developer/ artdirector
Ondernemer
Creative developer
geen idee
minimaal 90
geen idee
Designer met specialisatie in visual
Frontend developer
Visual designer
Visual Designer
Creative developer
Visual designer of Creative director
Ontwerper
geen idee
UX UI Designer
Piloot
geen idee
geen idee
Webdesigner met 2/3 visual en 1/3 tech
Digital nomad/ visual designer
geen idee
Visual Interface Designer
De communicatie brug tussen Front-end developer en designers
Zero
Tech Lead
geen idee
Frontend developer
Muzikant
geest
Front-end developer
geen idee
Front-end developer
CEO
full stack developer
frontend developer
Inspiratie voor andere
Visual designer
geen idee
Applicatie ontwikkelaar
weet ik nog niet
Visual Designer/Dataviz iets
Designer
CEO
Designer
geen idee
Ontwerper en devoloper
geen idee
Ux engineer
geen idee
UI Designer
Gelukkig
Gelukkig
Gelukkig
Product designer of Visual designer
Front/backender
Moet ik nog uitvinden
geen idee
Front-end developer
Webdeveloper
Frontend developer
Developer
Frontend designer
geen idee
Ondernemer/Designer
geen idee
Visual Designer
Front-end developer
gelukkig
Frontend Developer
webdeveloper
Een creatief opgeleid fenomeen
Vormgever
geen idee
"Wat wil je worden?
Programmeur

ux designer
Designer
Visual Designer
Videograaf
geen idee
Lead front end developer/ artdirector
Ondernemer
Creative developer
geen idee
minimaal 90
geen idee
Designer met specialisatie in visual
Frontend developer
Visual designer
Visual Designer
Creative developer
Visual designer of Creative director
Ontwerper
geen idee
UX UI Designer
Piloot
geen idee
geen idee
Webdesigner met 2/3 visual en 1/3 tech
Digital nomad/ visual designer
geen idee
Visual Interface Designer
De communicatie brug tussen Front-end developer en designers
Zero
Tech Lead
geen idee
Frontend developer
Muzikant
geest
Front-end developer
geen idee
Front-end developer
CEO
full stack developer
frontend developer
Inspiratie voor andere
Visual designer
geen idee
Applicatie ontwikkelaar
weet ik nog niet
Visual Designer/Dataviz iets
Designer
CEO
Designer
geen idee
Ontwerper en devoloper
geen idee
Ux engineer
geen idee
UI Designer
Gelukkig
Gelukkig
Gelukkig
Product designer of Visual designer
Front/backender
Moet ik nog uitvinden
geen idee
Front-end developer
Webdeveloper
Frontend developer
Developer
Frontend designer
geen idee
Ondernemer/Designer
geen idee
Visual Designer
Front-end developer
gelukkig
Frontend Developer
webdeveloper
Een creatief opgeleid fenomeen
Vormgever
geen idee`

var rijen = kolomString.split("\n")
console.log(rijen);

var LijstAntwoordenSchoon = new Array(); 
var opgeschoondAntwoord ='';

for(var i=0; i < LijstAntwoorden.length; i++){
	opgeschoondAntwoord = LijstAntwoorden[i];

	//-----General cleanup
	opgeschoondAntwoord = opgeschoondAntwoord.replace('devoloper', 'developer');
	opgeschoondAntwoord = opgeschoondAntwoord.replace('weet ik nog niet', 'geen idee');
	opgeschoondAntwoord = opgeschoondAntwoord.replace('Zero', 'geen idee');
	opgeschoondAntwoord = opgeschoondAntwoord.replace('Moet ik nog uitvinden', 'geen idee');
	opgeschoondAntwoord = opgeschoondAntwoord.replace('gelukkig', 'Gelukkig');
}