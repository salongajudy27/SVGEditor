
function createPdf() {
  let compress = (document.getElementById('compress').value === 'true'),
      pagewidth = parseFloat(document.getElementById('pagewidth').value),
      pageheight = parseFloat(document.getElementById('pageheight').value),
      showViewport = document.getElementById('showViewport').checked,
      x = parseFloat(document.getElementById('x').value),
      y = parseFloat(document.getElementById('y').value);
  let options = {
      useCSS: (document.getElementById('useCSS').value === 'true'),
      assumePt: (document.getElementById('assumePt').value === 'true'),
      preserveAspectRatio: document.getElementById('preserveAspectRatio').value,
      width: parseFloat(document.getElementById('width').value),
      height: parseFloat(document.getElementById('height').value)
  };
  let doc = new PDFDocument({compress: compress, size: [pagewidth || 612, pageheight || 792]}),
      textarea = document.getElementById('svg-code');
  if (showViewport) {
    doc.rect(x || 0, y || 0, options.width || doc.page.width, options.height || doc.page.height)
       .lineWidth(8).dash([8,4]).strokeColor('green').stroke();
  }
  if (options.useCSS) {
    let hiddenDiv = document.getElementById('hidden-div');
    hiddenDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + textarea.value.trim() + '</svg>';
    SVGtoPDF(doc, hiddenDiv.firstChild.firstChild, x, y, options);
  } else {
    SVGtoPDF(doc, textarea.value, x, y, options);
  }
  let stream = doc.pipe(blobStream());
  stream.on('finish', function() {
    let blob = stream.toBlob('application/pdf');
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, 'File.pdf');
    } else {
      document.getElementById('pdf-file').contentWindow.location.replace(URL.createObjectURL(blob));
    }
  });
  doc.end();
  saveParameters();
}
function saveParameters() {
  var inputs = document.querySelectorAll('textarea, input, select');
  var strings = []
  for (var i = 0; i < inputs.length; i++) {
    var value = inputs[i].type === 'checkbox' ? inputs[i].checked : inputs[i].value;
    strings.push(encodeURIComponent(inputs[i].id) + '=' + encodeURIComponent(value));
  }
  history.replaceState(null, '', '?' + strings.join('&'));
}
function restoreParameters() {
  var query = location.search.substring(1);
  var strings = query.split('&');
  for (var i = 0; i < strings.length; i++) {
    var element = document.getElementById(decodeURIComponent(strings[i].split('=')[0])),
        value = decodeURIComponent(strings[i].split('=')[1]);
    if (element) {
      if (element.type === 'checkbox') {
        element.checked = (value === 'true');
      } else {
        element.value = value;
      }
    }
  }
}
  