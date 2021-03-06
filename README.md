# Описание

Прототипчик приложения чата на TypeScript c использованием библиотеки React, DI контейнера Inversify, и библиотеки RxJS. Без использования Redux и его производных.

# Description

Prototype chat aplication on TypeScript with use React, Inversify, RxJS. Without use Redux.

## Хочу как на Angular подумал я, и появилось это...

Мне хотелось для приложений на React иметь структуру и архитектуру похожую на ту к которой я привык работая с Angular. В октябре 2018 я даже попытался написать простенькую обертку над React которая позволила бы конфигурировать приложение наподобие Angular, то-есть иметь отдельный файл для маршрутов, DI, и сервисы одиночки. В общем то в каком то смысле мне это удалось сделать такой прототип. После чего я благополучно оставил эту идею потому как снова работал с Angular. Но недавно работа вновь меня столкнула с React. И светлая мысль в голове заставила меня погуглить на тему библиотек DI и как оказалось такие существуют, причем в немалом количестве. Одну из них я скидывал в канал #libs. Собственно все это привело меня к мысли попробовать написать прототип приложения с использованием ReactJS + InversifyJS + RxJS, дабы проверить жизнеспособность подхода, и собрать грабли. Поскольку идей что писать в голове особо не было — было принято решение написать очередной чат.

Итак, прототипчик написан. Грабли собраны.

Как оказалось InversifyJS по умолчанию может внедрять зависимости декоратором inject только в те интсансы который он создает сам. Как мы знает комоненты React, создает React. Решения два импортировать сам DI контейнер и воспользоваться методом get(), либо поставить пакет [inversify-inject-decorators](https://www.npmjs.com/package/inversify-inject-decorators) который предоставляет дополнительные декораторы и позволяет внедрять зависимости в произвольные объекты. Долго провозился с глупой ошибкой. Суть в том что зависимости не внедрялись. Как оказалось все просто — описывать типы для InversifyJS следует в отдельном от определения контейнера файле. Дальше все работает без проблем. Дальше грабли с RxJS. Подписываться на Observable лучше в хуке componentWillMount(), а не в конструкторе, иначе если используется BehaviorSubject предыдущие состояние вы не получите. Что бы view обновлялось значение полученные от Observable необходимо класть в state таким образом .subscribe(data => this.setState({data}). Ну и конечно необходимо в хуке componentWillUnmount() отписаться от всех подписок.

Таким образом такой подход ИМХО позволяет в купе с TS создавать более удобный, читаемый и логичный код для ReactJS.
