# Mesto Russia

## Описание

Проект представляет собой интерактивную страницу, куда можно добавлять фотографии, удалять их и ставить лайки.

Функциональность проекта:
- возможность редактировать профиль, обновить аватар пользователя
- возможность создать новую карточку - картинку с описанием
- мгновенная валидация форм
- закрытие окон по нажатию на крестик, оверлей или клавишу Escape
- возможность просмотра картинки крупным планом
- постановка/снятие лайка карточке
- удаление карточки (возможно удаление только своих карточек)
- предусмотрена защита карточек от переполнения текстовым содержимым.

Вёрстка адаптивная: ширина зоны с содержимым меняется вместе с шириной окна браузера, при этом не появляется горизонтальная полоса прокрутки.

Минимальная ширина: 320px (одна карточка в ряд). Максимальная: 1280px (три карточки в ряд).

Сайт написан на нативном JavaScript и был создан для закрепления на практике следующих тем:
- базовые возможности JS
- работа с DOM
- работа с асинхронными функциями
- fetch-запросы
- работа с внешними API
- обработка ошибок
- ООП, модули, деструктуризация
- работа с webpack и git

Файловая структура организована по методологии БЭМ.

Ссылка на проект в gh-pages: [mesto-russia](https://andreibelyun.github.io/mesto/)

<img src='./public/mesto.gif' alt='превью проекта' width='800px'/>