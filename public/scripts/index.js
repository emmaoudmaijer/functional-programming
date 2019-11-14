const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-09/sparql"
const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?cat ?catLabel (COUNT(?cho) AS ?choCount) 
WHERE {
  # geef subtypes van ruilmiddelen
  <https://hdl.handle.net/20.500.11840/termmaster12596> skos:narrower ?cat .
  ?cat skos:prefLabel ?catLabel .

  # geef de subcategorieen van ruilmiddelen
  ?cat skos:narrower* ?type .

  # geef objecten bij de onderliggende types
  ?cho edm:object ?type . 
  
} GROUP BY ?cat ?catLabel
`
function Ruilmiddelperland() {
	fetch(url +"?query="+ encodeURIComponent(query) + "&format=json")
	  .then(data => data.json())
		.then(json => json.results.bindings)
	  .then(results => {
	  //TODO: clean up results in separate function
		 results.forEach(result => {
		 results.herkomstSuper = result.herkomstSuper.value
		 results.herkomstSuper = result.herkomstSuper.value
		})    
		  console.log(results);
})
}

const sample = [
	{
	  continent: 'Munten',
	  value: 1000,
	  color: '#000000'
	},
	{
	  continent: 'Geld naar functie',
	  value: 500,
	  color: '#00a2ee'
	},
	{
	  continent: 'Gebruikspenningen met betaalwaarde',
	  value: 300,
	  color: '#fbcb39'
	},
	{
	  continent: 'Postzegels',
	  value: 600,
	  color: '#007bc8'
	},
	{
	  continent: 'Goederengeld',
	  value: 800,
	  color: '#65cedb'
	},
	{
		continent: 'Betaalpenningen',
		value: 141,
		color: '#65cedb'
	  },
	  {
		continent: 'Papiergeld',
		value: 102,
		color: '#65cedb'
	  }
  ];

  const svg = d3.select('svg');
  const svgContainer = d3.select('#container');
  
  const margin = 80;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;

  const chart = svg.append('g')
	.attr('transform', `translate(${margin}, ${margin})`);

  const xScale = d3.scaleBand()
	.range([0, width])
	.domain(sample.map((s) => s.continent))
	.padding(0.4)
  
  const yScale = d3.scaleLinear()
	.range([height, 0])
	.domain([0, 1300]);

  const makeYLines = () => d3.axisLeft()
	.scale(yScale)

  chart.append('g')
	.attr('transform', `translate(0, ${height})`)
	.call(d3.axisBottom(xScale));

  chart.append('g')
	.call(d3.axisLeft(yScale));

  chart.append('g')
	.attr('class', 'grid')
	.call(makeYLines()
	  .tickSize(-width, 0, 0)
	  .tickFormat('')
	)

  const barGroups = chart.selectAll()
	.data(sample)
	.enter()
	.append('g')

  barGroups
	.append('rect')
	.attr('class', 'bar')
	.attr('x', (g) => xScale(g.continent))
	.attr('y', (g) => yScale(g.value))
	.attr('height', (g) => height - yScale(g.value))
	.attr('width', xScale.bandwidth())
	.on('mouseenter', function (actual, i) {
	  d3.selectAll('.value')
		.attr('opacity', 0)

	  d3.select(this)
		.transition()
		.duration(300)
		.attr('opacity', 0.6)
		.attr('x', (a) => xScale(a.continent) - 5)
		.attr('width', xScale.bandwidth() + 10)

	  const y = yScale(actual.value)

// LIJN BOVEN DE BAR CHARTS VOOR EEN DUIDELIJK OVERZICHT
	  line = chart.append('line')
		.attr('id', 'limit')
		.attr('x1', 0)
		.attr('y1', y)
		.attr('x2', width)
		.attr('y2', y)

	  barGroups.append('text')
		.attr('class', 'divergence')
		.attr('x', (a) => xScale(a.continent) + xScale.bandwidth() / 2)
		.attr('y', (a) => yScale(a.value) + 30)
		.attr('fill', 'white')
		.attr('text-anchor', 'middle')

	})
	.on('mouseleave', function () {
	  d3.selectAll('.value')
		.attr('opacity', 1)

	  d3.select(this)
		.transition()
		.duration(300)
		.attr('opacity', 1)
		.attr('x', (a) => xScale(a.continent))
		.attr('width', xScale.bandwidth())

	  chart.selectAll('#limit').remove()
	  chart.selectAll('.divergence').remove()
	})

  barGroups 
	.append('text')
	.attr('class', 'value')
	.attr('x', (a) => xScale(a.continent) + xScale.bandwidth() / 2)
	.attr('y', (a) => yScale(a.value) + 30)
	.attr('text-anchor', 'middle')
	.text((a) => `${a.value}`)
  
  svg
	.append('text')
	.attr('class', 'label')
	.attr('x', -(height / 2) - margin)
	.attr('y', margin / 2.4)
	.attr('transform', 'rotate(-90)')
	.attr('text-anchor', 'middle')
	.text('Aantal ruilmiddelen')

  svg.append('text')
	.attr('class', 'label')
	.attr('x', width / 2 + margin)
	.attr('y', height + margin * 1.7)
	.attr('text-anchor', 'middle')
	.text('continent')

  svg.append('text')
	.attr('class', 'title')
	.attr('x', width / 2 + margin)
	.attr('y', 40)
	.attr('text-anchor', 'middle')
	.text('Hoeveel ruilmiddelen bevat de collectie uit welke continenten?')

  svg.append('text')
	.attr('class', 'source')
	.attr('x', width - margin / 2)
	.attr('y', height + margin * 1.7)
	.attr('text-anchor', 'start')