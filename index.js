'use strict';

const MAP_PATH = 'combined-states-counties.geojson';
const LOG_PATH = 'surf-log.txt';
// const LOG_PATH = 'test-surf-log.txt';

const WIDTH = 1280;
const HEIGHT = 720;

const CENTER_X = 1900;
const CENTER_Y = 450;

const SCALE = 3000;

const COUNTY_BASE_COLOR = '#45ADA8FF';
const COUNTY_START_COLOR = '#00C3FF';
const COUNTY_END_COLOR = '#FFFF1C';
const GREY = '#D5DED9';
const MAX_COUNTY_SCALE_COUNT = 100;

const STATE_STROKE_WIDTH = '4px';
const STATE_STROKE_COLOR = '#fff';

const COUNTY_STROKE_WIDTH = '1px';
const COUNTY_STROKE_COLOR = '#eee';

const TOTAL_DAYS = 365;
const START_TIME_MS = new Date('2020-04-28T00:00:00Z').getTime();
const END_TIME_MS = START_TIME_MS + (TOTAL_DAYS * 24 * 60 * 60 * 1000);
const SECONDS_PER_DAY = 1.5;
const TOTAL_DURATION_MS = SECONDS_PER_DAY * 365 * 1000;
const TRAVELER_TRAVEL_DURATION_MS = SECONDS_PER_DAY * 1000;
const TRAVELER_DELAY_BEFORE_REMOVE_MS = 350;

const ORIGIN_IMAGE_PATH = 'images/lise_getoor_circle.png';
const ORIGIN_IMAGE_WIDTH = 150;
const ORIGIN_IMAGE_HEIGHT = 150;
const ORIGIN_POINT = [600, 625];

const TRAVELER_IMAGE_PATH = 'images/surfboard.png';
const TRAVELER_IMAGE_WIDTH = 30;
const TRAVELER_IMAGE_HEIGHT = 30;

const DATE_FORMAT = '%a %B %d %Y';

