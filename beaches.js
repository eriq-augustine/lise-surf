'use strict';

const BEACHES = {
    "Leadbetter": {
        "name": "Leadbetter",
        "city": "Santa Barbara",
        "county": "Santa Barbara",
        "coordinates": [34.40167967459778, -119.69954826365083],
        "image": {
            "path": "images/beaches/leadbetter.jpg",
            "source": "https://i.pinimg.com/originals/e2/ed/21/e2ed21389cb01e7133dbe511ad645471.jpg"
        }
    },
    "Devereaux": {
        "name": "Devereux",
        "city": "Isla Vista",
        "county": "Santa Barbara",
        "coordinates": [34.40835141444057, -119.87608857556975],
        "image": {
            "path": "images/beaches/deveraux.jpg",
            "source": "https://odyssey.antiochsb.edu/wp-content/uploads/2015/05/IMG_3680.jpg"
        }
    },
    "Refugio": {
        "name": "Refugio",
        "city": "Goleta",
        "county": "Santa Barbara",
        "coordinates": [34.461049754278456, -120.07392247798518],
        "image": {
            "path": "images/beaches/refugio.jpg",
            "source": "https://www.parks.ca.gov/pages/30052/images/Refugio.jpg"
        }
    },
    "Swamis": {
        "name": "Swamis",
        "city": "Encinitas",
        "county": "San Diego",
        "coordinates": [33.034574614040665, -117.29281022829862],
        "image": {
            "path": "images/beaches/swamis.jpg",
            "source": "https://beachspot.org/wp-content/uploads/swamis_beach_encinitas_california.jpg"
        }
    },
    "Breakwater": {
        "name": "Breakwater",
        "city": "Capitola",
        "county": "Santa Cruz",
        "coordinates": [36.9721835406375, -121.95171971878953],
        "image": {
            "path": "images/beaches/capitola.jpg",
            "source": "https://www.californiabeaches.com/wp-content/uploads/2014/09/bigs-Capitola-beach-and-pier-Oceanview-from-California-Coast-santa-cruz-county-CA-Large.jpg"
        }
    },
    "SaltCreek": {
        "name": "Salt Creek",
        "city": "Dana Point",
        "county": "Orange",
        "coordinates": [33.47833708183752, -117.72330055840274],
        "image": {
            "path": "images/beaches/salt-creek.jpg",
            "source": "https://www.worldbeachguide.com/photos/salt-creek-beach-dana-point.jpg"
        }
    },
    "15th": {
        "name": "15th",
        "city": "Del Mar",
        "county": "San Diego",
        "coordinates": [32.95892175127866, -117.26831689292193],
        "image": {
            "path": "images/beaches/del-mar.jpg",
            "source": "https://upload.wikimedia.org/wikipedia/en/c/c4/Del_Mar_Beach_San_Diego.jpg"
        }
    },
    "Del Mar": {
        "name": "Del Mar",
        "city": "Del Mar",
        "county": "San Diego",
        "coordinates": [32.96000550231709, -117.26854577016191],
        "image": {
            "path": "images/beaches/del-mar.jpg",
            "source": "https://upload.wikimedia.org/wikipedia/en/c/c4/Del_Mar_Beach_San_Diego.jpg"
        }
    },
    "Pipes": {
        "name": "Pipes",
        "city": "Encinitas",
        "county": "San Diego",
        "coordinates": [33.0240490454094, -117.28656341419166],
        "image": {
            "path": "images/beaches/san-slijo.jpg",
            "source": "https://media1.trover.com/T/5dd725655922f8557200bbae/fixedw_large_4x.jpg"
        }
    },
    "Turtles": {
        "name": "Turtles",
        "city": "Encinitas",
        "county": "San Diego",
        "coordinates": [33.04874896287073, -117.29794587833848],
        "image": {
            "path": "images/beaches/moonlight.jpg",
            "source": "https://www.outdoorproject.com/sites/default/files/styles/cboxshow/public/1453699403/abosworth-9661.jpg?itok=EWw7O229"
        }
    },
    "Broad Beach": {
        "name": "Broad Beach",
        "city": "Malibu",
        "county": "Los Angeles",
        "coordinates": [34.0374162149384, -118.86739705632482],
        "image": {
            "path": "images/beaches/lechuza.jpg",
            "source": "http://www.californiabeaches.com/wp-content/uploads/2014/09/IMG_5073-Large.jpg"
        }
    },
    "Malibu": {
        "name": "Malibu",
        "city": "Malibu",
        "county": "Los Angeles",
        "coordinates": [34.04001756197459, -118.65728553962593],
        "image": {
            "path": "images/beaches/malibu.jpg",
            "source": "https://media.timeout.com/images/103936205/image.jpg"
        }
    },
    "36th": {
        "name": "36th",
        "city": "Pleasure Point",
        "county": "Santa Cruz",
        "coordinates": [36.95738308808722, -121.96966207938021],
        "image": {
            "path": "images/beaches/pleasure-point.jpg",
            "source": "http://images.marketleader.com/assets/85/1674385_4525099_f.JPG"
        }
    },
    "Jacks": {
        "name": "Jacks",
        "city": "Pleasure Point",
        "county": "Santa Cruz",
        "coordinates": [36.95820670334518, -121.96891832511201],
        "image": {
            "path": "images/beaches/pleasure-point.jpg",
            "source": "http://images.marketleader.com/assets/85/1674385_4525099_f.JPG"
        }
    },
    "Privates": {
        "name": "Privates",
        "city": "Pleasure Point",
        "county": "Santa Cruz",
        "coordinates": [36.967166804956946, -121.96048755807334],
        "image": {
            "path": "images/beaches/privates.jpg",
            "source": "https://i.pinimg.com/originals/bb/93/2c/bb932ccabbf7579e3f6a6578856029c7.jpg"
        }
    },
    "Sharks": {
        "name": "Sharks",
        "city": "Pleasure Point",
        "county": "Santa Cruz",
        "coordinates": [36.962384574001725, -121.97524423726465],
        "image": {
            "path": "images/beaches/pleasure-point.jpg",
            "source": "http://images.marketleader.com/assets/85/1674385_4525099_f.JPG"
        }
    },
    "Cardiff": {
        "name": "Cardiff",
        "city": "San Diego",
        "county": "San Diego",
        "coordinates": [33.010901005977644, -117.27988761034455],
        "image": {
            "path": "images/beaches/cardiff.jpg",
            "source": "https://wavehuggers.com/wp-content/uploads/2019/01/best-surf-spots-socal-cardiff-reef-encinitas-san-diego.jpg"
        }
    },
    "La Jolla": {
        "name": "La Jolla",
        "city": "San Diego",
        "county": "San Diego",
        "coordinates": [32.855775803812634, -117.27226320793417],
        "image": {
            "path": "images/beaches/la-jolla.jpg",
            "source": "https://www.californiabeaches.com/wp-content/uploads/2014/09/bigs-Sunset-at-Wipeout-Beach-La-Jolla-California-e1482282928458.jpg"
        }
    },
    "San Onofre State Beach": {
        "name": "San Onofre State Beach",
        "city": "San Onofre",
        "county": "San Diego",
        "coordinates": [33.373250811708836, -117.56567295668879],
        "image": {
            "path": "images/beaches/san-onofre-1.jpg",
            "source": "https://www.outdoorproject.com/sites/default/files/styles/cboxshow/public/1453494355/aron_bosworth-9697.jpg?itok=iK5pfcZp"
        }
    },
    "Trails": {
        "name": "Trails",
        "city": "San Onofre",
        "county": "San Diego",
        "coordinates": [33.37678061969037, -117.56926950420862],
        "image": {
            "path": "images/beaches/san-onofre-2.jpg",
            "source": "https://www.outdoorproject.com/sites/default/files/styles/cboxshow/public/1453494355/aron_bosworth-9705.jpg?itok=sVnvHgEa"
        }
    },
    "Campus Point": {
        "name": "Campus Point",
        "city": "Santa Barbara",
        "county": "Santa Barbara",
        "coordinates": [34.406593860722225, -119.84358164981026],
        "image": {
            "path": "images/beaches/campus-point.jpg",
            "source": "https://www.californiabeaches.com/wp-content/uploads/2014/09/IMG_4441-Large1.jpg"
        }
    },
    "Rincon": {
        "name": "Rincon",
        "city": "Santa Barbara",
        "county": "Santa Barbara",
        "coordinates": [34.35057749621006, -119.41066780480162],
        "image": {
            "path": "images/beaches/rincon.jpg",
            "source": "https://i.pinimg.com/originals/ec/4f/8e/ec4f8ef6ce48b28f65ca00bc57e2d1f1.jpg"
        }
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
