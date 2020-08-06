var orientation =1;
var WaveEffect = false;
var ShadowPropertyNum = 1;
var $svgStyle ="";
var $fontstyle ="";
var $prevPaddingH = parseInt($("#hPadding").val());
var $prevPaddingV = parseInt($("#vPadding").val());

function changeProperty()
 {
		// Border Color
		var $borderColor = $("#borderColor").val();

		// Border Width
		var $borderWidth = $("#borderWidth").val();
		$svgStyle = 'stroke: ' + $borderColor + ";";
		$svgStyle += 'stroke-width: ' + $borderWidth + "px;";
		
		//Border Radius
		var $isRect =$("#elementID").is("rect");
		if ($isRect === true)
		{
			var $borderRadius = $("#cornerWidth").val();

			$svgStyle += 'rx: ' + $borderRadius + ";";
			$svgStyle += 'ry: ' + $borderRadius + ";";
			

			$("#lblcornerWidth").text($borderRadius);
		}
		
		$("#lblSliderValue").text($borderWidth);

		changePaddingProperty();
		changeShadowProperty();

		LoadBGColor(orientation,WaveEffect);
		
		$("#elementID").attr('style',$svgStyle);
}
function SetBG(orientationType = orientation,isWaveEffect = WaveEffect)
{
	orientation = orientationType;
	WaveEffect = Boolean(isWaveEffect);
	changeProperty();
}

function LoadBGColor(orientationType = orientation,isWaveEffect = WaveEffect)
{
	orientation = orientationType
	WaveEffect = Boolean(isWaveEffect);
	// Bg COLOR
	var $bgcolor = $("#startcolor").val();
	var $endbgcolor = $("#endcolor").val();
	$('#elementID').attr( 'filter', 'url(#filter1)' );
	if (orientationType === 1)
	{
		// Top to bottom
		// retType =  "linear-gradient(" + $bgcolor +","+ $endbgcolor +")";
		$('#elementID').attr( 'fill', 'url(#grad1)' );
		$('linearGradient').attr( 'x1', '0%' );
		$('linearGradient').attr( 'y1', '0%' );
		$('linearGradient').attr( 'x2', '0%' );
		$('linearGradient').attr( 'y2', '100%' );
		$('#stop1').attr( 'style', 'stop-color:' + $bgcolor );
		$('#stop2').attr( 'style', 'stop-color:' + $endbgcolor );
	}
	else if (orientationType === 2)
	{
		// Left to right
		$('#elementID').attr( 'fill', 'url(#grad1)' );
		$('linearGradient').attr( 'x1', '0%' );
		$('linearGradient').attr( 'y1', '0%' );
		$('linearGradient').attr( 'x2', '100%' );
		$('linearGradient').attr( 'y2', '0%' );
		$('#stop1').attr( 'style', 'stop-color:' + $bgcolor );
		$('#stop2').attr( 'style', 'stop-color:' + $endbgcolor );
	}
	else if (orientationType === 3)
	{
		// top left to bottom right
		$('#elementID').attr( 'fill', 'url(#grad1)' );
		$('linearGradient').attr( 'x1', '0%' );
		$('linearGradient').attr( 'y1', '0%' );
		$('linearGradient').attr( 'x2', '75%' );
		$('linearGradient').attr( 'y2', '100%' );
		$('#stop1').attr( 'style', 'stop-color:' + $bgcolor );
		$('#stop2').attr( 'style', 'stop-color:' + $endbgcolor );
	}
	else if (orientationType === 4)
	{
		// bottom left to top right
		$('#elementID').attr( 'fill', 'url(#grad1)' );
		$('linearGradient').attr( 'x1', '0%' );
		$('linearGradient').attr( 'y1', '50%' );
		$('linearGradient').attr( 'x2', '100%' );
		$('linearGradient').attr( 'y2', '0%' );
		$('#stop1').attr( 'style', 'stop-color:' + $bgcolor );
		$('#stop2').attr( 'style', 'stop-color:' + $endbgcolor );
	}
	else if (orientationType === 5)
	{
		// bottom left to top right
		$('#elementID').attr( 'fill', 'url(#grad2)' );
		$('#stoprad1').attr( 'style', 'stop-color:' + $bgcolor );
		$('#stoprad2').attr( 'style', 'stop-color:' + $endbgcolor );
		
	}

}

