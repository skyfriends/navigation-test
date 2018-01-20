var searchFormText = '<div id="searchDiv"><form method="get" class="zoom_searchform" id="zoom_searchform" onsubmit="return makeSearch()" ><input type="text" name="zoom_query" size="18" value="" class="zoom_searchbox" id="zoom_searchbox"><input type="submit" value="Search" class="zoom_button"><br><br></span><span class="zoom_match">Match:&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="zoom_and" value="0" checked="checked" id="zoom_and_off">&nbsp;&nbsp;any words&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="zoom_and" value="1" id="zoom_and_on">&nbsp;&nbsp;all words<br><br></span></form><div class="searchheading" id="searchheading"></div><div class="searchsummary"></div><div class="result_pagescount"></div><div class="searchresults"></div><div class="result_pages"></div></div>';

// The options available in the dropdown menu for number of results
// per page
var PerPageOptions = new Array(10, 20, 50, 100);

// Globals
var SkippedWords = 0;
var searchWords = new Array();
var RegExpSearchWords = new Array();
var SkippedOutputStr = "";
var CatCounter = new Array();
var CatCounterFilled = 0;

var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

// Index format
var PAGEDATA_URL = 0;
var PAGEDATA_TITLE = 1;
var PAGEDATA_DESC = 2;
var PAGEDATA_IMG = 3;
var PAGEINFO_DATETIME = 0;
var PAGEINFO_FILESIZE = 1;
var PAGEINFO_BOOST = 2;
var PAGEINFO_FILETYPE = 3;
var PAGEINFO_CAT = 4;
var PAGEINFO_METAFIRST = 5;

var METAFIELD_TYPE = 0;
var METAFIELD_NAME = 1;
var METAFIELD_SHOW = 2;
var METAFIELD_FORM = 3;
var METAFIELD_METHOD = 4;
var METAFIELD_DROPDOWN = 5;

var METAFIELD_TYPE_NUMERIC = 0;
var METAFIELD_TYPE_TEXT = 1;
var METAFIELD_TYPE_DROPDOWN = 2;
var METAFIELD_TYPE_MULTI = 3;
var METAFIELD_TYPE_MONEY = 4;

var METAFIELD_METHOD_EXACT = 0;
var METAFIELD_METHOD_LESSTHAN = 1;
var METAFIELD_METHOD_LESSTHANORE = 2;
var METAFIELD_METHOD_GREATERTHAN = 3;
var METAFIELD_METHOD_GREATERTHANORE = 4;
var METAFIELD_METHOD_SUBSTRING = 5;



// ----------------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------------


// This function will return the value of a GET parameter
function getParam(paramName)
{
	paramStr = document.location.search;
	if (paramStr == "")
		return "";

	// remove '?' in front of paramStr
	if (paramStr.charAt(0) == "?")
		paramStr = paramStr.substr(1);

	arg = (paramStr.split("&"));
	for (i=0; i < arg.length; i++) {
		arg_values = arg[i].split("=")
		if (unescape(arg_values[0]) == paramName)
		{
			if (paramName == "zoom_query")
				arg_values[1] = arg_values[1].replace(/[\+]/g, " ");  // replace the '+' with spaces

			if (UseUTF8 == 1 && self.decodeURIComponent) // check if decodeURIComponent() is defined
				ret = decodeURIComponent(arg_values[1]);
			else
				ret = unescape(arg_values[1]);  // IE 5.0 and older does not have decodeURI
			return ret;
		}
	}
	return "";
}

// Compares the two values, used for sorting output results
// Results that match all search terms are put first, highest score
function SortCompare (a, b)
{
	if (a[2] < b[2]) return 1;
	else if (a[2] > b[2]) return -1;
	else if (a[1] < b[1]) return 1;
	else if (a[1] > b[1]) return -1;
	else return 0;
}

function sw_compare(a, b)
{
	if (a.charAt(0) == '-')
		return 1;

	if (b.charAt(0) == '-')
		return -1;

	return 0;
}

