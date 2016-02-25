/*
calculate regular polygon coordinates

http://math.stackexchange.com/questions/1123175

iterate for n (i = current vertex)
x = r cos(a + 2 i pi / n)
y = r sin(a + 2 i pi / n)

*/

function calcPolygon(input) {
  //n: number of vertices = number of sides
  //r: radius (circumscribed circle)
  //a: counterclockwise rotation angle in radians
  //cx: center x (offset)
  //cy: center y (offset)
  //round: number of decimal places to keep (0-20)
  var output = []
  for (var i = 1; i <= input.n; i++) {
    output.push({
      x: ((input.r * Math.cos(input.a + 2 * i * Math.PI / input.n)) + input.cx).toFixed(input.round),
      y: ((input.r * Math.sin(input.a + 2 * i * Math.PI / input.n)) + input.cy).toFixed(input.round)
    })
  }
  return output
}

function getValue(selector, validator) {
  var target = document.querySelector(selector)
  if (target.value != "") {
    var num = Number(target.value)
    if (!isNaN(num) && num != Infinity) {
      if (validator) {
        if(validator(num)) {
          return num
        }
      } else {
        return num
      }
    }
  }
  //reset input box if bad input
  target.value = ""
  return Number(target.placeholder)
}

function calcInput() {
  return calcPolygon({
    n: getValue("#input-n", function(num) {
      return (num > 0)
    }),
    r: getValue("#input-r"),
    a: getValue("#input-a"),
    cx: getValue("#input-cx"),
    cy: getValue("#input-cy"),
    round: getValue("#input-round", function(num) {
      return (num >= 0 && num <= 20)
    })
  })
}

function convertText(arr) {
  // alternate display method:
  // arr = arr.map(function(val) {
  //   return [val.x, val.y]
  // })
  return JSON.stringify(arr, null, " ")
}

function calcTrigger() {
  var output = calcInput()
  document.querySelector("#output-text").innerHTML = convertText(output)
}

function storageSave(event) {
  console.log(event)
  if (event.target.classList.contains("stored")) {
    localStorage[event.target.id] = event.target.value
  }
}

function storageLoad() {
  [].forEach.call(document.querySelectorAll(".stored"), function(elm) {
    if (localStorage[elm.id] === undefined) {
      localStorage[elm.id] = ""
    }
    elm.value = localStorage[elm.id]
  })
}

window.addEventListener("load", function onLoad() {
  storageLoad()
  document.querySelector("#calc-trigger").addEventListener("click", calcTrigger)
  document.body.addEventListener("keyup", storageSave)
})

//

/*

scale the visual polygon to fit in the same space on the page,
but keep the actual coordinate values (eg. on vertex lables) the same
http://alignedleft.com/tutorials/d3/scales

adding text: http://alignedleft.com/tutorials/d3/making-a-scatterplot/
use lines

http://chimera.labs.oreilly.com/books/1230000000345/ch05.html



*/

// http://devdocs.io/d3/svg-shapes#line

// var x = d3.scale.linear().range([0, w])
// var y = d3.scale.linear().range([h, 0])
//
// var line = d3.svg.line()
//     .x(function(d) { return x(d.x); })
//     .y(function(d) { return y(d.y); })
//
// //
//
// var svg = d3.select("#visual")
//             .append("svg")
//             .attr("width", 500)
//             .attr("height", 500)
