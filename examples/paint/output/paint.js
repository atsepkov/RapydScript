/* This file was auto-generated using RapydScript */
(function(){
BRUSH = 0;
ERASER = 1;
LINE = 2;
SELECT = 3;
COLORSELECT = 4;
LASSO = 5;
RECT = 6;
ELLIPSE = 7;
SAMPLER = 8;
BUCKET = 9;
TEXT = 10;
X = 0;
Y = 1;
CLICK = 1;
RCLICK = 3;
Drawing = function() {
  var $tmpCanvas, canvasHeight, canvasWidth, clear, ctx, dragging, drawSpline, eachPixel, ellipse, getXY, lastPt, main, matchStartColor, normalize, onMouseDown, onMouseLeave, onMouseMove, onMouseUp, points, sample, selection, tmpCanvas, tmpCtx, transparent_bg;
  this._canvas = $("#perm-dwg").get(0);
  this._ctx = ctx = this._canvas.getContext("2d");
  this._undoStack = [];
  this._redoStack = [];
  this._fillColor = null;
  this._strokeColor = null;
  $tmpCanvas = $("#temp-dwg");
  tmpCanvas = $tmpCanvas.get(0);
  tmpCtx = tmpCanvas.getContext("2d");
  canvasWidth = tmpCanvas.width;
  canvasHeight = tmpCanvas.height;
  dragging = false;
  points = [];
  selection = null;
  lastPt = [0, 0];
  transparent_bg = true;
  main = this;
  getXY = (function(obj, event) {
    var absolute;
    absolute = $(obj).offset();
    return [(event.pageX - absolute.left), (event.pageY - absolute.top)];
  });
  normalize = (function(x, y, width, height) {
    if ((width < 0)) {
      width = (-width);
      x = (x - width);
    }

    if ((height < 0)) {
      height = (-height);
      y = (y - height);
    }

    return [x, y, width, height];
  });
  ellipse = (function(context, x, y, width, height) {
    var _$rapyd_tuple$_, circ, ctrX, ctrY, scaleX, scaleY;
    _$rapyd_tuple$_ = normalize(x, y, width, height);
    x = _$rapyd_tuple$_[0];
    y = _$rapyd_tuple$_[1];
    width = _$rapyd_tuple$_[2];
    height = _$rapyd_tuple$_[3];
    ctrX = (((x + x) + width) / 2);
    ctrY = (((y + y) + height) / 2);
    circ = Math.max(width, height);
    scaleX = (width / circ);
    scaleY = (height / circ);
    context.save();
    context.translate(ctrX, ctrY);
    context.scale(scaleX, scaleY);
    context.arc(0, 0, (circ / 2), 0, (2 * Math.PI));
    context.restore();
  });
  drawSpline = (function(context, lastPoint) {
    if ((lastPoint === undefined)) {
      lastPoint = points[(points.length - 1)];
    }

    context.beginPath();
    context.moveTo(points[0][X], points[0][Y]);
    if ((points.length == 1)) {
      context.lineTo(lastPoint[X], lastPoint[Y]);
    } else if ((points.length == 2)) {
      context.quadraticCurveTo(points[1][X], points[1][Y], lastPoint[X], lastPoint[Y]);
    } else {
      context.bezierCurveTo(points[1][X], points[1][Y], points[2][X], points[2][Y], lastPoint[X], lastPoint[Y]);
    }

    context.stroke();
  });
  sample = (function(x, y, click) {
    var color, data, tag;
    data = ctx.getImageData(x, y, 1, 1).data;
    if (data[3]) {
      color = (((((("rgb(" + data[0]) + ",") + data[1]) + ",") + data[2]) + ")");
    } else {
      color = "transparent";
    }

    if ((click == CLICK)) {
      tag = "#stroke";
    } else {
      tag = "#fill";
    }

    if ((color == "transparent")) {
      color = null;
      $(tag).css("background", "");
    } else {
      $(tag).css("background", color);
    }

    if ((click == CLICK)) {
      main._brushColor = color;
    } else {
      main._fillColor = color;
    }

  });
  matchStartColor = (function(colorLayer, pixelPos, startPixel) {
    var a, b, g, r;
    r = colorLayer[pixelPos];
    g = colorLayer[(pixelPos + 1)];
    b = colorLayer[(pixelPos + 2)];
    a = colorLayer[(pixelPos + 3)];
    return ((((r == startPixel[0]) && (g == startPixel[1])) && (b == startPixel[2])) && (!!(a) == !!(startPixel[3])));
  });
  eachPixel = (function(imageData, callback) {
    var length, offset;
    offset = 0;
    length = ((imageData.height * imageData.width) * 4);
    while ((offset < length)) {
      callback(offset);
      offset += 4;
    }

  });
  this._clear = clear = (function(context) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  });
  onMouseDown = (function(event) {
    var _$rapyd_tuple$_, colorLayer, data, locX, locY, merge, newPos, pixelPos, pixelStack, reachLeft, reachRight, startPixel, swatchPixel, tmp, x, y;
    
    event.preventDefault();
    dragging = true;
    _$rapyd_tuple$_ = getXY(this, event);
    x = _$rapyd_tuple$_[0];
    y = _$rapyd_tuple$_[1];
    main._undoStack.append(ctx.getImageData(0, 0, canvasWidth, canvasHeight));
    main._redoStack = [];
    ctx.save();
    tmpCtx.save();
    if ((main._mode in [BRUSH, ERASER])) {
      ctx.lineWidth = main._lineWidth;
      if ((main._mode == BRUSH)) {
        ctx.strokeStyle = main._brushColor;
      } else {
        ctx.globalCompositeOperation = "destination-out";
      }

      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (((main._mode - RECT) in [RECT, ELLIPSE])) {
      tmpCtx.lineWidth = main._lineWidth;
      tmpCtx.strokeStyle = main._brushColor;
      tmpCtx.fillStyle = main._fillColor;
      points.append([x, y]);
    } else if ((main._mode == LINE)) {
      tmpCtx.lineWidth = main._lineWidth;
      tmpCtx.strokeStyle = main._brushColor;
      points.append([x, y]);
    } else if ((main._mode == SAMPLER)) {
      sample(x, y, event.which);
    } else if (((main._mode == BUCKET) && main._fillColor)) {
      pixelStack = [[x, y]];
      colorLayer = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      data = colorLayer.data;
      startPixel = ctx.getImageData(x, y, 1, 1).data;
      tmpCtx.save();
      tmpCtx.fillStyle = main._fillColor;
      _$rapyd_tuple$_ = [50, 50];
      locX = _$rapyd_tuple$_[0];
      locY = _$rapyd_tuple$_[1];
      tmpCtx.fillRect(locX, locY, 1, 1);
      swatchPixel = tmpCtx.getImageData(locX, locY, 1, 1).data;
      tmpCtx.clearRect(locX, locY, 1, 1);
      tmpCtx.restore();
      if ((!matchStartColor(swatchPixel, 0, startPixel))) {
        while (pixelStack.length) {
          newPos = pixelStack.pop();
          x = newPos[X];
          y = newPos[Y];
          pixelPos = (((y * canvasWidth) + x) * 4);
          while (((y >= 0) && matchStartColor(data, pixelPos, startPixel))) {
            y -= 1;
            pixelPos -= (canvasWidth * 4);
          }

          pixelPos += (canvasWidth * 4);
          y += 1;
          reachLeft = false;
          reachRight = false;
          while (((y < (canvasHeight - 1)) && matchStartColor(data, pixelPos, startPixel))) {
            y += 1;
            data[pixelPos] = swatchPixel[0];
            data[(pixelPos + 1)] = swatchPixel[1];
            data[(pixelPos + 2)] = swatchPixel[2];
            data[(pixelPos + 3)] = swatchPixel[3];
            if ((x > 0)) {
              if (matchStartColor(data, (pixelPos - 4), startPixel)) {
                if ((!reachLeft)) {
                  pixelStack.append([(x - 1), y]);
                  reachLeft = true;
                }

              } else if (reachLeft) {
                reachLeft = false;
              }

            }

            if ((x < (canvasWidth - 1))) {
              if (matchStartColor(data, (pixelPos + 4), startPixel)) {
                if ((!reachRight)) {
                  pixelStack.append([(x + 1), y]);
                }

              } else if (reachRight) {
                reachRight = false;
              }

            }

            pixelPos += (canvasWidth * 4);
          }

        }

        ctx.putImageData(colorLayer, 0, 0);
      }

    } else if ((main._mode == SELECT)) {
      lastPt = [x, y];
      if ((selection === null)) {
        tmpCtx.lineWidth = 1;
        tmpCtx.strokeStyle = "rgb(0,255,0)";
        points.append([x, y]);
      } else if ((!((((points[0][X] < x) && (x < points[1][X])) && (points[0][Y] < y)) && (y < points[1][Y])))) {
        if (transparent_bg) {
          tmp = ctx.getImageData(points[0][X], points[0][Y], (points[1][X] - points[0][X]), (points[1][Y] - points[0][Y])).data;
          data = selection.data;
          merge = (function(offset) {
            if ((!data[(offset + 3)])) {
              data[offset] = tmp[offset];
              data[(offset + 1)] = tmp[(offset + 1)];
              data[(offset + 2)] = tmp[(offset + 2)];
              data[(offset + 3)] = tmp[(offset + 3)];
            }

          });
          eachPixel(selection, merge);
        }

        ctx.putImageData(selection, points[0][X], points[0][Y]);
        clear(tmpCtx);
        selection = null;
        points = [[x, y]];
      }

    }

  });
  onMouseMove = (function(event) {
    var _$rapyd_tuple$_, point, x, y;
    
    if (((main._mode == LINE) && points.length)) {
      _$rapyd_tuple$_ = getXY(this, event);
      x = _$rapyd_tuple$_[0];
      y = _$rapyd_tuple$_[1];
      clear(tmpCtx);
      drawSpline(tmpCtx, [x, y]);
    } else if (dragging) {
      _$rapyd_tuple$_ = getXY(this, event);
      x = _$rapyd_tuple$_[0];
      y = _$rapyd_tuple$_[1];
      if ((main._mode in [BRUSH, ERASER])) {
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (((main._mode - RECT) in [RECT, ELLIPSE])) {
        clear(tmpCtx);
        tmpCtx.beginPath();
        if ((main._mode == RECT)) {
          tmpCtx.rect(points[0][X], points[0][Y], (x - points[0][X]), (y - points[0][Y]));
        } else {
          ellipse(tmpCtx, points[0][X], points[0][Y], (x - points[0][X]), (y - points[0][Y]));
        }

        if ((main._fillColor !== null)) {
          tmpCtx.fill();
        }

        if ((main._brushColor !== null)) {
          tmpCtx.stroke();
        }

      } else if ((main._mode == SAMPLER)) {
        sample(x, y, event.which);
      } else if ((main._mode == SELECT)) {
        clear(tmpCtx);
        if ((selection !== null)) {
          var _$tmp1_data = _$rapyd$_iter(points);
          var _$tmp2_len = _$tmp1_data.length;
          for (var _$tmp3_index = 0; _$tmp3_index < _$tmp2_len; _$tmp3_index++) {
            point = _$tmp1_data[_$tmp3_index];

            point[0] += (x - lastPt[X]);
            point[1] += (y - lastPt[Y]);
          }

          lastPt = [x, y];
          x = points[1][X];
          y = points[1][Y];
          tmpCtx.putImageData(selection, points[0][X], points[0][Y]);
        }

        tmpCtx.strokeRect(points[0][X], points[0][Y], (x - points[0][X]), (y - points[0][Y]));
      }

    }

  });
  onMouseUp = (function(event) {
    var _$rapyd_tuple$_, height, sx, sy, width, x, y;
    
    if (((main._mode - RECT) in [RECT, ELLIPSE])) {
      _$rapyd_tuple$_ = getXY(this, event);
      x = _$rapyd_tuple$_[0];
      y = _$rapyd_tuple$_[1];
      ctx.beginPath();
      ctx.lineWidth = main._lineWidth;
      ctx.strokeStyle = main._brushColor;
      ctx.fillStyle = main._fillColor;
      if ((main._mode == RECT)) {
        ctx.rect(points[0][X], points[0][Y], (x - points[0][X]), (y - points[0][Y]));
      } else {
        ellipse(ctx, points[0][X], points[0][Y], (x - points[0][X]), (y - points[0][Y]));
      }

      if ((main._fillColor !== null)) {
        ctx.fill();
      }

      if ((main._brushColor !== null)) {
        ctx.stroke();
      }

    } else if ((((main._mode == LINE) && (event.which == CLICK)) && (points.length > 1))) {
      ctx.lineWidth = main._lineWidth;
      ctx.strokeStyle = main._brushColor;
      drawSpline(ctx);
    } else if ((main._mode == SELECT)) {
      _$rapyd_tuple$_ = getXY(this, event);
      x = _$rapyd_tuple$_[0];
      y = _$rapyd_tuple$_[1];
      if ((((selection === null) && (x != points[0][X])) && (y != points[0][Y]))) {
        sx = points[0][X];
        sy = points[0][Y];
        width = (x - sx);
        height = (y - sy);
        _$rapyd_tuple$_ = normalize(sx, sy, width, height);
        sx = _$rapyd_tuple$_[0];
        sy = _$rapyd_tuple$_[1];
        width = _$rapyd_tuple$_[2];
        height = _$rapyd_tuple$_[3];
        points = [[sx, sy]];
        x = (sx + width);
        y = (sy + height);
        selection = ctx.getImageData(sx, sy, width, height);
        ctx.clearRect(sx, sy, width, height);
        tmpCtx.putImageData(selection, points[0][X], points[0][Y]);
        tmpCtx.strokeRect(points[0][X], points[0][Y], (x - points[0][X]), (y - points[0][Y]));
        points.append([x, y]);
      }

    }

    dragging = false;
    ctx.restore();
    if ((((!selection) || ((x == points[0][X]) && (y == points[0][Y]))) && ((!(main._mode == LINE)) || ((event.which == CLICK) && (points.length > 1))))) {
      points = [];
      clear(tmpCtx);
      tmpCtx.restore();
    }

  });
  this._filter = (function(callback) {
    var data, invoke, pixels;
    
    if (selection) {
      pixels = selection;
    } else {
      pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    }

    data = pixels.data;
    invoke = (function(offset) {
      callback(data, offset);
    });
    eachPixel(pixels, invoke);
    if (selection) {
      clear(tmpCtx);
      tmpCtx.putImageData(pixels, points[0][X], points[0][Y]);
      tmpCtx.strokeRect(points[0][X], points[0][Y], (points[1][X] - points[0][X]), (points[1][Y] - points[0][Y]));
    } else {
      ctx.putImageData(pixels, 0, 0);
    }

  });
  $tmpCanvas.mousedown(onMouseDown);
  $tmpCanvas.mousemove(onMouseMove);
  $tmpCanvas.mouseup(onMouseUp);
  onMouseLeave = (function(event) {
    if (dragging) {
      onMouseUp(event);
    }

  });
  $tmpCanvas.mouseleave(onMouseLeave);
  this._ctx.lineJoin = tmpCtx.lineJoin = this._ctx.lineCap = tmpCtx.lineCap = "round";
};

Drawing.prototype.undo = (function() {
  var state;
  state = this._undoStack.pop();
  if (state) {
    this._redoStack.append(state);
    this._ctx.putImageData(state, 0, 0);
  }

});
Drawing.prototype.redo = (function() {
  var state;
  state = this._redoStack.pop();
  if (state) {
    this._undoStack.append(state);
    this._ctx.putImageData(state, 0, 0);
  }

});
Drawing.prototype.setMode = (function(mode) {
  this._mode = mode;
});
Drawing.prototype.setStroke = (function(style) {
  this._brushColor = style;
});
Drawing.prototype.setFill = (function(style) {
  this._fillColor = style;
});
Drawing.prototype.setWidth = (function(value) {
  this._lineWidth = value;
});
Drawing.prototype.clear = (function() {
  this._clear(this._ctx);
});
Drawing.prototype.exportDwg = (function() {
  return this._canvas.toDataURL();
});
Drawing.prototype.invert = (function() {
  var invert;
  invert = (function(data, offset) {
    data[offset] = (255 - data[offset]);
    data[(offset + 1)] = (255 - data[(offset + 1)]);
    data[(offset + 2)] = (255 - data[(offset + 2)]);
  });
  this._filter(invert);
});
Drawing.prototype.redFilter = (function() {
  var remove;
  remove = (function(data, offset) {
    data[offset] = 0;
  });
  this._filter(remove);
});
Drawing.prototype.greenFilter = (function() {
  var remove;
  remove = (function(data, offset) {
    data[(offset + 1)] = 0;
  });
  this._filter(remove);
});
Drawing.prototype.blueFilter = (function() {
  var remove;
  remove = (function(data, offset) {
    data[(offset + 2)] = 0;
  });
  this._filter(remove);
});
Drawing.prototype.darken = (function() {
  var darken;
  darken = (function(data, offset) {
    data[offset] /= 2;
    data[(offset + 1)] /= 2;
    data[(offset + 2)] /= 2;
  });
  this._filter(darken);
});
Drawing.prototype.lighten = (function() {
  var lighten;
  lighten = (function(data, offset) {
    data[offset] = Math.min((data[offset] * 2), 255);
    data[(offset + 1)] = Math.min((data[(offset + 1)] * 2), 255);
    data[(offset + 2)] = Math.min((data[(offset + 2)] * 2), 255);
  });
  this._filter(lighten);
});
ColorSwatch = function() {
  var bg, fg;
  fg = $("<div></div>").width(36).height(36).css({
    "position": "absolute",
    "border": "1px solid black"
  });
  fg.change = (function(color) {
    $(this).css("background", color);
  });
  bg = fg.clone();
  $("#color-swatch");
};

main = function() {
  var $about, $brushWidget, $colorPicker, $colorPickers, $fill, $menus, $stroke, $swatch, $tools, _$rapyd_tuple$_, callback, dwg, hideMenus, idtag, makeHandler, makeMenu, makeMode, makeReset, onChange, popupUnder, resetid, setFill, setStroke, triggerChange;
  dwg = new Drawing();
  onChange = (function() {
    dwg.setWidth($(this).val());
  });
  $brushWidget = $("#brush-size").spinner({
    "min": 1,
    "max": 40
  });
  $brushWidget.change(onChange);
  triggerChange = (function() {
    $(this).siblings("input").change();
  });
  $(".ui-spinner-button").click(triggerChange);
  $brushWidget.val(1);
  $tools = $(".toolbox-item");
  makeMode = (function(mode) {
    var setMode;
    setMode = (function(event) {
      dwg.setMode(mode);
      $tools.removeClass("selected");
      $(event.target).parent().addClass("selected");
    });
    return setMode;
  });
  $("#toolbox-brush").click(makeMode(BRUSH));
  $("#toolbox-eraser").click(makeMode(ERASER));
  $("#toolbox-line").click(makeMode(LINE));
  $("#toolbox-select").click(makeMode(SELECT));
  $("#toolbox-colorselect").click(makeMode(COLORSELECT));
  $("#toolbox-lasso").click(makeMode(LASSO));
  $("#toolbox-rectangle").click(makeMode(RECT));
  $("#toolbox-ellipse").click(makeMode(ELLIPSE));
  $("#toolbox-sampler").click(makeMode(SAMPLER));
  $("#toolbox-bucket").click(makeMode(BUCKET));
  $("#toolbox-text").click(makeMode(TEXT));
  $("#toolbox-brush").click();
  $stroke = $("#stroke");
  $fill = $("#fill");
  setStroke = (function(style) {
    dwg.setStroke(style);
    $stroke.css("background", style);
  });
  setFill = (function(style) {
    dwg.setFill(style);
    $fill.css("background", style);
  });
  setStroke("black");
  $colorPickers = $(".colorpicker");
  var _$tmp1_data = _$rapyd$_iter([[$stroke, "#fg-color", "#no-stroke", setStroke], [$fill, "#bg-color", "#no-fill", setFill]]);
  var _$tmp2_len = _$tmp1_data.length;
  for (var _$tmp3_index = 0; _$tmp3_index < _$tmp2_len; _$tmp3_index++) {
    _$rapyd$_tuple = _$tmp1_data[_$tmp3_index];
    $swatch = _$rapyd$_tuple[0];
    idtag = _$rapyd$_tuple[1];
    resetid = _$rapyd$_tuple[2];
    callback = _$rapyd$_tuple[3];

    $colorPicker = $(idtag);
    $colorPicker.farbtastic(callback);
    makeHandler = (function($target, $popup) {
      var showColorpicker;
      showColorpicker = (function(event) {
        $colorPickers.hide();
        popupUnder(event, $target, $popup);
      });
      return showColorpicker;
    });
    $swatch.click(makeHandler($swatch, $colorPicker));
    makeReset = (function($target, setFunction) {
      var reset;
      reset = (function() {
        event.stopPropagation();
        setFunction("transparent");
        $target.css("background", "");
      });
      return reset;
    });
    $(resetid).click(makeReset($swatch, callback));
  }

  popupUnder = (function(event, $element, $popup) {
    var absolute;
    event.stopPropagation();
    absolute = $element.offset();
    $popup.css({
      "left": absolute.left,
      "top": (absolute.top + $element.outerHeight())
    }).show();
  });
  $menus = $(".menubar-menu");
  makeMenu = (function() {
    var $this, idtag, showMenu;
    $this = $(this);
    idtag = $this.attr("id").split("-")[2];
    showMenu = (function(event) {
      $menus.hide();
      popupUnder(event, $this, $(("#menubar-menu-" + idtag)));
    });
    $this.click(showMenu);
  });
  hideMenus = (function() {
    $menus.hide();
    $colorPickers.hide();
  });
  $(document).click(hideMenus);
  $menus.menu().removeClass("ui-widget");
  $(".menubar-item").each(makeMenu);
  $("#menubar-menu-item-new").click((function() {
    dwg.clear();
  }));
  $("#menubar-menu-item-export-to-image").click((function() {
    var url;
    url = dwg.exportDwg();
    window.open(url, "_blank");
  }));
  $("#menubar-menu-item-undo").click((function() {
    dwg.undo();
  }));
  $("#menubar-menu-item-redo").click((function() {
    dwg.redo();
  }));
  $("#menubar-menu-item-invert-colors").click((function() {
    dwg.invert();
  }));
  $("#menubar-menu-item-red-filter").click((function() {
    dwg.redFilter();
  }));
  $("#menubar-menu-item-green-filter").click((function() {
    dwg.greenFilter();
  }));
  $("#menubar-menu-item-blue-filter").click((function() {
    dwg.blueFilter();
  }));
  $("#menubar-menu-item-darken").click((function() {
    dwg.darken();
  }));
  $("#menubar-menu-item-lighten").click((function() {
    dwg.lighten();
  }));
  $about = $("#about").dialog({
    "modal": true
  });
  $("#menubar-menu-item-about").click((function() {
    $about.dialog("open");
  }));
  window.oncontextmenu = (function() {
    return false;
  });
};

$(document).ready(main);

}());