function pattern2regexp(pattern)
{
	pattern = pattern.replace(/\#/g, "\\#");
	pattern = pattern.replace(/\$/g, "\\$");
	pattern = pattern.replace(/\./g, "\\.");
	pattern = pattern.replace(/\*/g, "[\\d\\S]*");
	pattern = pattern.replace(/\?/g, ".?");
	return pattern;
}

function PrintHighlightDescription(line)
{
	if (Highlighting == 0)
	{
		return line;
		return;
	}

	res = " " + line + " ";
	for (i = 0; i < NumSearchWords; i++) {
		if (RegExpSearchWords[i] == "")
			continue;

		if (SearchAsSubstring == 1)
			res = res.replace(new RegExp("("+RegExpSearchWords[i]+")", "gi"), "[;:]$1[:;]");
		else
			res = res.replace(new RegExp("(\\W|^|\\b)("+RegExpSearchWords[i]+")(\\W|$|\\b)", "gi"), "$1[;:]$2[:;]$3");
	}
	// replace the marker text with the html text
	// this is to avoid finding previous <span>'ed text.
	res = res.replace(/\[;:\]/g, "<span class=\"highlight\">");
	res = res.replace(/\[:;\]/g, "</span>");
	return res;
}

function PrintNumResults(num)
{
	if (num == 0)
		return STR_NO_RESULTS;
	else if (num == 1)
		return num + " " + STR_RESULT;
	else
		return num + " " + STR_RESULTS;
}


function AddParamToURL(url, paramStr)
{
	// add GET parameters to URL depending on
	// whether there are any existing parameters
	if (url.indexOf("?") > -1)
		return url + "&amp;" + paramStr;
	else
		return url + "?" + paramStr;
}


function SkipSearchWord(sw) {
	if (searchWords[sw] != "") {
		if (SkippedWords > 0)
			SkippedOutputStr += ", ";
		SkippedOutputStr += "\"<b>" + searchWords[sw] + "</b>\"";
		searchWords[sw] = "";
		SkippedWords++;
	}
}

function wordcasecmp(word1, word2) {
	if (word1 == word2)
		return 0;
	else
		return -1;
}

function htmlspecialchars(query) {
	query = query.replace(/\&/g, "&#38;");
	query = query.replace(/\</g, "&#60;");
	query = query.replace(/\>/g, "&#62;");
	query = query.replace(/\"/g, "&#34;");
	query = query.replace(/\'/g, "&#39;");
	return query;
}

function QueryEntities(query) {
	query = query.replace(/\&/g, "&#38;");
	query = query.replace(/\</g, "&#60;");
	query = query.replace(/\>/g, "&#62;");
	query = query.replace(/\'/g, "&#39;");
	return query;
}

function FixQueryForAsianWords(query) {
	currCharType = 0;
	lastCharType = 0;   // 0 is normal, 1 is hiragana, 2 is katakana, 3 is "han"

	// check for hiragana/katakana splitting required
	newquery = "";
	for (i = 0; i < query.length; i++)
	{
		ch = query.charAt(i);
		chVal = query.charCodeAt(i);

		if (chVal >= 12352 && chVal <= 12447)
			currCharType = 1;
		else if (chVal >= 12448 && chVal <= 12543)
			currCharType = 2;
		else if (chVal >= 13312 && chVal <= 44031)
			currCharType = 3;
		else
			currCharType = 0;

		if (lastCharType != currCharType && ch != " ")
			newquery += " ";
		lastCharType = currCharType;
		newquery += ch;
	}
	return newquery;
}

function GetMetaValues(pagenum, fieldnum)
{
	return pageinfo[pagenum][PAGEINFO_METAFIRST+fieldnum];
}

// ----------------------------------------------------------------------------
// Parameters initialisation (globals)
// ----------------------------------------------------------------------------

var query = getParam("zoom_query");
query = query.replace(/[\"]/g, " ");
var IsZoomQuery = 0;
if (query.length == 0)
{
	if (document.location.search.indexOf("zoom_query") != -1)
		IsZoomQuery = 1;
}

console.log("query1: "+query);

var per_page = 1000 //parseInt(getParam("zoom_per_page"));
var page = 1;

var andq = parseInt(getParam("zoom_and"));
if (isNaN(andq))
{
	if (typeof(DefaultToAnd) != "undefined" && DefaultToAnd == 1)
		andq = 1;
	else
		andq = 0;
}

//var sort = DefaultSort;

var SelfURL = "";
var LinkBackJoinChar = "?";
if (typeof(LinkBackURL) == "undefined")
{
	SelfURL = document.location.href;
	// strip off parameters and anchors
	var paramIndex;
	paramIndex = SelfURL.indexOf("?");
	if (paramIndex > -1)
		SelfURL = SelfURL.substr(0, paramIndex);
	paramIndex = SelfURL.indexOf("#");
	if (paramIndex > -1)
		SelfURL = SelfURL.substr(0, paramIndex);
}
else
{
	SelfURL = LinkBackURL;	
}

if (SelfURL.indexOf("?") != -1)
	LinkBackJoinChar = "&amp;";

// encode invalid URL characters
SelfURL = SelfURL.replace(/\</g, "&lt;");
SelfURL = SelfURL.replace(/\"/g, "%22");

var data = new Array();
var output = new Array();

var zoom_target = "";
if (UseLinkTarget == 1)
	zoom_target = " target=\"" + LinkTarget + "\" ";

var queryForHTML, queryForURL, queryForSearch;
var metaParams;
var UseWildCards;
var dateRangeParams = "";

var matches = 0;

// ----------------------------------------------------------------------------
// Main search function starts here
// ----------------------------------------------------------------------------

var InitSearchCalled = false;
var IsWarningGiven = false;
var IsNoKeywordQuery = false;
var IsNoSearch = false;
function ZoomInitSearch()
{
	// this prevents warnings given for calling this function when no results
	IsWarningGiven = true;

	if (Timing == 1)
		timeStart = new Date();

	InitSearchCalled = true;

	// Give up early if no search words provided
	IsNoKeywordQuery = false;
	if (query.length == 0)
	{
		if (UseMetaFields == 1)
		{
			if (IsZoomQuery == 1)
				IsNoKeywordQuery = true;
			else
				IsNoSearch = true;
		}
		else
			IsNoSearch = true;

		if (IsNoSearch)
			return;
	}

	if (MapAccents == 1)
	{
		for (i = 0; i < NormalChars.length; i++)
			query = query.replace(new RegExp(AccentChars[i], "g"), NormalChars[i]);
	}

	// Special query processing required when SearchAsSubstring is enabled
	if (SearchAsSubstring == 1 && UseUTF8 == 1)
		query = FixQueryForAsianWords(query);

	// prepare search query, strip quotes, trim whitespace
	if (WordJoinChars.indexOf(".") == -1)
		query = query.replace(/[\.]/g, " ");

	if (WordJoinChars.indexOf("-") == -1)
		query = query.replace(/(\S)\-/g, "$1 ");

	if (WordJoinChars.indexOf("#") == -1)
		query = query.replace(/\#(\S)/g, " $1");

	if (WordJoinChars.indexOf("+") == -1)
	{
		query = query.replace(/[\+]+([^\+\s])/g, " $1");
		query = query.replace(/([^\+\s])\+\s/g, "$1 ");
	}

	if (WordJoinChars.indexOf("_") == -1)
		query = query.replace(/[\_]/g, " ");

	if (WordJoinChars.indexOf("'") == -1)
		query = query.replace(/[\']/g, " ");

	if (WordJoinChars.indexOf("$") == -1)
		query = query.replace(/[\$]/g, " ");

	if (WordJoinChars.indexOf("&") == -1)
		query = query.replace(/[\&]/g, " ");

	if (WordJoinChars.indexOf(":") == -1)
	{		
		// We temporarily replace the search syntax for "site:" and "url:"
		// to avoid stripping it out when colon is disabled for word join
		query = query.replace(/site\:/g, "[#@!]");
		query = query.replace(/url\:/g, "[#@!]");
		query = query.replace(/[\:]/g, " ");
	
		// We then restore it
		query = query.replace(/\[\#\@\!\]/g, "site:");
		query = query.replace(/\[\#\@\!\]/g, "url:");		
	}

	if (WordJoinChars.indexOf(",") == -1)
		query = query.replace(/[\,]/g, " ");

	if (WordJoinChars.indexOf("/") == -1)
		query = query.replace(/[\/]/g, " ");

	if (WordJoinChars.indexOf("\\") == -1)
		query = query.replace(/[\\]/g, " ");
	
	if (WordJoinChars.indexOf("@") == -1)
		query = query.replace(/[@]/g, " ");		

	// substitute multiple whitespace chars to single character
	// also strip any of the wordjoinchars if followed immediately by a space
	query = query.replace(/[\s\(\)\^\[\]\|\{\}\%\!]+|[\-._',:&\/\\\\](\s|$)/g, " ");

	// trim trailing/leading whitespace
	query = query.replace(/^\s*|\s*$/g,"");

	queryForHTML = htmlspecialchars(query);
	if (ToLowerSearchWords == 1)
		queryForSearch = query.toLowerCase();
	else
		queryForSearch = query;
	queryForSearch = htmlspecialchars(queryForSearch);

	// split search phrase into words
	searchWords = queryForSearch.split(" "); // split by spaces.

	// Sort search words if there are negative signs
	if (queryForSearch.indexOf("-") != -1)
		searchWords.sort(sw_compare);

	NumSearchWords = searchWords.length;
	
	if (searchWords[0].length == 0)
		NumSearchWords = 0;		
		
	kw_ptr = 0;
	outputline = 0;
	ipage = 0;
	matches = 0;
	pagesCount = NumPages;

	exclude_count = 0;
	ExcludeTerm = 0;

	// Initialise a result table the size of all pages
	res_table = new Array(pagesCount);
	for (i = 0; i < pagesCount; i++)
	{
		res_table[i] = new Array(4);
		res_table[i][0] = 0;
		res_table[i][1] = 0;
		res_table[i][2] = 0;
		res_table[i][3] = 0;
	}

	UseWildCards = new Array(NumSearchWords);

	for (sw = 0; sw < NumSearchWords; sw++) {

		UseWildCards[sw] = 0;

		if (typeof(window['skipwords']) != "undefined" ) {
			// check min length
			if (searchWords[sw].length < MinWordLen) {
				SkipSearchWord(sw);
				continue;
			}
			// check skip word list
			for (i = 0; i < skipwords.length; i++) {
				if (searchWords[sw] == skipwords[i])
				{
					SkipSearchWord(sw);
					break;
				}
			}
		}
		
		if (searchWords[sw].indexOf("*") == -1 && searchWords[sw].indexOf("?") == -1) {
			UseWildCards[sw] = 0;
		} else {
			UseWildCards[sw] = 1;
			RegExpSearchWords[sw] = pattern2regexp(searchWords[sw]);
		}

		if (Highlighting == 1 && UseWildCards[sw] == 0)
			RegExpSearchWords[sw] = searchWords[sw];
	}
	
	// Join splitted up arrays if necessary
	if (DictArrayCount > 0)
	{
		for (dci = 0; dci < DictArrayCount; dci++)
			eval("dictwords = dictwords.concat(dictwords"+dci+");");
	}
	if (PageInfoArrayCount > 0)
	{
		for (dci = 0; dci < PageInfoArrayCount; dci++)
			eval("pageinfo = pageinfo.concat(pageinfo"+dci+");");
	}
	if (PageDataArrayCount > 0)
	{
		for (dci = 0; dci < PageDataArrayCount; dci++)
			eval("pagedata = pagedata.concat(pagedata"+dci+");");
	}

	// Join splitted up arrays if necessary
	if (DictArrayCount > 0)
	{
		for (dci = 0; dci < DictArrayCount; dci++)
			dictwords = dictwords.concat(window["dictwords"+dci]);
	}
	if (PageInfoArrayCount > 0)
	{
		for (dci = 0; dci < PageInfoArrayCount; dci++)
			pageinfo = pageinfo.concat(window["pageinfo"+dci]);
	}
	if (PageDataArrayCount > 0)
	{
		for (dci = 0; dci < PageDataArrayCount; dci++)
			pagedata = pagedata.concat(window["pagedata"+dci]);
	}
	
	searchUrlBuffer = "";

	// Begin searching...
	for (sw = 0; sw < NumSearchWords; sw++) {

		if (searchWords[sw] == "") {
			continue;
		}

		if (searchWords[sw].charAt(0) == '-')
		{
			searchWords[sw] = searchWords[sw].substr(1);
			ExcludeTerm = 1;
			exclude_count++;
		}
		
		colonPos = 0;
		if ((colonPos = searchWords[sw].indexOf(":")) > -1)
		{
			if (searchWords[sw].toLowerCase().indexOf("site:") != -1 || searchWords[sw].toLowerCase().indexOf("url:") != -1)
			{
				searchUrlBuffer = searchWords[sw].substring(colonPos+1);
				exclude_count++;
				if (NumSearchWords == 1)
				{
					IsNoKeywordQuery = true;
					continue;
				}
			}			
		}
		
		if (UseWildCards[sw] == 1) {
			if (SearchAsSubstring == 0)
				pattern = "^" + RegExpSearchWords[sw] + "$";
			else
				pattern = RegExpSearchWords[sw];
			re = new RegExp(pattern, "g");
		}

		for (kw_ptr = 0; kw_ptr < dictwords.length; kw_ptr++) {

			data = dictwords[kw_ptr].split(" ");

			if (UseWildCards[sw] == 0) {
				if (SearchAsSubstring == 0)
					match_result = wordcasecmp(data[0], searchWords[sw]);
				else
					match_result = data[0].indexOf(searchWords[sw]);
			} else
				match_result = data[0].search(re);


			if (match_result != -1) {
				// keyword found, include it in the output list
				for (kw = 1; kw < data.length; kw += 3) {
					// check if page is already in output list
					pageexists = 0;
					ipage = data[kw];
					score = parseInt(data[kw+1]);
					prox = parseInt(data[kw+2]);

					if (pageinfo[ipage][PAGEINFO_BOOST] != 0)
					{
						score *= (pageinfo[ipage][PAGEINFO_BOOST] / 10);
						score = Math.floor(score + 0.5);
					}

					if (ExcludeTerm == 1)
					{
						// we clear out the score entry so that it'll be excluded in the filter stage
						res_table[ipage][0] = 0;
					}
					else if (res_table[ipage][0] == 0)
					{
						matches++;
						res_table[ipage][0] = score;
						res_table[ipage][3] = prox;
					}
					else
					{
						if (res_table[ipage][0] > 10000) {
							// take it easy if its too big to prevent gigantic scores
							res_table[ipage][0] += 1;
						} else {
							res_table[ipage][0] += score; // add in score
							//res_table[ipage][0] *= 2;           // double score as we have two words matching
						}
						res_table[ipage][3] &= prox;
					}
					res_table[ipage][1] += 1;
					// store the 'and' user search terms matched' value
					if (res_table[ipage][2] == sw || res_table[ipage][2] == sw-SkippedWords-exclude_count)
						res_table[ipage][2] += 1;

				}
				if (UseWildCards[sw] == 0 && SearchAsSubstring == 0)
					break;    // this search word was found, so skip to next
			}
		}
	}

	// Count number of output lines that match ALL search terms
	oline = 0;
	fullmatches = 0;
	output = new Array();


	var IsAnyDropdown = false;
	var full_numwords = NumSearchWords - SkippedWords - exclude_count;
	for (i = 0; i < pageinfo.length; i++)
	{
		IsFiltered = false;
		if (res_table[i][0] > 0 || IsNoKeywordQuery)
		{
			if (IsFiltered == false && searchUrlBuffer != "")
			{
				pgurl = pagedata[i][PAGEDATA_URL];
				if (pgurl.toLowerCase().indexOf(searchUrlBuffer) == -1)
					IsFiltered = true;
				else
				{
					// the site/URL matched with the site: parameter
					if (IsNoKeywordQuery)
					{
						// increment score/terms if we're allowing this through on site: match alone
						res_table[i][0]++;
						res_table[i][1]++;						
					}
				}					
			}			
			

			if (IsFiltered == false) {
				if (res_table[i][2] < full_numwords && andq == 1)
					IsFiltered = true;
			}
			
			
						
			if (IsFiltered == false && DateRangeSearch == 1 && UseDateRange == true)
			{
				if (pageinfo[i][PAGEINFO_DATETIME] < from_datetime)
					IsFiltered = true;
				else if (pageinfo[i][PAGEINFO_DATETIME] > to_datetime)
					IsFiltered = true;				
			}
			
			if (IsFiltered == false) {
				
				if (res_table[i][2] >= full_numwords)
					fullmatches++;
					
				// copy if not filtered out
				output[oline] = new Array(3);
				output[oline][0] = i;

				// determine final score
				baseScale = 1.3;
				finalScale = ((res_table[i][3] / 255) * 1.7) + baseScale;
				if (res_table[i][1] > 1)
				{
					if (res_table[i][1] <= 10)
						finalScale = Math.pow(finalScale, res_table[i][1]-1);
					else
					{
						finalScale = Math.pow(finalScale, 10);
						finalScale += res_table[i][1] - 10;
					}
				}

				

				output[oline][1] = Math.floor(res_table[i][0] * finalScale + 0.5);
				output[oline][2] = res_table[i][1];
				oline++;
			}
		}
	}
	matches = oline;

	// Sort results in order of score, use "SortCompare" function
	if (matches > 1)
	{
		output.sort(SortCompare);   // sort by relevance
	}

	// prepare queryForURL
	if (UseUTF8 == 1 && self.encodeURIComponent)
	{
		queryForURL = encodeURIComponent(query);		
		queryForURL = queryForURL.replace(/%20/g, "+");
	}
	else
	{	
		queryForURL = query.replace(/\s/g, "+");	
		queryForURL = escape(queryForURL);
	}

	metaParams = "";


	// number of pages of results
	num_pages = Math.ceil(matches / per_page);
}

function ZoomShowHeading()
{
	console.log(InitSearchCalled);
	if (InitSearchCalled == false)
	{
		if (IsWarningGiven == false)
			$(".searchresults").html('This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.');
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch)
		return;

	$("#searchheading").html(STR_RESULTS_FOR + " " + queryForHTML);
	
}

function ZoomShowResults()
{
	if (InitSearchCalled == false)
	{
		if (IsWarningGiven == false)
			$(".searchresults").html('This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.');
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch)
	{
		return;
	}

	var resultstext = "";
	// determine current line of result from the output array
	if (page == 1) {
		arrayline = 0;
	} else {
		arrayline = ((page - 1) * per_page);
	}

	// the last result to show on this page
	result_limit = arrayline + per_page;

	// display the results
	while (arrayline < matches && arrayline < result_limit) {
		ipage = output[arrayline][0];
		score = output[arrayline][1];

		pgurl = pagedata[ipage][PAGEDATA_URL];
		pgtitle = pagedata[ipage][PAGEDATA_TITLE];
		pgdesc = pagedata[ipage][PAGEDATA_DESC];
		pgimage = pagedata[ipage][PAGEDATA_IMG];

		urlLink = pgurl;
		if (GotoHighlight == 1)
		{
			if (SearchAsSubstring == 1)
				urlLink = AddParamToURL(urlLink, "zoom_highlightsub=" + queryForURL);
			else
				urlLink = AddParamToURL(urlLink, "zoom_highlight=" + queryForURL);
		}

		if (arrayline % 2 == 0)
			resultstext += "<div class=\"result_block\">";
		else
			resultstext += "<div class=\"result_altblock\">";

		if (PluginOpenNewWindow == 1 && pageinfo[ipage][PAGEINFO_FILETYPE] >= FileTypePluginStart)
			target = " target=\"_blank\"";
		else
			target = zoom_target;

		resultstext += "<div class=\"result_title\">";
		if (DisplayNumber == 1)
			resultstext += "<b>" + (arrayline+1) + ".</b>&nbsp;";

		if (DisplayTitle == 1)
		{
			resultstext += "<a href=\"" + urlLink + "?zoom_query="+query+"&zoom_and="+andq+"&zoom_sort=0" + "\"" + target + ">";
			resultstext += PrintHighlightDescription(pgtitle);
			resultstext += "</a>";
		}
		else
			resultstext += "<a href=\"" + urlLink + "\"" + target + ">" + pgurl + "</a>";


		resultstext += "</div>";

		

		if (DisplayMetaDesc == 1)
		{
			// print meta description
			resultstext += "<div class=\"description\">";
			resultstext += PrintHighlightDescription(pgdesc);
			resultstext += "</div>\n";
		}/**/

		info_str = "";
		
		if (DisplayTerms == 1)
			info_str += STR_RESULT_TERMS_MATCHED + " " + output[arrayline][2];

		/*if (DisplayScore == 1) {
			if (info_str.length > 0)
				info_str += "&nbsp; - &nbsp;";
			info_str += STR_RESULT_SCORE + " " + score;
		}

		if (DisplayDate == 1)
		{
			pgdate = pageinfo[ipage][PAGEINFO_DATETIME];
			if (pgdate > 0)
			{
				datetime = new Date(pgdate*1000);
				if (info_str.length > 0)
					info_str += "&nbsp; - &nbsp;";
				info_str += datetime.getDate() + " " + months[datetime.getMonth()] + " " + datetime.getFullYear();
			}
		}

		if (DisplayFilesize == 1)
		{
			filesize = pageinfo[ipage][PAGEINFO_FILESIZE];
			filesize = Math.ceil(filesize / 1024);
			if (filesize < 1)
				filesize = 1;

			if (info_str.length > 0)
				info_str += "&nbsp; - &nbsp;";
			info_str += filesize + "k";
		}*/

		if (DisplayURL == 1) {
			if (info_str.length > 0)
				info_str += "&nbsp; - &nbsp;";
			if (TruncateShowURL > 0)
			{
				if (pgurl.length > TruncateShowURL)
					pgurl = pgurl.substr(0, TruncateShowURL) + "...";
			}
			info_str += STR_RESULT_URL + " " + pgurl;
		}

		resultstext += "<div class=\"infoline\">";
		resultstext += info_str;
		resultstext += "</div></div>\n";
		arrayline++;
	}

	$(".searchresults").html(resultstext);

}

function ZoomShowSummary()
{
	
	if (InitSearchCalled == false)
	{
		if (IsWarningGiven == false)
			$(".searchresults").html('This is an advanced template option. You must call ZoomInitSearch() before this. Please check documentation for more help.');
		IsWarningGiven = true;
		return;
	}
	if (IsNoSearch)
		return;

	if (SkippedWords > 0)
		$(".searchsummary").html(STR_SKIPPED_FOLLOWING_WORDS + " " + SkippedOutputStr + ".<br /><br />");

	//Display search result information
	var matchestext = '';
	if (matches == 0)
		matchestext += STR_SUMMARY_NO_RESULTS_FOUND+"<br />";
	else if (NumSearchWords > 1 && andq == 0) {
		//OR
		SomeTermMatches = matches - fullmatches;
		matchestext += PrintNumResults(fullmatches) + " " + STR_SUMMARY_FOUND_CONTAINING_ALL_TERMS + " ";
		if (SomeTermMatches > 0)
			matchestext += PrintNumResults(SomeTermMatches) + " " + STR_SUMMARY_FOUND_CONTAINING_SOME_TERMS;
		matchestext += "<br />";
	}
	else if (NumSearchWords > 1 && andq == 1) //AND
		matchestext += PrintNumResults(fullmatches) + " " + STR_SUMMARY_FOUND_CONTAINING_ALL_TERMS + "<br />";
	else
		matchestext += PrintNumResults(matches) + " " + STR_SUMMARY_FOUND + "<br />";

	$(".searchsummary").html(matchestext);
}


// This is the default function and it's all you need to call for the normal result format
function ZoomSearch()
{
	ZoomInitSearch();
	ZoomShowHeading();
	ZoomShowSummary();
	ZoomShowResults();
}

function makeSearch() {

	query = $("#zoom_searchbox").val();
	andq = parseInt($('input[name="zoom_and"]:checked').val());
	
	query = query.replace(/[\"]/g, " ");
	var IsZoomQuery = 0;
	if (query.length == 0)
	{
		if (document.location.search.indexOf("zoom_query") != -1)
			IsZoomQuery = 1;
	}
	
	console.log("query: "+query)
	
	if (isNaN(andq))
	{
		if (typeof(DefaultToAnd) != "undefined" && DefaultToAnd == 1)
			andq = 1;
		else
			andq = 0;
	}
	console.log("andq: "+andq)
	
	ZoomSearch()
	return false;
}

jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
   if (pos >= 0) {
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.length && pat && pat.length ? this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 }) : this;
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};



