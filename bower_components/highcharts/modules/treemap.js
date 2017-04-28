var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(E){return typeof E}:function(E){return E&&"function"==typeof Symbol&&E.constructor===Symbol&&E!==Symbol.prototype?"symbol":typeof E};(function(E){"object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=E:E(Highcharts)})(function(E){var F=E.seriesTypes,G=E.map,H=E.merge,I=E.extend,J=E.extendClass,K=E.getOptions().plotOptions,L=function(){},M=E.each,N=E.grep,O=E.pick,P=E.Series,Q=E.stableSort,R=E.Color,S=function(W,X,Y){var Z,Y=Y||this;for(Z in W)W.hasOwnProperty(Z)&&X.call(Y,W[Z],Z,W)},T=function(W,X,Y,Z){return Z=Z||this,W=W||[],M(W,function($,_){Y=X.call(Z,Y,$,_,W)}),Y},U=function V(W,X,Y){Y=Y||this,W=X.call(Y,W),!1!==W&&V(W,X,Y)};K.treemap=H(K.scatter,{showInLegend:!1,marker:!1,borderColor:"#E0E0E0",borderWidth:1,dataLabels:{enabled:!0,defer:!1,verticalAlign:"middle",formatter:function(){return this.point.name||this.point.id},inside:!0},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.value}</b><br/>"},layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,opacity:0.15,states:{hover:{borderColor:"#A0A0A0",brightness:F.heatmap?0:0.1,opacity:0.75,shadow:!1}},drillUpButton:{position:{align:"right",x:-10,y:10}}}),F.treemap=J(F.scatter,H({pointAttrToOptions:{},pointArrayMap:["value"],axisTypes:F.heatmap?["xAxis","yAxis","colorAxis"]:["xAxis","yAxis"],optionalAxis:"colorAxis",getSymbol:L,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",translateColors:F.heatmap&&F.heatmap.prototype.translateColors},{type:"treemap",trackerGroups:["group","dataLabelsGroup"],pointClass:J(E.Point,{setVisible:F.pie.prototype.pointClass.prototype.setVisible}),getListOfParents:function(W,X){var Y=T(W,function(Z,$,_){return $=O($.parent,""),void 0===Z[$]&&(Z[$]=[]),Z[$].push(_),Z},{});return S(Y,function(Z,$,_){""!==$&&-1===E.inArray($,X)&&(M(Z,function(aa){_[""].push(aa)}),delete _[$])}),Y},getTree:function(){var W,X=this;return W=G(this.data,function(Y){return Y.id}),W=X.getListOfParents(this.data,W),X.nodeMap=[],W=X.buildNode("",-1,0,W,null),U(this.nodeMap[this.rootNode],function(Y){var Z=!1,$=Y.parent;return Y.visible=!0,($||""===$)&&(Z=X.nodeMap[$]),Z}),U(this.nodeMap[this.rootNode].children,function(Y){var Z=!1;return M(Y,function($){$.visible=!0,$.children.length&&(Z=(Z||[]).concat($.children))}),Z}),this.setTreeValues(W),W},init:function(W,X){P.prototype.init.call(this,W,X),this.options.allowDrillToNode&&this.drillTo()},buildNode:function(W,X,Y,Z,$){var ca,_=this,aa=[],ba=_.points[X];return M(Z[W]||[],function(da){ca=_.buildNode(_.points[da].id,da,Y+1,Z,W),aa.push(ca)}),X={id:W,i:X,children:aa,level:Y,parent:$,visible:!1},_.nodeMap[X.id]=X,ba&&(ba.node=X),X},setTreeValues:function(W){var _,X=this,Y=X.options,Z=0,$=[],aa=X.points[W.i];return M(W.children,function(ba){ba=X.setTreeValues(ba),$.push(ba),ba.ignore?U(ba.children,function(ca){var da=!1;return M(ca,function(ea){I(ea,{ignore:!0,isLeaf:!1,visible:!1}),ea.children.length&&(da=(da||[]).concat(ea.children))}),da}):Z+=ba.val}),Q($,function(ba,ca){return ba.sortIndex-ca.sortIndex}),_=O(aa&&aa.options.value,Z),aa&&(aa.value=_),I(W,{children:$,childrenTotal:Z,ignore:!(O(aa&&aa.visible,!0)&&0<_),isLeaf:W.visible&&!Z,levelDynamic:Y.levelIsConstant?W.level:W.level-X.nodeMap[X.rootNode].level,name:O(aa&&aa.name,""),sortIndex:O(aa&&aa.sortIndex,-_),val:_}),W},calculateChildrenAreas:function(W,X){var Y=this,Z=Y.options,$=this.levelMap[W.levelDynamic+1],_=O(Y[$&&$.layoutAlgorithm]&&$.layoutAlgorithm,Z.layoutAlgorithm),aa=Z.alternateStartingDirection,ba=[],Z=N(W.children,function(ca){return!ca.ignore});$&&$.layoutStartingDirection&&(X.direction="vertical"===$.layoutStartingDirection?0:1),ba=Y[_](X,Z),M(Z,function(ca,da){var ea=ba[da];ca.values=H(ea,{val:ca.childrenTotal,direction:aa?1-X.direction:X.direction}),ca.pointValues=H(ea,{x:ea.x/Y.axisRatio,width:ea.width/Y.axisRatio}),ca.children.length&&Y.calculateChildrenAreas(ca,ca.values)})},setPointValues:function(){var W=this.xAxis,X=this.yAxis;M(this.points,function(Y){var _,aa,Z=Y.node,$=Z.pointValues;$&&Z.visible?(Z=Math.round(W.translate($.x,0,0,0,1)),_=Math.round(W.translate($.x+$.width,0,0,0,1)),aa=Math.round(X.translate($.y,0,0,0,1)),$=Math.round(X.translate($.y+$.height,0,0,0,1)),Y.shapeType="rect",Y.shapeArgs={x:Math.min(Z,_),y:Math.min(aa,$),width:Math.abs(_-Z),height:Math.abs($-aa)},Y.plotX=Y.shapeArgs.x+Y.shapeArgs.width/2,Y.plotY=Y.shapeArgs.y+Y.shapeArgs.height/2):(delete Y.plotX,delete Y.plotY)})},setColorRecursive:function(W,X){var Z,$,Y=this;W&&(Z=Y.points[W.i],$=Y.levelMap[W.levelDynamic],X=O(Z&&Z.options.color,$&&$.color,X),Z&&(Z.color=X),W.children.length&&M(W.children,function(_){Y.setColorRecursive(_,X)}))},algorithmGroup:function(W,X,Y,Z){this.height=W,this.width=X,this.plot=Z,this.startDirection=this.direction=Y,this.lH=this.nH=this.lW=this.nW=this.total=0,this.elArr=[],this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(_,aa){return Math.max(_/aa,aa/_)}},this.addElement=function($){this.lP.total=this.elArr[this.elArr.length-1],this.total+=$,0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH)),this.elArr.push($)},this.reset=function(){this.lW=this.nW=0,this.elArr=[],this.total=0}},algorithmCalcPoints:function(W,X,Y,Z){var $,_,aa,ba,fa,ca=Y.lW,da=Y.lH,ea=Y.plot,ga=0,ha=Y.elArr.length-1;X?(ca=Y.nW,da=Y.nH):fa=Y.elArr[Y.elArr.length-1],M(Y.elArr,function(ia){(X||ga<ha)&&(0===Y.direction?($=ea.x,_=ea.y,aa=ca,ba=ia/aa):($=ea.x,_=ea.y,ba=da,aa=ia/ba),Z.push({x:$,y:_,width:aa,height:ba}),0===Y.direction?ea.y+=ba:ea.x+=aa),ga+=1}),Y.reset(),0===Y.direction?Y.width-=ca:Y.height-=da,ea.y=ea.parent.y+(ea.parent.height-Y.height),ea.x=ea.parent.x+(ea.parent.width-Y.width),W&&(Y.direction=1-Y.direction),X||Y.addElement(fa)},algorithmLowAspectRatio:function(W,X,Y){var _,Z=[],$=this,aa={x:X.x,y:X.y,parent:X},ba=0,ca=Y.length-1,da=new this.algorithmGroup(X.height,X.width,X.direction,aa);return M(Y,function(ea){_=X.width*X.height*(ea.val/X.val),da.addElement(_),da.lP.nR>da.lP.lR&&$.algorithmCalcPoints(W,!1,da,Z,aa),ba==ca&&$.algorithmCalcPoints(W,!0,da,Z,aa),ba+=1}),Z},algorithmFill:function(W,X,Y){var $,ea,fa,ga,ha,Z=[],_=X.direction,aa=X.x,ba=X.y,ca=X.width,da=X.height;return M(Y,function(ia){$=X.width*X.height*(ia.val/X.val),ea=aa,fa=ba,0===_?(ha=da,ga=$/ha,ca-=ga,aa+=ga):(ga=ca,ha=$/ga,da-=ha,ba+=ha),Z.push({x:ea,y:fa,width:ga,height:ha}),W&&(_=1-_)}),Z},strip:function(W,X){return this.algorithmLowAspectRatio(!1,W,X)},squarified:function(W,X){return this.algorithmLowAspectRatio(!0,W,X)},sliceAndDice:function(W,X){return this.algorithmFill(!0,W,X)},stripes:function(W,X){return this.algorithmFill(!1,W,X)},translate:function(){var W,X;P.prototype.translate.call(this),this.rootNode=O(this.options.rootId,""),this.levelMap=T(this.options.levels,function(Y,Z){return Y[Z.level]=Z,Y},{}),X=this.tree=this.getTree(),this.axisRatio=this.xAxis.len/this.yAxis.len,this.nodeMap[""].pointValues=W={x:0,y:0,width:100,height:100},this.nodeMap[""].values=W=H(W,{width:W.width*this.axisRatio,direction:"vertical"===this.options.layoutStartingDirection?0:1,val:X.val}),this.calculateChildrenAreas(X,W),this.colorAxis?this.translateColors():this.options.colorByPoint||this.setColorRecursive(this.tree,void 0),this.options.allowDrillToNode&&(X=this.nodeMap[this.rootNode].pointValues,this.xAxis.setExtremes(X.x,X.x+X.width,!1),this.yAxis.setExtremes(X.y,X.y+X.height,!1),this.xAxis.setScale(),this.yAxis.setScale()),this.setPointValues()},drawDataLabels:function(){var Y,Z,W=this,X=N(W.points,function($){return $.node.visible});M(X,function($){Z=W.levelMap[$.node.levelDynamic],Y={style:{}},$.node.isLeaf||(Y.enabled=!1),Z&&Z.dataLabels&&(Y=H(Y,Z.dataLabels),W._hasPointLabels=!0),$.shapeArgs&&(Y.style.width=$.shapeArgs.width,$.dataLabel&&$.dataLabel.css({width:$.shapeArgs.width+"px"})),$.dlOptions=H(Y,$.options.dataLabels)}),P.prototype.drawDataLabels.call(this)},alignDataLabel:F.column.prototype.alignDataLabel,pointAttribs:function(W,X){var Y=this.levelMap[W.node.levelDynamic]||{},Z=this.options,$=X&&Z.states[X]||{},Y={stroke:W.borderColor||Y.borderColor||$.borderColor||Z.borderColor,"stroke-width":O(W.borderWidth,Y.borderWidth,$.borderWidth,Z.borderWidth),dashstyle:W.borderDashStyle||Y.borderDashStyle||$.borderDashStyle||Z.borderDashStyle,fill:W.color||this.color,zIndex:"hover"===X?1:0};return W.node.level<=this.nodeMap[this.rootNode].level?(Y.fill="none",Y["stroke-width"]=0):W.node.isLeaf?X&&(Y.fill=R(Y.fill).brighten($.brightness).get()):O(Z.interactByLeaf,!Z.allowDrillToNode)?Y.fill="none":(Z=O($.opacity,Z.opacity),Y.fill=R(Y.fill).setOpacity(Z).get()),Y},drawPoints:function(){var W=this,X=N(W.points,function(Y){return Y.node.visible});M(X,function(Y){var Z="levelGroup-"+Y.node.levelDynamic;W[Z]||(W[Z]=W.chart.renderer.g(Z).attr({zIndex:1E3-Y.node.levelDynamic}).add(W.group)),Y.group=W[Z],Z=W.pointAttribs(Y),Y.pointAttr={"":Z,hover:W.pointAttribs(Y,"hover"),select:{}},Z=parseInt(Z["stroke-width"],10)%2/2,Y.shapeArgs.x-=Z,Y.shapeArgs.y-=Z}),F.column.prototype.drawPoints.call(this),W.options.allowDrillToNode&&M(X,function(Y){var Z;Y.graphic&&(Z=Y.drillId=W.options.interactByLeaf?W.drillToByLeaf(Y):W.drillToByGroup(Y),Y.graphic.css({cursor:Z?"pointer":"default"}))})},drillTo:function(){var W=this;E.addEvent(W,"click",function(X){var Z,X=X.point,Y=X.drillId;Y&&(Z=W.nodeMap[W.rootNode].name||W.rootNode,X.setState(""),W.drillToNode(Y),W.showDrillUpButton(Z))})},drillToByGroup:function(W){var X=!1;return 1!=W.node.level-this.nodeMap[this.rootNode].level||W.node.isLeaf||(X=W.id),X},drillToByLeaf:function(W){var X=!1;if(W.node.parent!==this.rootNode&&W.node.isLeaf)for(W=W.node;!X;)(W=this.nodeMap[W.parent],W.parent===this.rootNode)&&(X=W.id);return X},drillUp:function(){var W=null;this.rootNode&&(W=this.nodeMap[this.rootNode],W=null===W.parent?this.nodeMap[""]:this.nodeMap[W.parent]),null!==W&&(this.drillToNode(W.id),""===W.id?this.drillUpButton=this.drillUpButton.destroy():(W=this.nodeMap[W.parent],this.showDrillUpButton(W.name||W.id)))},drillToNode:function(W){this.options.rootId=W,this.isDirty=!0,this.chart.redraw()},showDrillUpButton:function(W){var Z,$,X=this,W=W||"< Back",Y=X.options.drillUpButton;Y.text&&(W=Y.text),this.drillUpButton?this.drillUpButton.attr({text:W}).align():($=(Z=Y.theme)&&Z.states,this.drillUpButton=this.chart.renderer.button(W,null,null,function(){X.drillUp()},Z,$&&$.hover,$&&$.select).attr({align:Y.position.align,zIndex:9}).add().align(Y.position,!1,Y.relativeTo||"plotBox"))},buildKDTree:L,drawLegendSymbol:E.LegendSymbolMixin.drawRectangle,getExtremes:function(){P.prototype.getExtremes.call(this,this.colorValueData),this.valueMin=this.dataMin,this.valueMax=this.dataMax,P.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var W={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};P.prototype.bindAxes.call(this),E.extend(this.yAxis.options,W),E.extend(this.xAxis.options,W)}}))});