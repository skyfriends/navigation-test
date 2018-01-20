var headerData =
  '<nav class="navbar navbar-default"><div class="container"><div class="navbar-header"><div style="position:absolute;width:100%;text-align:center" class="mobileshow"><a href="http://www.wenger.com"><img src="../../../assets/img/wengerSmallLogo.png" alt="logo"/></a></div><a href="../../../"><button type="button" class="navbar-toggle" data-toggle="collapse"  data-target="#none" aria-expanded="true" aria-controls="navbar"><i class="fa fa-home fa-lg" aria-hidden="true" style="vertical-align:middle;font-size:"></i></button></a><button type="button" class="navbar-toggle for-sidebar" data-toggle="offcanvas"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div><div id="navbar" class="navbar-collapse collapse" aria-expanded="true" role="banner"><ul class="nav navbar-nav navbar-right"><li><a href="../PDF/UserManual.pdf">PDF Version</a></li><li><a href="../../../../">Manual Home</a></li></ul></div></div></nav>';

var copyrightData =
  '<div class="container-fluid"><div class="row"><div class="col-md-12" style="padding-bottom:50px;"><p>&copy; 2017 Wenger Manufacturing, Inc.</p><p>All information contained in or disclosed by this manual is considered confidential and proprietary by Wenger Manufacturing, Inc. and should not be reproduced or copied except for rights expressly granted.</p></div></div></div>';

var logoText =
  '<a class="sidebar-brand" href="http://www.wenger.com"><img src="../../../assets/img/logo_sidebar.png" alt="logo"></a>';

var menuDiv = document.getElementById('leftNav');
menuDiv.innerHTML = logoText + searchFormText + menuText;

var headerDiv = document.getElementById('headerDiv');
headerDiv.innerHTML = headerData;

var curPage;
var pageArray = [];
var nextLink;
var prevLink;
