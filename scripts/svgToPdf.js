
document.getElementById('downloadBtn').onclick = function() { // Bind click event on download button.
   var svg = document.querySelector('svg');
   $(svg).attr("xmlns", "http://www.w3.org/2000/svg")
    	.attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
    let {width, height} = svg.getBBox(); 
    var options= {"width": width,"height": height};
    var svgString  = new XMLSerializer().serializeToString(svg);

	let doc = new PDFDocument({compress: false}); // It's easier to find bugs with uncompressed files
	SVGtoPDF(doc, svgString, 0, 0, {useCSS:true});
	
	let stream = doc.pipe(blobStream());
  	stream.on('finish', function() {
    let blob = stream.toBlob('application/pdf');
    let blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
    });
    doc.end();
 //    var svgString  = new XMLSerializer().serializeToString(svg);
 
 // 	var canvas = document.createElement('canvas'); // Create a Canvas element.
 // 	let {width, height} = svg.getBBox(); 
 // 	 // canvas.width = width;
	//   // canvas.height = height;
	// var ctx = canvas.getContext("2d");
	//  // ctx.clearRect(0, 0, canvas.width, canvas.height);
	// var DOMURL = self.URL || self.webkitURL || self;
	// var img = new Image();
	// var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
	// var url = DOMURL.createObjectURL(svg);
	// img.onload = function() {
	//     ctx.drawImage(img, 0, 0,width,height);
	//     var png = canvas.toDataURL("image/png");
	//     // document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
	//     DOMURL.revokeObjectURL(png);
	//     console.log(png)
	//     var doc = new jsPDF('p', 'mm', 'letter');
	//     doc.addImage(png, 'PNG', 10, 10);
	//     doc.save('proUpSVG.pdf');
	// };
	// img.src = url;

}

