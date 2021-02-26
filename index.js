/*  This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web"
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html

Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */

const MAP_PATH = 'us-states.geojson';
const LOG_PATH = 'surf-log.txt';

const WIDTH = 960;
const HEIGHT = 500;

const CENTER_X = 1050;
const CENTER_Y = 300;

const SCALE = 2000;

const CALIFORNIA_COLOR = 'rgb(69, 173, 168)';
const GREY = 'rgb(213, 222, 217)';
const CIRCLE_COLOR = 'rgb(217, 91, 67)';

const STROKE_WIDTH = '4px';
const STROKE_COLOR = '#fff';

const BEACHES = {
    'Capitola - Breakwater': [36.9721835406375, -121.95171971878953],
    'Dana Point - SaltCreek': [33.47833708183752, -117.72330055840274],
    'Del Mar - 15th': [32.95892175127866, -117.26831689292193],
    'Del Mar - Del Mar': [32.96000550231709, -117.26854577016191],
    'Encinitas - Pipes': [33.0240490454094, -117.28656341419166],
    'Encinitas - Turtles': [33.04874896287073, -117.29794587833848],
    'Malibu - Broad Beach': [34.0374162149384, -118.86739705632482],
    'Malibu - Malibu': [34.04001756197459, -118.65728553962593],
    'Pleasure Point - 36th': [36.95738308808722, -121.96966207938021],
    'Pleasure Point - Jacks': [36.95820670334518, -121.96891832511201],
    'Pleasure Point - Privates': [36.967166804956946, -121.96048755807334],
    'Pleasure Point - Sharks': [36.962384574001725, -121.97524423726465],
    'San Diego - Cardiff': [33.010901005977644, -117.27988761034455],
    'San Diego - La Jolla': [32.855775803812634, -117.27226320793417],
    'San Onofre - San Onofre State Beach': [33.373250811708836, -117.56567295668879],
    'San Onofre - Trails': [33.37678061969037, -117.56926950420862],
    'Santa Barbara - Campus Point': [34.406593860722225, -119.84358164981026],
    'Santa Barbara - Rincon': [34.35057749621006, -119.41066780480162],
    'Santa Cruz - Cowells': [36.961652895291216, -122.0249019288201],
    'SLO - Pismo': [35.12731946915043, -120.63812757602244],
    'Ventura - C-Street': [34.27463717426635, -119.29935863867594],

}

const START_TIME_MS = 1591920000 * 1000;
const END_TIME_MS = 1622505600 * 1000;
const TOTAL_DURATION_MS = 60 * 1000;

const DATE_FORMAT = '%a %B %d %Y';

function main() {
    let projection = d3.geoAlbersUsa()
            .translate([CENTER_X, CENTER_Y])
            .scale([SCALE]);

    // The path generator that will convert GeoJSON to SVG paths.
    let pathGenerator = d3.geoPath()
            .projection(projection);

    const timeScale = d3.scaleTime()
            .domain([new Date(START_TIME_MS), new Date(END_TIME_MS)])
            .range([0, TOTAL_DURATION_MS]);

    const dateFormatter = d3.timeFormat(DATE_FORMAT);

    // Create an SVG element and append map to the SVG.
    var svg = d3.select("body")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT);

    svg.transition()
            .ease(d3.easeLinear)
            .duration(timeScale.range()[1])
            .tween("date", function() {
                let indexFunction = d3.interpolateDate(...timeScale.domain());
                return function(elapsedTime) {
                    d3.select('.date')
                            .text(d3.timeDay(indexFunction(elapsedTime)));
                }
            });

    // Load GeoJSON data and merge with states data
    d3.json(MAP_PATH).then(function(mapGeoJSON) {
        // Bind the data to the SVG and create one path per GeoJSON feature.
        svg.selectAll("path")
                .data(mapGeoJSON.features)
                .enter()
                .append("path")
                .attr("d", pathGenerator)
                .style("stroke", STROKE_COLOR)
                .style("stroke-width", STROKE_WIDTH)
                .style("fill", function(stateMapData) {
                    if (stateMapData.properties.name === 'California') {
                        return CALIFORNIA_COLOR;
                    } else {
                        return GREY;
                    }
        });

        // Load the log.
        d3.tsv(LOG_PATH).then(function(surfLog) {
            let renderData = [];

            surfLog.forEach(function(logEntry) {
                if (logEntry.location in BEACHES) {
                    let coordinates = BEACHES[logEntry.location];

                    renderData.push({
                        'date': logEntry.date,
                        'name': logEntry.location,
                        'latitude': coordinates[0],
                        'longitude': coordinates[1],
                    });
                } else {
                    console.log("Unable to find beach: '" + logEntry.location + "'.");
                }
            });

            // Go through log entries one at a time.
            renderData.forEach(function(renderEntry) {
                // Schedule each datapoint to appear according to its date and the specified timescale.
                d3.timeout(function() {
                    svg.append("circle")
                            .attr("cx", projection([renderEntry.longitude, renderEntry.latitude])[0])
                            .attr("cy", projection([renderEntry.longitude, renderEntry.latitude])[1])
                            .attr("r", 10)
                            .style("fill", CIRCLE_COLOR)
                            .style("opacity", 0.20);
                }, timeScale(new Date(renderEntry.date * 1000)));
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});