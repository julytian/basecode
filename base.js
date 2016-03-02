//前台调用
var $ = function(_this) {
    return new Base(_this);
};

//基础库
function Base(_this) {
    this.elements = [];
    if(_this != undefined){
    	this.elements[0] = _this;
    }
}

//获取ID
Base.prototype.getId = function(id) {
    this.elements.push(document.getElementById(id));
    return this;
}

//获取元素节点数组
Base.prototype.getTagName = function(tag) {
    var tags = document.getElementsByTagName(tag);
    for (var i = 0, l = tags.length; i < l; ++i) {
        this.elements.push(tags[i]);
    }
    return this;
}

//获取某一个节点
Base.prototype.getElement = function(num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}

//设置或获取css
Base.prototype.css = function(attr, value) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 1) {
            if (typeof window.getComputedStyle != 'undefined') {
                return window.getComputedStyle(this.elements[i], null)[attr];
            } else if (typeof this.elements[i].currentStyle != 'undefined') {
                return this.elements[i].currentStyle(attr);
            }
        } else {
            this.elements[i].style[attr] = value;
        }
    };
    return this;
}

//获取class节点数组
Base.prototype.getClass = function(className, obj) {
    var all = (obj ? obj : document).getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            this.elements.push(all[i]);
        }
    }
    return this;
}

//添加class
Base.prototype.addClass = function(className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
            this.elements[i].className += ' ' + className;
        }
    }
    return this;
}

//删除class
Base.prototype.removeClass = function(className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
        }
    }
    return this;
}


//设置innerHTML
Base.prototype.html = function(str) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 0) {
            return this.elements[i].innerHTML;
        }
        this.elements[i].innerHTML = str;
    }
    return this;
}

//触发点击事件
Base.prototype.click = function(fn) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    }
    return this;
}