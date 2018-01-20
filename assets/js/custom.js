$('#leftNav a').click(function(e) {
  var linkHref = $(this)
    .attr('href')
    .toString();
  if (linkHref.indexOf('#') != -1) {
    var hash = linkHref.substr(linkHref.indexOf('#') + 1);
    $('#leftNav a').removeClass('active');
    $(this).addClass('active');
  } else {
    window.location.href = myHrefFull;
  }
});

$('span.expander').click(function(e) {
  $(this).toggleClass('open');
  $(this)
    .next()
    .toggleClass('open');
  $(this)
    .parent()
    .toggleClass('open');
});

$('#leftNav a').each(function() {
  'use strict';
  var curPageFull = location.href
    .split('/')
    .slice(-1)
    .toString();
  curPage = location.href
    .split('/')
    .slice(-1)
    .toString()
    .substr(0, 16);

  var myHrefFull = $(this)
    .attr('href')
    .toString();
  var myHref = $(this)
    .attr('href')
    .toString()
    .substr(0, 16);
  if (myHref !== '*') {
    pageArray.push(myHref);
  }

  if (myHrefFull === curPageFull) {
    $('#a' + curPage.toString().substr(4, 3)).addClass('open');
    $('#a' + curPage.toString().substr(4, 3) + ' ul').addClass('open');
    $('#a' + curPage.toString().substr(4, 3) + ' span').addClass('open');
    $(this).addClass('active');
  }
});

pageArray = pageArray.filter(function(item, pos) {
  'use strict';
  return pageArray.indexOf(item) === pos;
});

var curPageId = pageArray.indexOf(curPage);
if (curPageId < pageArray.length - 1) {
  nextLink = pageArray[curPageId + 1];
} else {
  nextLink = '';
}
if (curPageId > 0) {
  prevLink = pageArray[curPageId - 1];
} else {
  prevLink = '';
}

var footerData =
  '<div class="container-fluid"><a id="scroll-up" href="#"><i class="fa fa-angle-up"></i></a><div class="row"><div class="col-md-12"><ul class="footer-menu">';

if (prevLink != '') {
  footerData += '<li><a href="' + prevLink + '">&laquo; Previous</a></li>';
}
if (nextLink != '') {
  footerData += '<li><a href="' + nextLink + '">Next &raquo; </a></li>';
}

footerData += '</ul></div></div></div>';

var footerDiv = document.getElementById('footerDiv');
//footerDiv.innerHTML = footerData;

if (query.toString().length > 0) {
  document.getElementById('zoom_searchbox').value = query;
  if (andq == 0) {
    $('#zoom_and_off').attr('checked', 'checked');
    $('#zoom_and_on').attr('checked', false);
    $('#page').highlight(query);
    var temparr = query.split(' ');
    for (i = 0; i < temparr.length; i++) {
      $('#page').highlight(temparr[i]);
    }
  } else {
    $('#zoom_and_on').attr('checked', 'checked');
    $('#zoom_and_off').attr('checked', false);
    $('#page').highlight(query);
  }
  makeSearch();
}
