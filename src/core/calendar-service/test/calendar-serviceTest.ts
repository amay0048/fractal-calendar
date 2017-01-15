// https://journal.artfuldev.com/write-tests-for-typescript-projects-with-mocha-and-chai-in-typescript-86e053bdb2b6#.tx95vjvdv

import * as fs from 'fs'
import * as path from 'path'
import * as process from 'process'
import * as assert from 'assert'

import { CalendarService } from '../calendar-service'

var cwd = process.cwd()
var baseDataDir = path.join(cwd,'src','core', 'calendar-service','test','data')

function parseInput(input:string) {
    if (input == undefined) return []
    if (!input.length) return []
    return input.split('\n')
}

function getMonthsTest(file:string, testPath:string) {
    let input = fs.readFileSync(path.join(testPath,file,'in.txt'))
    let expected = fs.readFileSync(path.join(testPath,file,'out.txt')).toString()
    let [month, length] = parseInput(input.toString())
    var subject  = new CalendarService()

    it(`${file} should return an array of (3 character) months of length ${length||'12'}, staring from: ${month||'jan'}`, () => {
        let output = subject.getMonths(month, <any>length)
        assert.equal(output.join(' '), expected.toString())
    })
}

describe('getMonthsTest', () => {
    let testPath = path.join(baseDataDir, 'getMonths')
    let files = fs.readdirSync(testPath)
    // getMonthsTest('case000', testPath)
    files.forEach(file=>getMonthsTest(file, testPath))
})

function getMonthsByQuarterTest(file:string, testPath:string) {
    let input = fs.readFileSync(path.join(testPath,file,'in.txt'))
    let expected = fs.readFileSync(path.join(testPath,file,'out.txt'))
    let [quarter] = parseInput(input.toString())
    var subject  = new CalendarService()

    it(`${file} should return an array of months of length 3, for the specified quarter: ${quarter}`, () => {
        let output = subject.getMonthsByQuarter(<any>quarter)
        assert.equal(output.join(' '), expected.toString())
    })
}

describe('getMonthsByQuarterTest', ()=>{
    let testPath = path.join(baseDataDir, 'getMonthsByQuarter')
    let files = fs.readdirSync(testPath)
    files.forEach(file=>getMonthsByQuarterTest(file, testPath))
})

function getWeekTest(file:string, testPath:string) {
    let input = fs.readFileSync(path.join(testPath,file,'in.txt'))
    let expected = fs.readFileSync(path.join(testPath,file,'out.txt'))
    let [date, month, year] = parseInput(input.toString())
    var subject  = new CalendarService()
    var formats  = subject.getFormats()

    it(`${file} should return a week (starting Sunday) that contains the specified date: ${date},${month},${year}`, () => {
        let output = []
        let week = subject.getWeek(<any>date, month, <any>year)
        let chrs = week.map(day=>formats['initialOfDay'][day.getDay()]).join(' ')
        let nums = week.map(day=>day.getDate()).join(' ')
        output.push(chrs)
        output.push(nums)
        assert.equal(output.join('\n'), expected.toString())
    })
}

describe('getWeekTest', ()=>{
    let testPath = path.join(baseDataDir, 'getWeek')
    let files = fs.readdirSync(testPath)
    files.forEach(file=>getWeekTest(file, testPath))
})

function getWeeksOfMonthTest(file:string, testPath:string) {
    let input = fs.readFileSync(path.join(testPath,file,'in.txt'))
    let expected = fs.readFileSync(path.join(testPath,file,'out.txt'))
    let [month, year] = parseInput(input.toString())
    var subject  = new CalendarService()
    var formats  = subject.getFormats()

    it(`${file} should return an array of weeks of length 5, for the specified month: ${month}`, () => {
        let output = []
        let monthWeeks = subject.getWeeksOfMonth(month, <any>year)
        output = monthWeeks.map(week=>{
            let chrs = week.map(day=>formats['initialOfDay'][day.getDay()]).join(' ')
            let nums = week.map(day=>day.getDate()).join(' ')
            return `${chrs}\n${nums}`
        })

        assert.equal(output.join('\n'), expected.toString())
    })
}

describe('getWeeksOfMonthTest', ()=>{
    let testPath = path.join(baseDataDir, 'getWeeksOfMonth')
    // getWeeksOfMonthTest('case003', testPath)
    let files = fs.readdirSync(testPath)
    files.forEach(file=>getWeeksOfMonthTest(file, testPath))
})

function getWeeksOfMonthsTest(file:string, testPath:string) {
    let input = fs.readFileSync(path.join(testPath,file,'in.txt'))
    let expected = fs.readFileSync(path.join(testPath,file,'out.txt'))
    let [month, year, length] = parseInput(input.toString())
    var subject  = new CalendarService()
    var formats  = subject.getFormats()

    it(`${file} should return an array of months of length ${length}, starting from: ${month}`, () => {
        let output = []
        let months = subject.getWeeksOfMonths(month, <any>year, <any>length)
        output = months.map(month=>{
            let out = month.map(week=>{
                let chrs = week.map(day=>formats['initialOfDay'][day.getDay()]).join(' ')
                let nums = week.map(day=>day.getDate()).join(' ')
                return `${chrs}\n${nums}`
            })
            let monthInt = month[1][0].getMonth()
            out.unshift(formats['shortMonth'][monthInt])
            return out.join('\n')
        })

        assert.equal(output.join('\n'), expected.toString())
    })
}

describe('getWeeksOfMonthsTest', ()=>{
    let testPath = path.join(baseDataDir, 'getWeeksOfMonths')
    let files = fs.readdirSync(testPath)
    files.forEach(file=>getWeeksOfMonthsTest(file, testPath))
})
