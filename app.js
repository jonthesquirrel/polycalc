/*
calculate regular polygon coordinates

http://math.stackexchange.com/questions/1123175

n = number of vertices = number of sides
r = radius (circumscribed circle)
a = counterclockwise rotation angle in radians

iterate for n (i = current vertex)
x = r cos(a + 2 i pi / n)
y = r sin(a + 2 i pi / n)

*/

function calcPolygon(input) {
  var output = []
  for (var i = 1; i <= input.n; i++) {
    output.push({
      x: (input.r * Math.cos(input.a + 2 * i * Math.PI / input.n)),
      y: (input.r * Math.sin(input.a + 2 * i * Math.PI / input.n))
    })
  }
  return output
}

function init() {
  console.log("loaded")
}

window.addEventListener("load", init)
