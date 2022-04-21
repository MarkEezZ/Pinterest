let app = {};

(function() {

    'use strict';

    app.nav = (function() {
        let _private = {},
            _public = {},
            _menu = document.getElementsByClassName('dd');

        _private.addEvent = function(el, type, handler) {
            if (el.addEventListener){
                el.addEventListener(type, handler, false)
            } else {
                el.attachEvent('on' + type, handler)
            }
        };

        // определение уровня элемента
        _private.getLevelItem = function(target) {
            let deep, aClasses, parent;

            aClasses = target.className.split(' ');
            for (let i = 0, len = aClasses.length; i < len; i++) {
                switch (aClasses[i]) {
                    // элемент первого уровня
                    case 'dd__link':
                        deep = 'parent';
                        parent = target.parentNode;
                        break;
                    // элемент второго уровня
                    case 'dd__sub-item':
                        deep = 'sub';
                        break;
                    default:
                }
            };
            return {
                deep: deep,
                parent: parent
            };
        };

        // проверка наличия класса, удаление при необходимости
        _private.checkHasClass = function(el, cl, dl) {
            let flag = false,
                aClasses;

            aClasses = el.className.split(' ');
            for (let i = 0, len = aClasses.length; i < len; i++) {
                if (aClasses[i] === cl) {
                    flag = true;
                    if (dl) {
                        aClasses.splice(i, 1);
                    }
                }
            };

            return {
                flag: flag,
                nameClass: aClasses.join(' ')
            }
        };

        // запись индекса активного пункта
        _private.writeIndex = function(flag, propertyName, els, current, id) {
            if (flag) {
                app.nav.navElements[id][propertyName] = -1;
            } else {
                for (let i = 0, len = els.length - 1 ; i <= len; i++) {
                    if (els[i] === current) {
                        app.nav.navElements[id][propertyName] = i;
                    }
                };
            }
        };

        // конструктор меню
        _private.Menu = function(el, type, event) {
            this.el = el;           // ссылка на элемент в DOM
            this.type = type;       // тип меню : горизонтальное или вертикальное
            this.event = event;     // событие срабатывания
            this.iItem = -1;        // индекс родительского элемента открытой плашки
                                    // если меньше 0, то все плашки скрыты
            this.iSub = -1;         // индекс выбранного элемента второго уровня
                                    // если меньше 0, то нет выбранного элемента
        };

        // скрытие выпадающих плашек
        _private.Menu.prototype.hideAll = function() {
            let menuItems = this.el.getElementsByClassName('dd__item');

            for (let i = menuItems.length - 1; i >= 0 ; i--) {
                menuItems[i].className = 'dd__item';
            };
        };

        // сброс выбранного пункта меню
        _private.Menu.prototype.resetChoose = function() {
            let menuSubItems = this.el.getElementsByClassName('dd__sub-item');
            for (let i = menuSubItems.length - 1; i >= 0 ; i--) {
                menuSubItems[i].className = _private.checkHasClass(menuSubItems[i], 'dd__sub-item__active', true).nameClass;
            };
        };

        // навешивание обработчиков
        _private.Menu.prototype.init = function() {
            let menuItems = this.el.getElementsByClassName('dd__item'),
                menuSub = this.el.getElementsByClassName('dd__sub'),
                events = [];

            if (this.event === 'click') {

                // обработчик на клик для пунктов меню первого уровня
                _private.addEvent(this.el, 'mousedown', function(e) {
                    let target = e.target,
                        childrenItems = target.parentNode.parentNode.getElementsByClassName('dd__item'),
                        childrenSubs,
                        level = _private.getLevelItem(target),
                        classActive,
                        menuId;

                    // если клик на элемент первого уровня
                    if (level.deep === 'parent') {

                        // получение
                        menuId = target.parentNode.parentNode.getAttribute('id');

                        // определение активности элемента
                        classActive = _private.checkHasClass(level.parent, 'dd__item__active', true);

                        // запись индекса открытой плашки
                        _private.writeIndex(classActive.flag, 'iItem', childrenItems, level.parent, menuId);

                        // скрытие всех плашек
                        app.nav.navElements[menuId].hideAll();

                        // обновление класса элемента
                        level.parent.className = classActive.nameClass;
                        if (!classActive.flag) {
                            level.parent.className = level.parent.className + ' dd__item__active';
                        }

                    }

                    e.preventDefault();

                });

                // скрытие выпадающих плашек при клике вне области меню
                _private.addEvent(document, 'mousedown', function(e) {

                    for (let menu in app.nav.navElements) {
                        if (app.nav.navElements[menu].event === 'click') {
                            app.nav.navElements[menu].hideAll();
                            app.nav.navElements[menu].iItem = -1;
                        }
                    }

                    e.stopPropagation();

                });

            }

            if (this.event === 'hover') {

                // обработчик на mouseover
                _private.addEvent(this.el, 'mouseover', function(e) {
                    let target = e.target,
                        childrenItems = target.parentNode.parentNode.getElementsByClassName('dd__item'),
                        level = _private.getLevelItem(target),
                        itemIsLink = target.nodeName === 'A',
                        classActive,
                        menuId,
                        parent;

                    // если элемент первого уровня
                    if (level.deep === 'parent') {

                        menuId = target.parentNode.parentNode.getAttribute('id');

                        // определение активности элемента
                        classActive = _private.checkHasClass(level.parent, 'dd__item__active', true);

                        _private.writeIndex(classActive.flag, 'iItem', childrenItems, level.parent, menuId);

                        // скрытие всех плашек
                        app.nav.navElements[menuId].hideAll();

                        // обновление класса элемента
                        level.parent.className = classActive.nameClass;
                        if (!classActive.flag) {
                            level.parent.className = level.parent.className + ' dd__item__active';
                        }

                    }

                    e.stopPropagation();
                });

                // обработчик на клик
                _private.addEvent(this.el, 'mousedown', function(e) {
                    let target = e.target;
                });

                // скрытие выпадающих плашек при клике вне области меню
                _private.addEvent(document, 'mouseover', function(e) {
                    for (let menu in app.nav.navElements) {
                        if (app.nav.navElements[menu].event === 'hover') {
                            app.nav.navElements[menu].hideAll();
                            app.nav.navElements[menu].iItem = -1;
                        }
                    }
                });

            }

            // обработчик выбора пунта меню второго уровня
            _private.addEvent(this.el, 'mousedown', function(e) {
                let target = e.target,
                    childrenSubs,
                    level = _private.getLevelItem(target),
                    itemIsLink = target.nodeName === 'A',
                    classActive,
                    parent,
                    menuId;

                // если клик на элемент второго уровня
                if ((level.deep === 'sub') || (_private.getLevelItem(target.parentNode).deep === 'sub')) {
                    if (!target.getAttribute('disabled')) {

                        if (itemIsLink) {
                            parent = target.parentNode.parentNode.parentNode.parentNode;
                        } else {
                            parent = target.parentNode.parentNode.parentNode;
                        }
                        menuId = parent.getAttribute('id');

                        // сброс
                        app.nav.navElements[menuId].resetChoose();

                        // обновление класса и запись индекса выбранного пункта
                        if (itemIsLink) {
                            target.parentNode.className = target.parentNode.className + ' dd__sub-item__active';
                            childrenSubs = target.parentNode.parentNode.getElementsByClassName('dd__sub-item');
                            _private.writeIndex(false, 'iSub', childrenSubs, level.parent, menuId);
                        } else {
                            target.className = target.className + ' dd__sub-item__active';
                            childrenSubs = target.parentNode.getElementsByClassName('dd__sub-item');
                            _private.writeIndex(false, 'iSub', childrenSubs, target, menuId);
                        }

                    } else {
                        e.preventDefault();
                    }
                }

                e.stopPropagation();

            });

        };

        // все меню на странице
        _public.navElements = {};

        // инициализация всех меню на странице
        _public.init = function() {

            for (var i = 0, len = _menu.length-1, id; i <= len; i++) {
                id = _menu[i].getAttribute('id');
                _public.navElements[id] = new _private.Menu(_menu[i], _menu[i].getAttribute('data-type'), _menu[i].getAttribute('data-event'));
                _public.navElements[id].init();
            }

        };

        return _public;
    })();

    app.nav.init();
})();
