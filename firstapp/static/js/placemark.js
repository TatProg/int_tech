ymaps.ready(['AnimatedLine']).then(init);

function init(ymaps) {
    // Создаем карту.
    var myMap = new ymaps.Map("map", {
        center: [55.778332, 49.124938],
        zoom: 14
    }, {
        searchControlProvider: 'yandex#search'
    });
    // Создаем ломаные линии.
    var firstAnimatedLine = new ymaps.AnimatedLine([
        [55.760019, 49.137496],
        [55.760245, 49.138037],
        [55.761297, 49.137113],
        [55.761656, 49.137655],
        [55.762970, 49.136512],
        [55.763924, 49.140897],
        [55.763085, 49.161170],
        [55.763296, 49.164946],
        [55.764648, 49.168095]
    ], {}, {
        // Задаем цвет.
        strokeColor: "#1E98FF",
        // Задаем ширину линии.
        strokeWidth: 5,
        // Задаем длительность анимации.
        animationTime: 4000
    });
    var secondAnimatedLine = new ymaps.AnimatedLine([
        [55.764648, 49.168095],
        [55.776363, 49.143363],
        [55.787110, 49.122050],
        [55.795418, 49.105827]
    ], {}, {
        strokeColor: "#ED4543",
        strokeWidth: 4,
        animationTime: 3500
    });
    var thirdAnimatedLine = new ymaps.AnimatedLine([
        [55.795418, 49.105827],
        [55.796166, 49.103855],
        [55.794265, 49.097869],
        [55.793676, 49.098448]
    ], {}, {
        strokeColor: "#1E98FF",
        strokeWidth: 5,
        animationTime: 4000
    });
    // Добавляем линии на карту.
    myMap.geoObjects.add(firstAnimatedLine);
    myMap.geoObjects.add(secondAnimatedLine);
    myMap.geoObjects.add(thirdAnimatedLine);
    // Создаем метки.
    var firstPoint = new ymaps.Placemark([55.760019, 49.137496], {}, {
        preset: 'islands#blueSportCircleIcon'
    });
    var secondPoint = new ymaps.Placemark([55.764648, 49.168095], {}, {
        preset: 'islands#redRailwayCircleIcon'
    });
    var thirdPoint = new ymaps.Placemark([55.795418, 49.105827], {}, {
        preset: 'islands#redRailwayCircleIcon'
    });
    var fourthPoint = new ymaps.Placemark([55.793676, 49.098448], {}, {
        preset: 'islands#blueHomeCircleIcon'
    });
    // Функция анимации пути.
    function playAnimation() {
        // Убираем вторую линию.
        secondAnimatedLine.reset();
        thirdAnimatedLine.reset();
        // Добавляем первую метку на карту.
        myMap.geoObjects.add(firstPoint);
        // Анимируем первую линию.
        firstAnimatedLine.animate()
            // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
            .then(function() {
                myMap.geoObjects.add(secondPoint);
                return secondAnimatedLine.animate();
            })
            // После окончания анимации второй линии добавляем третью метку на карту.
            .then(function() {
                myMap.geoObjects.add(thirdPoint);
                // Добавляем паузу после анимации.
                return thirdAnimatedLine.animate();
            })
            //new code
            .then(function() {
                myMap.geoObjects.add(fourthPoint);
                return ymaps.vow.delay(null, 4000);
            })
            // После паузы перезапускаем анимацию.
            .then(function() {
                // Удаляем метки и линии с карты.
                myMap.geoObjects.remove(firstPoint);
                myMap.geoObjects.remove(secondPoint);
                myMap.geoObjects.remove(thirdPoint);
                myMap.geoObjects.remove(fourthPoint);

                secondAnimatedLine.reset();
                thirdAnimatedLine.reset();
                // Перезапускаем анимацию.
                playAnimation();
            });

    }
    // Запускаем анимацию пути.
    playAnimation();
}
