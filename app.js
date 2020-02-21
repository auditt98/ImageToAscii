const express = require('express')
const app = express()
const jimp = require('jimp')
const path = require('path')
const fs = require('fs')
let symbols = ['@', '%', '#', 'x', '+', '=', ':', '-', '.', ' ' ]
// grayscale 
let red = 0.299
let blue = 0.114
let green = 0.587
//the image is flipped when i print it, needs to figure out why that happened
//and maybe a more detailed version "@N%Q&WMgm$0BDRH#8d)bUAqhGwKpXk9V6P]Eyun[41ojae2S5YfZx(lI)F3{CtJviT7srz\Lc/?*!+<;^=",:_'.` "
//also performance.
function convertToASCII(filename){
    jimp.read(__dirname + '/test/images' + filename, (err, img) => {
        if (err) throw err;
        for(let i = 0; i <= img.getWidth(); i++){
            fs.appendFileSync(__dirname + "/test/results/result.txt",'\r\n', (err) => {throw err})
            for(let j = 0; j <= img.getHeight(); j++){
                let r = jimp.intToRGBA(img.getPixelColor(i, j)).r
                let g = jimp.intToRGBA(img.getPixelColor(i, j)).g
                let b = jimp.intToRGBA(img.getPixelColor(i, j)).b 
                let gray = r*red + b*blue + g*green
                let symIndex = Math.floor(gray / 255 * (symbols.length - 1))
                charToWrite = symbols[symIndex]
                fs.appendFileSync(__dirname + "/test/results/result.txt", charToWrite, (err) => {
                    throw err
                })
            }
        }
    })
}
convertToASCII("dog.jpg")