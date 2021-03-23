'use strict';

const BEACHES = {
    "Leadbetter": {
        "name": "Leadbetter",
        "city": "Santa Barbara",
        "county": "Santa Barbara",
        "coordinates": [34.40167967459778, -119.69954826365083],
    },
    "Devereaux": {
        "name": "Devereux",
        "city": "Isla Vista",
        "county": "Santa Barbara",
        "coordinates": [34.40835141444057, -119.87608857556975],
    },
    "Refugio": {
        "name": "Refugio",
        "city": "Goleta",
        "county": "Santa Barbara",
        "coordinates": [34.461049754278456, -120.07392247798518],
    },
    "Swamis": {
        "name": "Swamis",
        "city": "Encinitas",
        "county": "San Diego",
        "coordinates": [33.034574614040665, -117.29281022829862],
    },
    "Breakwater": {
        "name": "Breakwater",
        "city": "Capitola",
        "county": "Santa Cruz",
        "coordinates": [36.9721835406375, -121.95171971878953],
    },
    "SaltCreek": {
        "name": "Salt Creek",
        "city": "Dana Point",
        "county": "Orange",
        "coordinates": [33.47833708183752, -117.72330055840274],
    },
    "15th": {
        "name": "15th",
        "city": "Del Mar",
        "county": "San Diego",
        "coordinates": [32.95892175127866, -117.26831689292193],
    },
    "Del Mar": {
        "name": "Del Mar",
        "city": "Del Mar",
        "county": "San Diego",
        "coordinates": [32.96000550231709, -117.26854577016191],
    },
    "Pipes": {
        "name": "Pipes",
        "city": "Encinitas",
        "county": "San Diego",
        "coordinates": [33.0240490454094, -117.28656341419166],
    },
    "Turtles": {
        "name": "Turtles",
        "city": "Encinitas",
        "county": "San Diego",
        "coordinates": [33.04874896287073, -117.29794587833848],
    },
    "Broad Beach": {
        "name": "Broad Beach",
        "city": "Malibu",
        "county": "Los Angeles",
        "coordinates": [34.0374162149384, -118.86739705632482],
    },
    "Malibu": {
        "name": "Malibu",
        "city": "Malibu",
        "county": "Los Angeles",
        "coordinates": [34.04001756197459, -118.65728553962593],
    },
    "36th": {
        "name": "36th",
        "city": "Pleasure Point",
        "county": "Santa Cruz",
        "coordinates": [36.95738308808722, -121.96966207938021],
    },
    "Jacks": {
        "name": "Jacks",
        "city": "Pleasure Point",
        "county": "Santa Cruz",
        "coordinates": [36.95820670334518, -121.96891832511201],
    },
    "Privates": {
        "name": "Privates",
        "city": "Pleasure Point",
        "county": "Santa Cruz",
        "coordinates": [36.967166804956946, -121.96048755807334],
    },
    "Sharks": {
        "name": "Sharks",
        "city": "Pleasure Point",
        "county": "Santa Cruz",
        "coordinates": [36.962384574001725, -121.97524423726465],
    },
    "Cardiff": {
        "name": "Cardiff",
        "city": "San Diego",
        "county": "San Diego",
        "coordinates": [33.010901005977644, -117.27988761034455],
    },
    "La Jolla": {
        "name": "La Jolla",
        "city": "San Diego",
        "county": "San Diego",
        "coordinates": [32.855775803812634, -117.27226320793417],
    },
    "San Onofre State Beach": {
        "name": "San Onofre State Beach",
        "city": "San Onofre",
        "county": "San Diego",
        "coordinates": [33.373250811708836, -117.56567295668879],
    },
    "Trails": {
        "name": "Trails",
        "city": "San Onofre",
        "county": "San Diego",
        "coordinates": [33.37678061969037, -117.56926950420862],
    },
    "Campus Point": {
        "name": "Campus Point",
        "city": "Santa Barbara",
        "county": "Santa Barbara",
        "coordinates": [34.406593860722225, -119.84358164981026],
    },
    "Rincon": {
        "name": "Rincon",
        "city": "Santa Barbara",
        "county": "Santa Barbara",
        "coordinates": [34.35057749621006, -119.41066780480162],
    },
    "Cowells": {
        "name": "Cowells",
        "city": "Santa Cruz",
        "county": "Santa Cruz",
        "coordinates": [36.961652895291216, -122.0249019288201],
        "image": {
            "path": "images/beaches/cowells.jpg",
            "source": "https://santacruzlocal.org/wp-content/uploads/2020/05/20200503shelter-cowells-1-jmg-scaled.jpg"
        }
    },
    "Pismo": {
        "name": "Pismo",
        "city": "San Luis Obispo",
        "county": "San Luis Obispo",
        "coordinates": [35.12731946915043, -120.63812757602244],
        "image": {
            "path": "images/beaches/pismo.jpg",
            "source": "https://www.nationalgeographic.com/content/dam/travel/rights-exempt/Travel-2016/pismo-beach/skyline-sunset-pismo-beach-california.ngsversion.1473850181433.adapt.1900.1.jpg"
        }
    },
    "C-Street": {
        "name": "C-Street",
        "city": "Ventura",
        "county": "Ventura",
        "coordinates": [34.27463717426635, -119.29935863867594],
        "image": {
            "path": "images/beaches/c-street.jpg",
            "source": "https://i.vimeocdn.com/video/683549522.jpg?mw=1920&mh=1080&q=70"
        }
    },
}
