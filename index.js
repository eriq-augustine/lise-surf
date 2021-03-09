const MAP_PATH = 'combined-states-counties.geojson';
const LOG_PATH = 'surf-log.txt';

const WIDTH = 960;
const HEIGHT = 600;

const CENTER_X = 1450;
const CENTER_Y = 350;

const SCALE = 2750;

const CALIFORNIA_COLOR = 'rgb(69, 173, 168)';
const GREY = 'rgb(213, 222, 217)';

const CIRCLE_COLOR = 'rgb(217, 91, 67)';
const CIRCLE_RADIUS = 10;
const CIRCLE_OPACITY = 0.20;

const STATE_STROKE_WIDTH = '4px';
const STATE_STROKE_COLOR = '#fff';

const COUNTY_STROKE_WIDTH = '1px';
const COUNTY_STROKE_COLOR = '#eee';

const ORIGIN_IMAGE_WIDTH = 150;
const ORIGIN_IMAGE_HEIGHT = 150;

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
const TOTAL_DURATION_MS = 120 * 1000;
const CIRCLE_TRAVEL_DURATION_MS = 3000;

const ORIGIN_POINT = [33, -126];

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
    let svg = d3.select("body")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT);

    // Add in the origin image.
    svg.append('image')
            .attr('id', 'origin-image')
            .attr('xlink:href', 'images/lise_getoor_circle.png')
            .attr('x', projection([ORIGIN_POINT[1], ORIGIN_POINT[0]])[0] - ORIGIN_IMAGE_WIDTH / 2)
            .attr('y', projection([ORIGIN_POINT[1], ORIGIN_POINT[0]])[1] - ORIGIN_IMAGE_HEIGHT / 2)
            .attr('width', ORIGIN_IMAGE_WIDTH)
            .attr('height', ORIGIN_IMAGE_HEIGHT)
    ;

    // Update the date.
    svg.transition()
            .ease(d3.easeLinear)
            .duration(timeScale.range()[1])
            .tween("date", function() {
                let indexFunction = d3.interpolateDate(...timeScale.domain());
                let startMS = timeScale.domain()[0].getTime();
                let endMS = timeScale.domain()[1].getTime();
                let durationMS = endMS - startMS;

                return function(elapsedTime) {
                    let passedTimeMS = elapsedTime * durationMS;
                    let days = Math.trunc(passedTimeMS / 1000 / 60 / 60 / 24);

                    let date = dateFormatter(indexFunction(elapsedTime));

                    d3.select('.date')
                            .text(`Day ${days} -- ${date}`);
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
                .style("stroke-width", function(mapData) {
                    if (mapData.area_type == 'state') {
                        return STATE_STROKE_WIDTH;
                    } else {
                        return COUNTY_STROKE_WIDTH;
                    }
                })
                .style("stroke", function(mapData) {
                    if (mapData.area_type == 'state') {
                        return STATE_STROKE_COLOR;
                    } else {
                        return COUNTY_STROKE_COLOR;
                    }
                })
                .style("fill", function(mapData) {
                    if (mapData.properties.name === 'California' || mapData.area_type == 'county') {
                        return CALIFORNIA_COLOR;
                    } else {
                        return GREY;
                    }
                })

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
                            .attr("cx", projection([ORIGIN_POINT[1], ORIGIN_POINT[0]])[0])
                            .attr("cy", projection([ORIGIN_POINT[1], ORIGIN_POINT[0]])[1])
                            .attr("r", CIRCLE_RADIUS)
                            .style("fill", CIRCLE_COLOR)
                            .style("opacity", CIRCLE_OPACITY)
                            .transition()
                                .duration(CIRCLE_TRAVEL_DURATION_MS)
                                .attr("cx", projection([renderEntry.longitude, renderEntry.latitude])[0])
                                .attr("cy", projection([renderEntry.longitude, renderEntry.latitude])[1])

                    // Keep the origin image on the top.
                    svg.select('#origin-image').raise();

                }, timeScale(new Date(renderEntry.date * 1000)));
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});