function slugify(text) {
    return text.toLowerCase().trim().replaceAll(/\s+/g, '-');
}

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

    const countyColorScale = d3.scaleLinear()
            .domain([0, MAX_COUNTY_SCALE_COUNT])
            .range([COUNTY_START_COLOR, COUNTY_END_COLOR]);

    // Create an SVG element and append map to the SVG.
    let svg = d3.select('body')
            .append('svg')
            .attr('width', WIDTH)
            .attr('height', HEIGHT);

    // Add in the origin image.
    svg.append('image')
            .attr('id', 'origin-image')
            .attr('xlink:href', ORIGIN_IMAGE_PATH)
            .attr('x', ORIGIN_POINT[0] - ORIGIN_IMAGE_WIDTH / 2)
            .attr('y', ORIGIN_POINT[1] - ORIGIN_IMAGE_HEIGHT / 2)
            .attr('width', ORIGIN_IMAGE_WIDTH)
            .attr('height', ORIGIN_IMAGE_HEIGHT)
    ;

    // Load GeoJSON data and merge with states data
    d3.json(MAP_PATH).then(function(mapGeoJSON) {
        // Bind the data to the SVG and create one path per GeoJSON feature.
        svg.selectAll('path')
                .data(mapGeoJSON.features)
                .enter()
                .append('path')
                .attr('d', pathGenerator)
                .style('stroke-width', function(mapData) {
                    if (mapData.area_type == 'state') {
                        return STATE_STROKE_WIDTH;
                    } else {
                        return COUNTY_STROKE_WIDTH;
                    }
                })
                .style('stroke', function(mapData) {
                    if (mapData.area_type == 'state') {
                        return STATE_STROKE_COLOR;
                    } else {
                        return COUNTY_STROKE_COLOR;
                    }
                })
                .style('fill', function(mapData) {
                    if (mapData.properties.name === 'California' || mapData.area_type == 'county') {
                        return COUNTY_BASE_COLOR;
                    } else {
                        return GREY;
                    }
                })
                .attr('id', function(mapData) {
                    let name = slugify(mapData.properties.name);

                    if (mapData.area_type == 'state') {
                        return `state-${name}`;
                    } else {
                        return `county-${name}`;
                    }
                })
                .attr('data-visitCount', 0)

        // Load the log.
        d3.tsv(LOG_PATH).then(function(surfLog) {
            let renderData = [];
            let dayCount = 0;

            let seenBeaches = {};
            surfLog.forEach(function(logEntry) {
                dayCount++;

                if (!(logEntry.location in BEACHES)) {
                    console.log("Unable to find beach: '" + logEntry.location + "'.");
                    return;
                }

                let beach = BEACHES[logEntry.location];

                let specialEvent = undefined;
                if (!seenBeaches[logEntry.location]) {
                    specialEvent = `First Time at ${beach.name}!`;
                    seenBeaches[logEntry.location] = 0;
                }

                let beachImage = undefined;
                if (beach.image) {
                    beachImage = beach.image.path;
                }

                renderData.push({
                    'id': renderData.length,
                    'dayCount': dayCount,
                    'timestamp': logEntry.date,
                    'name': beach.name,
                    'city': beach.city,
                    'county': beach.county,
                    'latitude': beach.coordinates[0],
                    'longitude': beach.coordinates[1],
                    'image': beachImage,
                    'specialEvent': specialEvent,
                });

                seenBeaches[logEntry.location] += 1;
            });

            // Go through log entries one at a time.
            renderData.forEach(function(renderEntry) {
                // Project onto the map.
                let [sourceX, sourceY] = [ORIGIN_POINT[1], ORIGIN_POINT[0]];
                let [targetX, targetY] = projection([renderEntry.longitude, renderEntry.latitude]);

                // Adjust for the image dimensions.
                [sourceX, sourceY] = [sourceX - TRAVELER_IMAGE_WIDTH / 2, sourceY - TRAVELER_IMAGE_HEIGHT / 2];
                [targetX, targetY] = [targetX - TRAVELER_IMAGE_WIDTH / 2, targetY - TRAVELER_IMAGE_HEIGHT / 2];

                // Compute the rotation angle.
                // Swap the Y sign, since down is positive.
                let angleRadians = Math.PI / 2.0 - Math.atan(-(targetY - sourceY) / (targetX - sourceX));
                let angle = angleRadians * 180.0 / Math.PI;

                let countyID = `county-${slugify(renderEntry.county)}`;
                let county = document.querySelector(`#${countyID}`);
                if (!county) {
                    console.log(`Failed to locate county: "${renderEntry.county}" (${countyID}).`);
                }

                // Schedule each datapoint to appear according to its date and the specified timescale.
                d3.timeout(function() {
                    svg.append('image')
                            .attr('xlink:href', TRAVELER_IMAGE_PATH)
                            .attr('width', TRAVELER_IMAGE_WIDTH)
                            .attr('height', TRAVELER_IMAGE_HEIGHT)
                            .attr('transform', `rotate(${angle}, ${sourceX}, ${sourceY})`)
                            .attr('x', sourceX)
                            .attr('y', sourceY)
                            .transition()
                                .duration(TRAVELER_TRAVEL_DURATION_MS)
                                .attr('x', targetX)
                                .attr('y', targetY)
                                .attr('transform', `rotate(${angle}, ${targetX}, ${targetY})`)
                                .transition()
                                    .duration(TRAVELER_DELAY_BEFORE_REMOVE_MS)
                                    .remove()
                    ;

                    // Update the info area.
                    document.querySelector('.info-area .date').textContent = dateFormatter(renderEntry.timestamp * 1000);
                    document.querySelector('.info-area .day').textContent = renderEntry.dayCount;
                    document.querySelector('.info-area .beach').textContent = renderEntry.name;
                    document.querySelector('.info-area .city').textContent = renderEntry.city;
                    document.querySelector('.info-area .county').textContent = renderEntry.county;

                    if (renderEntry.image) {
                        document.querySelector('.info-area .beach-image').src = renderEntry.image;
                    } else {
                        document.querySelector('.info-area .beach-image').src = '';
                    }

                    // Update the county color.
                    if (county) {
                        let count = parseInt(county.dataset.visitCount, 10) + 1;
                        county.setAttribute('data-visitCount', count);
                        county.style.fill = countyColorScale(count);
                    }

                    // Mark special events.
                    if (renderEntry.specialEvent) {
                        let specialEventArea = document.querySelector('.special-event-area');
                        let specialEventBanner = document.querySelector('.special-event-area p');

                        if (specialEventBanner) {
                            specialEventBanner.remove();
                        }

                        specialEventBanner = document.createElement('p');
                        specialEventBanner.innerText = renderEntry.specialEvent;

                        specialEventArea.classList.add('active');
                        specialEventArea.classList.remove('inactive');
                        specialEventArea.appendChild(specialEventBanner);
                    } else {
                        // Fade out old special events.
                        let specialEventArea = document.querySelector('.special-event-area');
                        specialEventArea.classList.remove('active');
                        specialEventArea.classList.add('inactive');
                    }

                    // Keep the origin image on the top.
                    svg.select('#origin-image').raise();

                }, timeScale(new Date(renderEntry.timestamp * 1000)));
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function(event) {
    main();
});
