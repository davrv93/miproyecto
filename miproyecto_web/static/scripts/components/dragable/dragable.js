
ngDevhres.directive('coreDragable', function($document, $window) {

    function compile (element){
        element.addCss('core-dragable');
    };


    function controller(scope, element) {  

        var self = this;
        self.varChi = 0;
        self.dataTab = [];
        self.onIndex = '';
        scope.table = element[0];
        scope.data = [];
        scope.apx = 100;

        //------
        var y = scope.table.tHead.rows[0].cells;
        scope.tableTH1 = [];
        var tableTH = element[0].tHead.rows[0].cells;
        for(var jy = 0; jy < tableTH.length; jy++){
          scope.tableTH1[jy] = tableTH[jy];
        };

         

        function resetTable() {
          var tab = scope.table.tHead.rows[0].cells;
          var row = scope.table.tHead.rows[0];
          var j;
          for (j=0; j<tab.length; j++) {
            row.appendChild(row.removeChild(scope.tableTH1[j]));
          };
        };
        //----
        

        function addShadow(col){
              element.find('th').eq(col).css({
                        'background':'#f9f9f9',
                        'box-shadow': '-8px 0px px #f9f9f9',
                        'text-decoration': 'none',
                        'border': '10px',
                        'outline': 'none',
                        });     

        }; 

        function removeShadow(col){
              element.find('th').eq(col).css({
                        'background':'',
                        'box-shadow': '',
                        'padding': '',
                        'margin': '',
                        'min-width': '',
                        'font-size': '',
                        'text-align': '',
                        'text-transform': '',
                        'text-decoration': '',
                        'border': '',
                        'outline': '',
                        });     
        };


        for (var jy = 0; jy < y.length; jy++) {
            y[jy].onmousedown = dragInit;
            scope.data.push(jy);
        };


        function endDragable($event) {

            removeShadow(scope.colInit)
           
            $document.unbind('mousemove', moveDragable);
            $document.unbind('mouseup', endDragable);
 
            if (!scope.addedNode) {
                return;
            }
            scope.tableContainer.removeChild(scope.ndElement);
            var pos = evtPston($event);
            var positionTab = absPosit(scope.table);
            if (pos.y < positionTab.y ||
                pos.y > positionTab.y + scope.table.offsetHeight) {
                return;
            }
            var targetCol = searchCol(scope.table, pos.x);
			
            if (targetCol !== -1 && targetCol !== scope.colInit) {
                movCol(scope.table,
                           scope.colInit,
                           targetCol);
                scope.onendDragable({
                    $start: scope.colInit,
                    $target: targetCol
                });
                scope.$apply();
            }

         
        };

        function searchCol(table, x) {

            var header = table.tHead.rows[0].cells;
            
            var i;
            for (i = 0; i < header.length; i++) {
                var pos = absPosit(header[i]);
                if (pos.x <= x && x <= pos.x + header[i].offsetWidth){
                  
                    return i;
                }
            }

            return -1;
        };

        function movCol(table, sIdx, fIdx) {
            var row;
            var i=table.rows.length;
            while (i--) {
                row = table.rows[i];

                var x = row.removeChild(row.cells[sIdx]);


                if (fIdx < row.cells.length) {
                    row.insertBefore(x, row.cells[fIdx]); 
                }
                else {
                    row.appendChild(x);
                }

            };

            var headrow = table.tHead.rows[0].cells;

            var j;
            for (j=0; j<headrow.length; j++) {

                headrow[j].sorttable_columnindex = j;

            };
            
        };

        function cloneTable(elt, deep) {

            var newElement = elt.cloneNode(deep); 
            newElement.className = elt.className;
            forEach(elt.style, function(value, key) {
                if (value === null) {
                    return;
                }
                if (typeof(value) === "string" && value.length === 0) {
                        return;
                    }
                newElement.style[key] = elt.style[key];
            });
            return newElement;
        };

        

        function evtPston($event) {
            return {x: $event.pageX, y: $event.pageY};
        };

        function searchYepla(elt, tag) {
            do {
                if (elt.nodeName &&
                    elt.nodeName.search(tag) !== -1) {
                    return elt;
                }
                elt = elt.parentNode;
            } while (elt);
        };

        function dragInit($event) {
            $event.preventDefault();
            scope.oElement = $event.target;
            var pos = evtPston($event);
            scope.oElement = searchYepla(scope.oElement, /T[DH]/);
            scope.colInit = searchCol(scope.table, pos.x);
            addShadow(scope.colInit)
            if (scope.colInit === -1) {
                return;
            }
            var newElement = cloneTable(scope.table, false);
            newElement.style.margin = '0';
            var copySectionColumn = function(sec, col) {
                var new_sec = cloneTable(sec, false);
                forEach(sec.rows, function(row) {
                    var cell = row.cells[col];
                    var new_tr = cloneTable(row, false);
                    if (row.offsetHeight) {
                        new_tr.style.height = row.offsetHeight + "px";
                    }
                    var new_td = cloneTable(cell, true);
                    if (cell.offsetWidth) {
                        new_td.style.width = cell.offsetWidth + "px";
                    }
                    new_tr.appendChild(new_td);
                    new_sec.appendChild(new_tr);
                });

                return new_sec;
            };
             
            if (scope.table.tHead) {
                newElement.appendChild(copySectionColumn(
                    scope.table.tHead, scope.colInit));
            }
            forEach(scope.table.tBodies, function(tb) {
                newElement.appendChild(
                    copySectionColumn(
                        tb, scope.colInit));

            });

            if (scope.table.tFoot) {
                newElement.appendChild(copySectionColumn(
                    scope.table.tFoot, scope.colInit));
            };

            var ptjt = absPosit(scope.oElement, true);
            newElement.style.position = "absolute";
            newElement.style.left = ptjt.x + "px";
            newElement.style.top = ptjt.y + "px";
            newElement.style.width = scope.oElement.offsetWidth + "px";
            newElement.style.height = scope.oElement.offsetHeight + "px";
            newElement.style.opacity = 0.7;

            
            scope.addedNode = false;
            scope.tableContainer = scope.table.parentNode || $document.body;
            scope.ndElement = newElement;

            scope.cursorStartX = pos.x;
            scope.cursorStartY = pos.y;
            scope.elStartLeft = parseInt(scope.ndElement.style.left, 10);
            scope.elStartTop = parseInt(scope.ndElement.style.top,  10);
            if (isNaN(scope.elStartLeft)) {
                scope.elStartLeft = 0;
            };

            if (isNaN(scope.elStartTop)) {
                scope.elStartTop  = 0;
            };
             

            scope.ndElement.style.zIndex = ++scope.zIndex;
 
            $document.bind('mousemove', moveDragable);
            $document.bind('mouseup', endDragable);
        };

        function absPosit(elt, stopAtRelative) {
            var ex = 0, ey = 0;
            do {
                var curStyle = $window.getComputedStyle(elt, '');

                if (stopAtRelative && curStyle.position === 'relative') {
                    break;
                } else if (curStyle.position === 'fixed') {
                    
                    ex += parseInt(curStyle.left, 10);
                    ey += parseInt(curStyle.top, 10);
                    
                    ex += $document[0].body.scrollLeft;
                    ey += $document[0].body.scrollTop;
                    
                    break;
                } else {
                    ex += elt.offsetLeft;
                    ey += elt.offsetTop;
                }
                elt = elt.offsetParent;
            } while (elt);
            return {x: ex, y: ey};
        };


        function arForEach(array, block, context) {

            
            var i;
            for (i = 0; i < array.length; i++) {
                block.call(context, array[i], i, array);
            };
        };

        function forEach(object, block, context) {
            if (object) {
                var resolve = Object;  
                var isObjectFunction = object instanceof Function;
                if (!isObjectFunction && object.forEach instanceof Function) {
                     
                    object.forEach(block, context);
                    return;
                }
                if (isObjectFunction) {
                     
                    resolve = fnForEach;
                } else if (typeof object === "string") {
                    resolve = strForEach;
                } else if (typeof object.length === "number") {
                     
                    resolve = arForEach;
                }
                resolve(object, block, context);
            };
        };



        function moveDragable($event) {
           
          addShadow(scope.colInit)

            
            var pos = evtPston($event);
            
            var dx = scope.cursorStartX - pos.x;
            var dy = scope.cursorStartY - pos.y;
            if (!scope.addedNode && dx * dx + dy * dy > scope.apx) {
                scope.tableContainer.insertBefore(
                        scope.ndElement, scope.table);
                scope.addedNode = true;
            };


             
            var style = scope.ndElement.style;
            style.left = (scope.elStartLeft + pos.x - scope.cursorStartX) + "px";
            style.top  = (scope.elStartTop  + pos.y - scope.cursorStartY) + "px";
            style.background = '#eeeded';
            style.padding = '0 8px 0 8px';  
            style.radius = '50%';
            style.align = 'center';
            style.border = '2px'
            style.opacity = 1; 
        };

        scope.$watch('arrayWatch', function () {
            resetTable();
        });
    };

    return {
        scope: {
            onValue:'@',
            maChange:'=?',
            onendDragable: '&',
            arrayWatch: '=coreDragable'
        },
        link: controller,
        restrict: 'A',
    };
});