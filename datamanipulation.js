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

var LijstAntwoorden = kolomString.split("\n");

var LijstAntwoordenSchoon = new Array(); 
//var opgeschoondAntwoord ='';

//loop die door de alle ruwe antwoorden heen loopt en ze opschoont met behulp van de filtertypes.
LijstAntwoorden.map(antwoord => {
  LijstAntwoordenSchoon.push(cleandata(antwoord));
});

function cleanDatat(antwoord) {
  return antwoord
    .replace('devoloper', 'developer')
    .replace('weet ik nog niet', 'geen idee')
    .replace('Zero', 'geen idee')
    .replace('Moet ik nog uitvinden', 'geen idee')
    .replace('gelukkig', 'Gelukkig')

  //-----Full stack developer
    .replace('Front/backender', 'full stack developer')

  //-----Front-End Developer
    .replace('Frontend developer', 'Front-end developer')
    .replace('frontend developer', 'Front-end developer')
    .replace('Frontend Developer', 'Front-end developer')
    .replace('Webdeveloper', 'Front-end developer')
    .replace('front end developer', 'Front-end developer')
    .replace('webdeveloper', 'Front-end developer')

  //-----UX designer
    .replace('ux designer', 'UX designer')
    .replace('Designer met specialisatie in visual', 'UX designer')
    .replace('Visual designer', 'UX designer')
    .replace('Visual Designer', 'UX designer')
    .replace('visual designer', 'UX designer')
    .replace('UX UI Designer', 'UX designer')
    .replace('Webdesigner', 'UX designer')
    .replace('Visual Interface Designer', 'UX designer')
    .replace('Ux engineer', 'UX designer')
    .replace('UI Designer', 'UX designer')
    .replace('Frontend designer', 'UX designer')
    .replace('Vormgever', 'UX designer');

};

	// //---Sort array (source: https://www.dyn-web.com/javascript/arrays/sort.php)
	LijstAntwoordenSchoon.sort(function(a,b){
	    if ( a.toLowerCase() < b.toLowerCase() ) {
	        return -1;
	    } else if ( a.toLowerCase() > b.toLowerCase() ) {
	        return 1;
	    } else {
	        return 0;
	    }
	});


	// //---Output
	console.log(LijstAntwoorden);
	console.log(LijstAntwoordenSchoon);