function changeActive(objActive)
{
	$("img").removeClass('imgSelect');
	$(objActive).addClass('imgSelect');
}

function changeShadowProperty()
{
	var ShadowProperty ="";
	var divShadow= $('.divShadow');
	$('#elementID').removeAttr( 'filter');
	for (var i = 0; i < divShadow.length; i++) 
	{
	  	var mainDiv = $(divShadow[i]).attr('id');
		var $hOffset = $("#"+ mainDiv + " #hOffset").val();
		var $vOffset =$("#"+ mainDiv + " #vOffset").val();  
		var $blur = $("#"+ mainDiv + " #blur").val();  
		var $shadowColor =  $("#"+ mainDiv + " #shadowColor").val(); 

		$("#"+ mainDiv + " #lblhOffset").text($hOffset);
		$("#"+ mainDiv + " #lblvOffset").text($vOffset);
		$("#"+ mainDiv + " #lblBlur").text($blur);
		
		// console.log($('#f4 > feOffset'));
		var $filter = '#filter1 > #feDropShadow'+ (i + 1) ;
		
		$.attrHooks['stddeviation'] = {
		    set: function(elem, value, name) {
		        elem.setAttributeNS(null, 'stdDeviation', value + '');
		        return value;
		    }
		};

		$($filter).attr( 'dx', $hOffset );
		$($filter).attr( 'dy', $vOffset );
		$($filter).attr( 'flood-color', $shadowColor);
		$($filter).attr( 'stdDeviation', $blur);
	
	  	// ShadowProperty += "," + $hOffset + "px " + $vOffset +"px " + $blur + "px 0px " + $shadowColor;
	}
	$('#elementID').attr( 'filter', 'url(#filter1)' );
	// ShadowProperty = ShadowProperty.substr(1);
	// console.log($('.svg'));
	// $('#elementID').attr( 'style', 'box-shadow:' + ShadowProperty );
	// $svgStyle += 'box-shadow: ' + ShadowProperty + ";";
}

function CloneDivShadow()
{
	ShadowPropertyNum ++;
	var $el = $('#divShadow1').clone().prop('id','divShadow' + ShadowPropertyNum); 
	$('.divShadowMain').append($el); 
	$('#divShadow' + ShadowPropertyNum + " #hOffset").val(1);
	$('#divShadow' + ShadowPropertyNum + " #vOffset").val(1);
	$('#divShadow' + ShadowPropertyNum + " #blur").val(2);
	$('#divShadow' + ShadowPropertyNum + " #shadowColor").val('#665e5e');

	$('#divShadow' + ShadowPropertyNum + " #lblhOffset").text(1);
	$('#divShadow' + ShadowPropertyNum + " #lblvOffset").text(1);
	$('#divShadow' + ShadowPropertyNum + " #lblBlur").text(2);
    // FILTER
    // var $elFilter = $('#feDropShadow1').clone().prop('id','feDropShadow' + ShadowPropertyNum); 
    // var $elFilter = '<feDropShadow id="feDropShadow'+ ShadowPropertyNum +'" dx="1" dy="1" flood-color="#665e5e" />';
	var $elFilter = document.createElementNS("http://www.w3.org/2000/svg", 'feDropShadow');
	$('#filter1').append($elFilter); 
	$.attrHooks['stddeviation'] = {
		    set: function(elem, value, name) {
		        elem.setAttributeNS(null, 'stdDeviation', value + '');
		        return value;
		    }
		};
	$($elFilter).attr( 'id', 'feDropShadow'+  ShadowPropertyNum );
	$($elFilter).attr( 'dx', -25 );
	$($elFilter).attr( 'dy', -25 );
	$($elFilter).attr( 'stdDeviation', 2);
	$($elFilter).attr( 'flood-color', '#665e5e');
	

   

}

function RemoveShadow(objDiv)
{
	var delDiv = $(objDiv).closest(".divShadow");
	if ($(delDiv).attr("id") !== "divShadow1" )
	{
		$(delDiv).remove();
		changeProperty();
	}
}

