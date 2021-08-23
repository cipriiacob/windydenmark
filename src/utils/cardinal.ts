const intervals: {
    cardinal: string,
    start: number,
    end: number
}[] = [ {
    cardinal: 'N',
    start: 348.75,
    end: 360
}, {
    cardinal: 'N',
    start: 0,
    end: 11.25
}, {
    cardinal: 'NNE',
    start: 11.25,
    end: 33.75
}, {
    cardinal: 'NE',
    start: 33.75,
    end: 56.25
}, {
    cardinal: 'ENE',
    start: 56.25,
    end: 78.75
}, {
    cardinal: 'E',
    start: 78.75,
    end: 101.25
},{
    cardinal: 'ESE',
    start: 101.25,
    end: 123.75
},{
    cardinal: 'SE',
    start: 123.75,
    end: 146.25
},{
    cardinal: 'SSE',
    start: 146.25,
    end: 168.75
},{
    cardinal: 'S',
    start: 168.75,
    end: 191.25
},{
    cardinal: 'SSW',
    start: 191.25,
    end: 213.75
},{
    cardinal: 'SW',
    start: 213.75,
    end: 236.25
},{
    cardinal: 'WSW',
    start: 236.25,
    end: 258.75
},{
    cardinal: 'W',
    start: 258.75,
    end: 281.25
},{
    cardinal: 'WNW',
    start: 281.25,
    end: 303.75
},{
    cardinal: 'NW',
    start: 303.75,
    end: 326.25
},{
    cardinal: 'NNW',
    start: 326.25,
    end: 348.75
},
]
export function getWindDirection (degree: number) {
    const windDirection = intervals.find((interval) => degree >= interval.start && degree < interval.end)
    if (windDirection) return windDirection.cardinal
    return 'N/A'
}
