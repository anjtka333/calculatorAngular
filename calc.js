angular.module('calcApp', [])
    .directive('calculator', function() {
        return {
            restrict: 'EA',
            scope: true,
            templateUrl: 'calcTmpl.html',
            link: function(scope, element, attr) {
                var buffer = '';
                var cmd = '';
                var z='';
                scope.value = '';
                scope.display = '';
                scope.clearInput = false;

                scope.num = function(num) {
                    if (cmd) {
                        buffer += num;
                    } else {
                        scope.value += num;
                        z+=num;
                    }
                    scope.show(num);
                };
                scope.show = function(num) {
                    if (scope.display===0){
                        scope.display='';
                    }
                    scope.display += num;
                };
                scope.op = function(op) {
                    if (cmd) {
                        scope.compute();
                        scope.clearInput=false;
                    }
                    if (op === '+') {scope.clearInput=false;scope.display+=' + ';cmd = function(x,y) {
                        return  z= x+y;}}
                    else if (op === '-'){scope.clearInput=false;scope.display+=' - '; cmd = function(x,y) {
                        return z=x-y; }}
                    else if (op === '/'){scope.clearInput=false;scope.display+=' / '; cmd = function(x,y) {
                        return z=x/y; }}
                    else if (op === '*'){scope.clearInput=false;scope.display+=' * '; cmd = function(x,y) {
                        return z=x*y; }}
                };
                scope.backspace=function () {
                    scope.clearInput=false;
                    var zz = ''+z;
                    zz = zz.substring(0, zz.length - 1);
                    var zz =parseInt(zz,10);
                    z=zz;
                    scope.value=z;
                    scope.display=z;
                    return z;
                }
                scope.clear = function() {
                    scope.value = 0;
                    scope.display = 0;
                    buffer = 0;
                    cmd = undefined;
                    z=0;
                };
                scope.compute = function() {
                    if (cmd) {
                        scope.clearInput=true;
                        scope.value = cmd(1 * scope.value, 1 * buffer);
                        scope.display = scope.value;
                        buffer = '';
                        cmd = undefined;
                    }
                };
                scope.clearInputFunc= function () {
                    if(scope.clearInput){
                        scope.clear();
                        console.log("1"+scope.clearInput);
                        scope.clearInput=false;
                        console.log("2"+scope.clearInput);
                    }
                }
                scope.check = function () {
                    if(isNaN(scope.value)||isNaN(z)) {
                        scope.display = 0;
                        scope.value=0;
                    }
                }
            }
        }
    });