function SetSVGDimension(isFit)
{
	if (isFit === true)
	{
		var dim = $(".svgText");
		if (dim.length > 0)
		{
			// $(dim).attr("x","0")
			// 	  .attr("y","50%");
			// dim = document.getElementsByTagName("text")[0].getBBox();
			// $('svg').attr("width", dim.width + 10)
			//     	.attr("height", dim.height+10);
			var svg = document.getElementsByTagName("svg")[0].getBBox();
			var svgWidth = svg.width;
			var svgHeight = svg.height;
			dim = document.getElementsByTagName("text")
			var maxHeight =0;
			var maxWidth =0;	

			for(i = 0;i < dim.length; i++)
			{
				var element = dim[i];
				
				var field =element.getBBox();

				var txt = element.textContent || element.innerText;
				var $txtLength = parseInt(txt.length * 8);
				var $txtHeight = parseInt(field.height);
				var x = parseInt(field.x) + $txtLength;
				var y = parseInt(field.y) + $txtHeight;
				// console.log('x:',x);
				// console.log('y:',y);
				maxWidth = (maxWidth < x ? x : maxWidth);
				maxHeight = (maxHeight < y ? y : maxHeight);


				var eWidth = (field.x);
				var parentWidth = (svgWidth);
				var eHeight = (field.y);
				var parentHeight = (svgHeight);
				// console.log('eWidth:',eWidth);
				// console.log('parentWidth:',parentWidth);
				var x = eWidth / parentWidth * 100;
				var y = eHeight / parentHeight * 100;
				// console.log('x:',x +'%');
				// console.log('y:',y+'%');
				$(element).attr("x", x+'%')
						.attr("y", y+'%');
			}
			
			$('svg').attr("width", maxWidth + 20)
			    	.attr("height", maxHeight + 20);
			
		}
		// console.log(document.getElementsByTagName("text")[0].getBBox());

		// $(".svgText").css("width", 'auto');
		
		// $('svg').attr('height', $('.svgText').height());
		// $('svg').attr('width', $('.svgText').width());

		// $('foreignObject').attr('height', $('.svgText').height());
		// $('foreignObject').attr('width', $('.svgText').width() + 2);
		// $('foreignObject').attr('y', 0);
		// $('foreignObject').attr('x', 0);
	}
	else
	{
		$(".svgText").css("width", '400px');
		$('svg').attr('height', 250);
		$('svg').attr('width', 400);

		// $('foreignObject').attr('height', 250);
		// $('foreignObject').attr('width', 400);
		// $('foreignObject').attr('y', 50);
		// $('foreignObject').attr('x', 0);
	}
}

