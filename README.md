# Countries-List using ReactJS and NodeJS
The following technologies are used to build it.<br/>
<ol><li>React 18.3.1</li>
<li>Node 20.12.2</li>
<li>Typescript</li></ol>

# Countries-List Contents:
<ul><li>Fetches list of all countries by default, which show the name, flag, region and local date &time.</li>
<li>Can enter different filters like search by Country Name or Capital Name, also can select the regions or timezones using the dropdown.</li>
<li>Can also enable Load More Data feature by which the countries are fetched upto a limit (presently 5), after which clicking on 'Load More Countries' fetches the next set of countries till the end.</li>
<li>Clicking on a country will give more details like Currency, languages,and region.</li>
<li>Features like loading Spinner, caching, lazy loading images, error messages, basic styling and responsiveness.</li>
<li>NodeJS backend provides a list of functions like fetching all countries, also can implement using code, name, region, capital, timezone.</li>
<li>The API is fetched from <a href="https://restcountries.com/v3.1/all" target="_blank">https://restcountries.com/v3.1/all</a> the first time and stored into data.json for subsequent uses, routed through the country.routes.js and country.controller.js provides the functions.</li>
<li>The errorHandler method in Utils > error.js handles the errors in the backend.</li>
<li>The fetchCountries method in client > src > useLoadData.tsx fetches the country list from the API and the regions and timezones list are created.</li>
</ul>

# Preview:
<img src="countrylist.png"/><br/>
<img src="countrylistdetails.png"/>

# Development Server
Run `npm run dev` in the root for the backend server, accessed by localhost:3000<br/>
Open another terminal, enter `cd client` and run `npm run dev` for the client server, accessed using localhost:5173<br/>
The application should automatically reload if any source files are changed.

