#!/usr/bin/env node
const express = require('express')
const app = express()
const jimp = require('jimp')
const path = require('path')
const fs = require('fs')
const cliProgress = require('cli-progress')
const colors = require('colors')
let symbols = ['@', '%', '#', 'x', '+', '=', ':', '-', '.', ' ' ]
// grayscale 
let red = 0.299
let blue = 0.114
let green = 0.587

//config progress bar
const bar = new cliProgress.SingleBar({
    format: 'Progress |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Duration: {duration} s',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    stopOnComplete: true
});
function start(){
    const [,, ...args] = process.argv 
    for(let i = 0; i < args.length; i++){
        convertToASCII(args[i])
    }
}

//maybe a more detailed version "@N%Q&WMgm$0BDRH#8d)bUAqhGwKpXk9V6P]Eyun[41ojae2S5YfZx(lI)F3{CtJviT7srz\Lc/?*!+<;^=",:_'.` "

function convertToASCII(filename){
    jimp.read(__dirname + '/test/images/' + filename, (err, img) => {
        if (err) throw err
        h = img.getHeight()
        w = img.getWidth()
        console.log("\r\n\r\nProcessing file: " + filename)
        console.log("Image size: " + h + " x " + w)
        //start the progress bar from 0 -> number of pixels in the image
        bar.start(w*h, 0)
        let str = ""
        // let stream = fs.createWriteStream(__dirname + "/test/results/" + filename + ".txt", {flags: "a"})
        for(let i = 0; i <= img.getWidth(); i++){
            for(let j = 0; j <= img.getHeight(); j++){
                let r = jimp.intToRGBA(img.getPixelColor(i, j)).r
                let g = jimp.intToRGBA(img.getPixelColor(i, j)).g
                let b = jimp.intToRGBA(img.getPixelColor(i, j)).b 
                let gray = r*red + b*blue + g*green
                let symIndex = Math.floor(gray / 255 * (symbols.length - 1))
                charToWrite = symbols[symIndex]
                str += charToWrite
            }
            fs.appendFileSync(__dirname + "/test/results/" + filename + ".txt", str + '\r\n', (err) => {
                throw err
            })
            str = ""
            bar.increment(h)
        } 
    })
}

start()
