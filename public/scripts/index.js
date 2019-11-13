const url = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-09/sparql"
const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?herkomstSuper ?herkomstSuperLabel (COUNT(?cho) AS ?choCount) 
WHERE {
  # geef ruilmiddelen
  <https://hdl.handle.net/20.500.11840/termmaster12591> skos:narrower* ?type .
  ?type skos:prefLabel ?typeLabel .

  # geef de continenten
  <https://hdl.handle.net/20.500.11840/termmaster2> skos:narrower ?herkomstSuper .
  ?herkomstSuper skos:prefLabel ?herkomstSuperLabel .

  # geef per continent de onderliggende geografische termen
  ?herkomstSuper skos:narrower* ?herkomstSub .
  ?herkomstSub skos:prefLabel ?herkomstSubLabel .

  # geef objecten bij de onderliggende geografische termen
  ?cho dct:spatial ?herkomstSub .
  ?cho edm:object ?type . 
  
} GROUP BY ?herkomstSuper ?herkomstSuperLabel
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
		  //console.log(results)
// export default Route.extend({
//   model() {
//     return fetch(url+"?query="+ encodeURIComponent(query) +"&format=json") 
//     .then(res => res.json())
//     .then(json => {
//       //console.log(json.results.bindings)

//     let resultaten = json.results.bindings

//     for (let i=0; i < resultaten.length; i ++){
//       let item = resultaten [i]
//     item.typeLabel = item.typeLabel.value.value;
//     item.herkomstSuperLabel = item.herkomstSuperLabel.value
//     // item.description = item.description.value.replace(/<[^>]+>/g, '')
//     item.herkomstSubLabel = item.herkomstSubLabel.value
//     //item.img = item.picture.value
//     }
//     console.log(resultaten)
//     return resultaten
//     })
//     }

// });

