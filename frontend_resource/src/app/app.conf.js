(function () { 
 return angular.module("eolinker")
.constant("serverUrl", "/server/index.php")
.constant("isDebug", true)
.constant("assetUrl", "app/")
.constant("COOKIE_CONFIG", {"path":"/","domain":"localhost"});

})();
