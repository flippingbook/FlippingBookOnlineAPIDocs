# Документация API

## Написание документации
### Где что лежит
Документацию в формате markdown надо писать в папочку `src/`. Каждый .md файл превращается в страничку документации. Чтобы страничка попала в левое меню, надо менять файл `src/.vuepress/config.js`.

### Как удобно работать
Прежде всего должен быть установлен [nodejs](https://nodejs.org/en/download/current/). После его установки надо открыть командную строку и установить yarn: `npm i -g yarn`.

Теперь всё готово к работе. Чтобы видеть документацию в процессе написания, надо в папке проекта запустить `devserver.bat` или `devserver.sh`, если всё установленно правильно, то появится окошко терминала, которое немножко подумает и скажет:
```
> VuePress dev server listening at http://localhost:8080/
```
Это окошко закрывать не надо, а вместо этого открыть браузер и перейти по указанной ссылке (обычно [http://localhost:8080/](http://localhost:8080/)).

Теперь, по мере сохранения файлов, документ в браузере будет перезагружаться и показывать актуальное состояние. 

## Выкладывание документации
Так же как и для разработки, для выкладывания должен быть установлен nodejs и yarn. Ещё, (один раз), надо настроить git хуки, для этого в папке с проектом надо запусить `setuphooks.bat` или `setuphooks.sh`.

Теперь, когда вы будете делать коммит, хуки автоматически соберут документацию в папке `docs/` и добавят её в коммиту. Дальше - push и всё готово - документация автоматически обновлена на [apidocs.flippingbook.com](http://apidocs.flippingbook.com/) 