const sample = [
	{
	  continent: 'Afrika',
	  value: 585,
	  color: '#000000'
	},
	{
	  continent: 'Azie',
	  value: 5325,
	  color: '#00a2ee'
	},
	{
	  continent: 'Amerika',
	  value: 200,
	  color: '#fbcb39'
	},
	{
	  continent: 'Oceanië',
	  value: 289,
	  color: '#007bc8'
	},
	{
	  continent: 'Eurazië',
	  value: 442,
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
	.domain([0, 6000]);

  // vertical grid lines
  // const makeXLines = () => d3.axisBottom()
  //   .scale(xScale)

  const makeYLines = () => d3.axisLeft()
	.scale(yScale)

  chart.append('g')
	.attr('transform', `translate(0, ${height})`)
	.call(d3.axisBottom(xScale));

  chart.append('g')
	.call(d3.axisLeft(yScale));

  // vertical grid lines
  // chart.append('g')
  //   .attr('class', 'grid')
  //   .attr('transform', `translate(0, ${height})`)
  //   .call(makeXLines()
  //     .tickSize(-height, 0, 0)
  //     .tickFormat('')
  //   )

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

//----- LIJN BOVEN DE BAR CHARTS VOOR EEN DUIDELIJK OVERZICHT---
	//   line = chart.append('line')
	// 	.attr('id', 'limit')
	// 	.attr('x1', 0)
	// 	.attr('y1', y)
	// 	.attr('x2', width)
	// 	.attr('y2', y)

	  barGroups.append('text')
		.attr('class', 'divergence')
		.attr('x', (a) => xScale(a.continent) + xScale.bandwidth() / 2)
		.attr('y', (a) => yScale(a.value) + 30)
		.attr('fill', 'white')
		.attr('text-anchor', 'middle')

		//PROCENTUEEL AANTAL VESCHIL LATEN ZIEN ALS HOVER
		// .text((a, idx) => {
		//   const divergence = (a.value - actual.value).toFixed(1)
		  
		//   let text = ''
		//   if (divergence > 0) text += '+'
		//   text += `${divergence}%`

		//   return idx !== i ? text : '';
		// })

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



	// const sample = [
	// 	{
	// 	  language: 'Rust',
	// 	  value: 78.9,
	// 	  color: '#000000'
	// 	},
	// 	{
	// 	  language: 'Kotlin',
	// 	  value: 75.1,
	// 	  color: '#00a2ee'
	// 	},
	// 	{
	// 	  language: 'Python',
	// 	  value: 68.0,
	// 	  color: '#fbcb39'
	// 	},
	// 	{
	// 	  language: 'TypeScript',
	// 	  value: 67.0,
	// 	  color: '#007bc8'
	// 	},
	// 	{
	// 	  language: 'Go',
	// 	  value: 65.6,
	// 	  color: '#65cedb'
	// 	},
	// 	{
	// 	  language: 'Swift',
	// 	  value: 65.1,
	// 	  color: '#ff6e52'
	// 	},
	// 	{
	// 	  language: 'JavaScript',
	// 	  value: 61.9,
	// 	  color: '#f9de3f'
	// 	},
	// 	{
	// 	  language: 'C#',
	// 	  value: 60.4,
	// 	  color: '#5d2f8e'
	// 	},
	// 	{
	// 	  language: 'F#',
	// 	  value: 59.6,
	// 	  color: '#008fc9'
	// 	},
	// 	{
	// 	  language: 'Clojure',
	// 	  value: 59.6,
	// 	  color: '#507dca'
	// 	}
	//   ];
	
	//   const svg = d3.select('svg');
	//   const svgContainer = d3.select('#container');
	  
	//   const margin = 80;
	//   const width = 1000 - 2 * margin;
	//   const height = 600 - 2 * margin;
	
	//   const chart = svg.append('g')
	// 	.attr('transform', `translate(${margin}, ${margin})`);
	
	//   const xScale = d3.scaleBand()
	// 	.range([0, width])
	// 	.domain(sample.map((s) => s.language))
	// 	.padding(0.4)
	  
	//   const yScale = d3.scaleLinear()
	// 	.range([height, 0])
	// 	.domain([0, 100]);
	
	//   // vertical grid lines
	//   // const makeXLines = () => d3.axisBottom()
	//   //   .scale(xScale)
	
	//   const makeYLines = () => d3.axisLeft()
	// 	.scale(yScale)
	
	//   chart.append('g')
	// 	.attr('transform', `translate(0, ${height})`)
	// 	.call(d3.axisBottom(xScale));
	
	//   chart.append('g')
	// 	.call(d3.axisLeft(yScale));
	
	//   // vertical grid lines
	//   // chart.append('g')
	//   //   .attr('class', 'grid')
	//   //   .attr('transform', `translate(0, ${height})`)
	//   //   .call(makeXLines()
	//   //     .tickSize(-height, 0, 0)
	//   //     .tickFormat('')
	//   //   )
	
	//   chart.append('g')
	// 	.attr('class', 'grid')
	// 	.call(makeYLines()
	// 	  .tickSize(-width, 0, 0)
	// 	  .tickFormat('')
	// 	)
	
	//   const barGroups = chart.selectAll()
	// 	.data(sample)
	// 	.enter()
	// 	.append('g')
	
	//   barGroups
	// 	.append('rect')
	// 	.attr('class', 'bar')
	// 	.attr('x', (g) => xScale(g.language))
	// 	.attr('y', (g) => yScale(g.value))
	// 	.attr('height', (g) => height - yScale(g.value))
	// 	.attr('width', xScale.bandwidth())
	// 	.on('mouseenter', function (actual, i) {
	// 	  d3.selectAll('.value')
	// 		.attr('opacity', 0)
	
	// 	  d3.select(this)
	// 		.transition()
	// 		.duration(300)
	// 		.attr('opacity', 0.6)
	// 		.attr('x', (a) => xScale(a.language) - 5)
	// 		.attr('width', xScale.bandwidth() + 10)
	
	// 	  const y = yScale(actual.value)
	
	// 	  line = chart.append('line')
	// 		.attr('id', 'limit')
	// 		.attr('x1', 0)
	// 		.attr('y1', y)
	// 		.attr('x2', width)
	// 		.attr('y2', y)
	
	// 	  barGroups.append('text')
	// 		.attr('class', 'divergence')
	// 		.attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
	// 		.attr('y', (a) => yScale(a.value) + 30)
	// 		.attr('fill', 'white')
	// 		.attr('text-anchor', 'middle')
	// 		.text((a, idx) => {
	// 		  const divergence = (a.value - actual.value).toFixed(1)
			  
	// 		  let text = ''
	// 		  if (divergence > 0) text += '+'
	// 		  text += `${divergence}%`
	
	// 		  return idx !== i ? text : '';
	// 		})
	
	// 	})
	// 	.on('mouseleave', function () {
	// 	  d3.selectAll('.value')
	// 		.attr('opacity', 1)
	
	// 	  d3.select(this)
	// 		.transition()
	// 		.duration(300)
	// 		.attr('opacity', 1)
	// 		.attr('x', (a) => xScale(a.language))
	// 		.attr('width', xScale.bandwidth())
	
	// 	  chart.selectAll('#limit').remove()
	// 	  chart.selectAll('.divergence').remove()
	// 	})
	
	//   barGroups 
	// 	.append('text')
	// 	.attr('class', 'value')
	// 	.attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
	// 	.attr('y', (a) => yScale(a.value) + 30)
	// 	.attr('text-anchor', 'middle')
	// 	.text((a) => `${a.value}%`)
	  
	//   svg
	// 	.append('text')
	// 	.attr('class', 'label')
	// 	.attr('x', -(height / 2) - margin)
	// 	.attr('y', margin / 2.4)
	// 	.attr('transform', 'rotate(-90)')
	// 	.attr('text-anchor', 'middle')
	// 	.text('Love meter (%)')
	
	//   svg.append('text')
	// 	.attr('class', 'label')
	// 	.attr('x', width / 2 + margin)
	// 	.attr('y', height + margin * 1.7)
	// 	.attr('text-anchor', 'middle')
	// 	.text('Languages')
	
	//   svg.append('text')
	// 	.attr('class', 'title')
	// 	.attr('x', width / 2 + margin)
	// 	.attr('y', 40)
	// 	.attr('text-anchor', 'middle')
	// 	.text('Most loved programming languages in 2018')
	
	//   svg.append('text')
	// 	.attr('class', 'source')
	// 	.attr('x', width - margin / 2)
	// 	.attr('y', height + margin * 1.7)
	// 	.attr('text-anchor', 'start')
	// 	.text('Source: Stack Overflow, 2018')
