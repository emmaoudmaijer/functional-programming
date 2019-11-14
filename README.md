# functional-programming
![foto](/images/datavisualisatiekopie.png)
Tijdens functional programming heb ik een datavisualisatie gemaakt voor het Nationaal Museum van Wereldculturen die collectiebreed en nuttig is voor het museum. Deze visualisatie gaat over de ruilmiddelen 

Om meer te weten over mijn concept en het proces zie mijn [wiki](https://github.com/emmaoudmaijer/Frontend-applications/wiki/Het-concept-en-het-proces)

## Query
```
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?cat ?catLabel (COUNT(?cho) AS ?choCount) 
WHERE {
  # geef subtypes van ruilmiddelen
  <https://hdl.handle.net/20.500.11840/termmaster12591> skos:narrower/skos:narrower ?cat .
  ?cat skos:prefLabel ?catLabel .

  # geef de subcategorieen van ruilmiddelen
  ?cat skos:narrower* ?type .

  # geef objecten bij de onderliggende types
  ?cho edm:object ?type . 
  
} GROUP BY ?cat ?catLabel
```

## Data manipulatie
Hier vind je de link naar het inladen en het manipuleren van de data, dit kun je ook zien in de wiki
[Data manipulatie](https://github.com/emmaoudmaijer/functional-programming/blob/master/datamanipulation.js)

## Install

```
git clone https://github.com/emmaoudmaijer/functional-programming.git
```
```
cd functional-programming
```
```js
npm install
```

## Licence

ISC - Emma Oudmaijer