function changePaddingProperty()
{
	
	
	var $vPadding = parseInt($("#vPadding").val());
	var $hPadding = parseInt($("#hPadding").val());

	$('#lblvPadding').text($vPadding);
	$('#lblhPadding').text($hPadding);

	var $width =parseInt($('svg').attr("width"));
	var $height =parseInt($('svg').attr("height"));
	$('svg').attr('width',($width + ($hPadding - $prevPaddingH)));
	$('svg').attr('height',($height + ($vPadding - $prevPaddingV)));  

	$prevPaddingH = parseInt($("#hPadding").val());
	$prevPaddingV = parseInt($("#vPadding").val());
	// $('#elementID').attr('width',(400 + $hPadding)); 
	// $('#elementID').attr('height',(250 + $vPadding)); 

	// $svgStyle += 'padding-top: ' + $vPadding + "px;";
	// $svgStyle += 'padding-bottom: ' + $vPadding + "px;";
	// $svgStyle += 'padding-left: ' + $hPadding + "px;";
	// $svgStyle += 'padding-right: ' + $hPadding + "px;";
}
// FONT PROPERTIES *******************************************************************************************
function setFontStyle(){
	$fontstyle ="";
	changeFontColor();
	changeFontBold();
	changeFontItalic();
	changeFontTextDecoration();
	if (window.getSelection) {
		if (window.getSelection().focusNode.nodeName === 'text')
        window.getSelection().focusNode.setAttribute('style', $fontstyle);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}
function changeFontColor(){
	var $fontColor = $("#fontColor").val();
	$fontstyle += 'fill:'+ $fontColor +';';
	// $("#txtInput").attr('style','fill:'+ $fontColor);
	// $(".svgText").css('color', $fontColor);
	
	// document.execCommand('styleWithCSS', true, true);
	// document.execCommand("ForeColor", false, $fontColor);
}
function changeFontBold(){
	var $isBold = $("#txtBold").prop("checked");
	// $(".svgText").css('font-weight', ($isBold === true ? 'bold' : 'normal' ));
	$fontstyle += 'font-weight:' + ($isBold === true ? 'bold' : 'normal' ) +';';

	// document.execCommand('styleWithCSS', false, true);
	// document.execCommand("bold", $isBold, null);
}
function changeFontItalic(){
	var $isItalic = $("#txtItalic").prop("checked");
	// $(".svgText").css('font-style', ($isItalic === true ? 'italic' : 'normal' ));
	$fontstyle += 'font-style:' + ($isItalic === true ? 'italic' : 'normal' ) +';';

	// document.execCommand('styleWithCSS', false, true);
	// document.execCommand("italic", $isItalic, null);
}
function changeFontTextDecoration(){
	var $isUnderline = $("#txtUnderline").prop("checked");
	var $isStrikethrough = $("#txtStrikethrough").prop("checked");
	// $(".svgText").css('text-decoration', ($isUnderline === true ? 'underline' : '' ) + ($isStrikethrough === true ? ' line-through' : '' ));
	$fontstyle += 'text-decoration:' + ($isUnderline === true ? 'underline' : '' ) + ($isStrikethrough === true ? ' line-through' : '' ) +';';

	// document.execCommand('styleWithCSS', false, true);
	// document.execCommand("underline", $isUnderline, null);
}
// FONT PROPERTIES *******************************************************************************************
// LAYOUT PROPERTIES *******************************************************************************************
function changeShape()
{
	var $shape = $("#shape").val();
	var $fill = $("#elementID").attr("fill");
	var SVG = $("svg");
	SVG.find("circle").remove();
	SVG.find("rect").remove();
	SVG.find("ellipse").remove();
	SVG.find("text").remove();
	var $svg = document.getElementsByTagName('svg')[0]; //Get svg element
	var newElement = document.createElementNS("http://www.w3.org/2000/svg", $shape); //Create a path in SVG's namespace
		
		if($shape === 'circle')
		{
			$('.cornerRadius').css('display','none');
			newElement.setAttribute("cx","50%"); 
			newElement.setAttribute("cy","50%"); 
			newElement.setAttribute("r","37%"); 
		}
		else if ($shape === 'ellipse')
		{
			$('.cornerRadius').css('display','none');
			newElement.setAttribute("cx","50%"); 
			newElement.setAttribute("cy","50%"); 
			newElement.setAttribute("rx","190"); 
			newElement.setAttribute("ry","95"); 
		}
		else
		{
			$('.cornerRadius').css('display','block');
			newElement.setAttribute("x","0"); 
			newElement.setAttribute("y","0"); 
			newElement.setAttribute("width","400"); 
			newElement.setAttribute("height","250"); 
		}
		
		newElement.setAttribute("id","elementID"); 
		newElement.setAttribute("class","svgClass"); 
		newElement.setAttribute("fill",$fill); 

		$svg.appendChild(newElement);

}
function addtxtField($aTag = null,$linktext=null)
{
	var $svg = document.getElementsByTagName('g')[0]; //Get svg element
	var xmlns = "http://www.w3.org/2000/svg";
	// $group = document.createElementNS(xmlns, 'g');
 //  	$svg.appendChild($group);

	var newElement = document.createElementNS(xmlns, 'text'); //Create a path in SVG's namespace
	var txtCount= $('text').length + 1;
	newElement.setAttribute("x","10%"); 
	newElement.setAttribute("y","40%"); 
	newElement.setAttribute("id","txtInput" + txtCount); 
	
	newElement.setAttribute("class","svgText"); 
	var txtVal = document.createTextNode(($aTag !== null ? $linktext : "text"));
  	newElement.appendChild(txtVal);

  	$svg.appendChild(newElement);
  	if ($aTag !== null)
  	{
  		var $txtID ='#'+'txtInput' + txtCount;
  		$($txtID).wrap($aTag);
  		registerDblClick();
  	}
	registercb();

}
var registerDblClick = function(){
	var clicked=false;
	var maxClicksDelay = 500;
	$("a > text").click(function (e) {
            if(!clicked) 
            {
			    clicked = true;
			    setTimeout(function() { clicked = false}, maxClicksDelay );  
			    e.preventDefault();
		    }
        });
}
//HTYPERLINK
function addHyperlink(){
	var $link = document.getElementById('link').value;
	var $linkText = document.getElementById('linkText').value;
	var $linkTarget = document.getElementById('linktarget').value;
	var $aTag = document.createElementNS("http://www.w3.org/2000/svg","a"); 
	$aTag.setAttributeNS( "http://www.w3.org/1999/xlink", "href",$link);
	$aTag.setAttribute("target",$linkTarget); 

	addtxtField($aTag,$linkText);

}
  
// LAYOUT PROPERTIES *******************************************************************************************

  var registercb = function () {
       var selectedElement= null;
       $("text").click(function (e) {
        // $("#cvs g > text").click(function (e) {
        	selectedElement = null; 
        	// console.log("click");
            currentX = e.clientX;
            currentY = e.clientY;
            selectedElement = e.target;

            var element =  $(e.currentTarget).attr('id');
        	node = document.getElementById(element);
		    if (document.body.createTextRange) {
		        const range = document.body.createTextRange();
		        range.moveToElementText(node);
		        range.select();
		    } else if (window.getSelection) {
		  
		        const selection = window.getSelection();
		        const range = document.createRange();
		        range.selectNodeContents(node);
		        selection.removeAllRanges();
		        selection.addRange(range);
		    } else {
		        console.warn("Could not select text in node: Unsupported browser.");
		    }
          
        }).mousemove(function (e) {        
            if (selectedElement) {
            	// console.log("mousemove");
                var dx = parseInt(selectedElement.getAttribute("x")) + e.clientX - currentX;
                var dy = parseInt(selectedElement.getAttribute("y")) + e.clientY - currentY;
                currentX = e.clientX;
                currentY = e.clientY;
                var $width =parseInt($('svg').attr("width"));
				var $height =parseInt($('svg').attr("height"));
				var $vPadding = parseInt($("#vPadding").val());
				var $hPadding = parseInt($("#hPadding").val());
				var txt = selectedElement.textContent || selectedElement.innerText;
			
				var $txtLength = parseInt(txt.length * 8);
				var $txtHeight = parseInt($(selectedElement).height());
                if ((dx > $hPadding && (dx + ($txtLength + $hPadding)) < ($width - $hPadding)) && (dy > 25 && dy < $height - ($txtHeight + $vPadding)))
                {
                	selectedElement.setAttribute("x", dx);
                	selectedElement.setAttribute("y", dy);
                }
            }
        }).dblclick(function (e) {
        	// console.log("dblclick");
            selectedElement = null;  
        })
      //   .click(function (e){
      //   	var element =  $(e.currentTarget).attr('id');
      //   	node = document.getElementById(element);
		    // if (document.body.createTextRange) {
		    //     const range = document.body.createTextRange();
		    //     range.moveToElementText(node);
		    //     range.select();
		    // } else if (window.getSelection) {
		  
		    //     const selection = window.getSelection();
		    //     const range = document.createRange();
		    //     range.selectNodeContents(node);
		    //     selection.removeAllRanges();
		    //     selection.addRange(range);
		    // } else {
		    //     console.warn("Could not select text in node: Unsupported browser.");
		    // }
      //   });
   //      $(window).on('keyup', function (evt){ 
			
			// $(evt.target).find('text').each(function() {
				
			// 	if(this.innerHTML === '<br>')
			// 	{
			// 		this.remove();
			// 	}	
			      
			// });
   //      })

    };

      