LijstAntwoorden.map(antwoord => {
	return filterTypos(antwoord);
})

function filterTypos(input) {
	input
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
		.replace('Vormgever', 'UX designer')

}
