//https://docs.google.com/document/d/1pKa9tBHldft-XgCx0I-74SG2jUhN9s_0yNpwgjc0hK0/edit

var rawData = "";
var data = [];
var page = 0;
var pageData = [];
var pageLength = 30;
$(document).ready(function(){
	$.get('./data.txt',function(data){
		//console.log(data);
	}).catch(function(err){
		rawData = err.responseText;
		parseLines(rawData.split('\n'));
	})

	$('#btn-right').on('click',function(e){
		
		if(page < data.length/pageLength){
			page++;
		}else{
			page = 0;
		}
		buildDropdown()
	})
	$('#btn-left').on('click',function(e){
		if(page > 0){
			page--;
		}else{
			page = Math.floor(data.length/pageLength);
		}
		buildDropdown()
	})
	$('#btn-double-right').on('click',function(e){
		if(page+2 <=data.length/pageLength ){
			page = page+2;
		}else{
			page = 0;
		}

		buildDropdown()
	})
	$('#btn-double-left').on('click',function(e){
		if(page-2 > 0){
			page = page-2;
		}else{
			page = Math.floor(data.length/pageLength);
		}
		buildDropdown()
	})

	$('#article-list').on('change',function(e){
		selectItem($(e.target).val());
	})
})

function selectItem(seq){
		let article = data[seq];
		//console.log(article);
		$('#article-title').text(article.title);
		$('#article-body').text(article.content);
		fillLabels('#labels-original',article.label_original,'label');
		fillLabels('#labels-recommended',article.label_recommended);
}


function fillPageData(pageCnt){
	let start = pageLength*pageCnt;
	let end = ((pageLength*pageCnt)+pageLength);
	console.log(start,end)
	pageData = [];
	for (var i = start; i <= end; i++) {
		pageData.push(data[i]);
	}
	return pageData;
}

function fillLabels(id,label,orig){
	console.log(id,label)
	$(id).html("")
	$.each(label, function(index, item){
		if(typeof orig !== 'undefined'){
			if(item.type == orig){
				var item = '<li>' + item.name + '</li>';
				$(id).append(item);
			}
		}else{
			if(item.type == orig)
			var item = '<li>' + item.name + '</li>';
			$(id).append(item);
		}
	})
}


function parseLines(_rawData){
	_.forEach(_rawData,function(item){
		let article = parseRows(item);
		data.push(article);
	})
	buildDropdown();

}

function buildDropdown(){
	console.log('page', page)
	pageData = fillPageData(page);
	var list = $("#article-list");
	list.html('');
	$.each(pageData, function(index, item) {
	  list.append(new Option(item.title, index));
	});
	selectItem(page*pageLength);
}


//var line = "__label__mobiltelefon 0.952584 __label__elektronikai@@ipar 0.782673 __label__távközlés 0.0827073 __label__értékpapírpiac 0.0737063 __label__részvény 0.0120638 __label__mikroelektronika 0.00691384 __label__telefon 0.00574025 __label__foglalkoztatás 0.00556492 __label__fotóipar 0.00491541 __label__szórakoztató@@elektronika 0.00461957 $$$ __label__geography__kanada 0.817585 __label__mobiltelefon 0.787941 __label__értékpapírpiac 0.562187 __label__részvény 0.191943 __label__elektronikai@@ipar 0.160276 __label__távközlés 0.0420977 __label__organization__blackberry 0.0302246 __label__organization__research@@in@@motion 0.0203424 __label__geography__usa 0.0149671 __label__szállodaipar 0.0113418 $$$ __label__elektronikai@@ipar __label__értékpapírpiac __label__mobiltelefon __label__részvény geography__kanada organization__research@@in@@motion genre__hír year__2011 $$$ Research in Motion $$$ 24 dollár alá – két és fél éves mélypontjára – is benézett a Research in Motion (RIM) árfolyama a múlt héten. Borzolta a befektetők idegeit, hogy a BlackBerry okostelefon gyártójának második negyedévi bevétele 15 százalékkal elmaradt az előző negyedévitől. Még drasztikusabban – 1,46-ról 0,63 dollárra – esett vissza a cég egy részvényre jutó eredménye. Pozitívum ugyanakkor, hogy a társaság szabadalmakba fektetett pénzösszegének mértéke 22 százalékkal nőtt, miközben felvásárolta a Nortel 778 millió dollárra értékelt szellemi vagyonát, amivel tovább erősítheti alkalmazásainak fejlesztését. Bár az Equilor Befektetési Zrt. szerint a RIM az androidos készülékekkel és az iPhone okostelefonjaival a közeljövőben sem tud lépést tartani, a szabadalmakba és fejlesztésekbe fektetett összegek arra késztethetik versenytársait, hogy a jelenlegi alulértékelt szinten felvásárlási ajánlatot tegyenek a RIM-részvényekre. Ez pedig a kisbefektetőknek is vonzó sztorit jelenthet.";

function parseRows(line){
	var arr = line.split('$$$');
	//.log(arr[2])
	var item = {
		label_recommended: parseLabelsRec(arr[0]),
		label_special: parseLabelsSpec(arr[1]),
		label_original: parseLabelsOrig(arr[2]),
		title: arr[3],
		content: arr[4],
	};
	return item;
}

function parseLabelsOrig(row, search){
	var arr = row.split(' ');
	var _arr = _.flatMap(arr, function(item){
		if(item.length > 0){
			let line = item.split('__');
			if(item.indexOf('__label__') > -1){
				return {type: 'label', name: line[2]};
			}else{
				return {type: line[0], name: line[1]};
			}
		}
	})
	_arr = _.without(_arr, undefined);
	if(typeof search !== 'undefined'){
		_arr = _.intersectionWith(_arr, search, function(item, item1){
			return item.name.indexOf(item1) > -1 ;
		})
	}
	return _arr;
}

function parseLabelsSpec(row, search){
	var arr = row.split(' __');
	var _arr = _.flatMap(arr, function(item){
		if(item.length > 0){
			let line = item.trim().split(' ');
			line[0] = line[0].trim().split('label__')[1];
			let name = line[0];
			let value = line[1];
			if(name.indexOf('__') > -1){
				let _name = line[0].split('__');
				name = _name[0];
				value = _name[1];
				return {name: name, value: value};
			}
		}
	})
	_arr = _.without(_arr, undefined);
	if(typeof search !== 'undefined'){
		_arr = _.intersectionWith(_arr, search, function(item, item1){
			return item.name.indexOf(item1) > -1 ;
		})
	}
	return _arr;
}

function parseLabelsRec(row){
	var arr = row.trim().split('__label__');
	var _arr = _.flatMap(arr, function(item){
		if(item.length > 0){
			let line = item.split(' ');
			let name = line[0];
			let value = parseFloat(line[1]);
			return {name: name, value: value};
		}
	})
	_arr = _.without(_arr, undefined);
	return _arr;
}

console.log('about configba állítsd át --> privacy.file_unique_origin = false')