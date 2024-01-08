const progress = document.querySelector('progress')

// Функция recalculateProgress будет пересчитывать,
// какую часть страницы пользователь уже успел прочесть.
function recalculateProgress() {
    // Высота экрана:
    const viewportHeight = window.innerHeight
    // Высота страницы:
    const pageHeight = document.body.offsetHeight
    // Текущее положение прокрутки:
    const currentPosition = window.scrollY

    // Из высоты страницы вычтем высоту экрана,
    // чтобы при прокручивании до самого низа
    // прогресс-бар заполнялся до конца.
    const availableHeight = pageHeight - viewportHeight

    // Считаем процент «прочитанного» текста:
    const percent = (currentPosition / availableHeight) * 100

    // Проставляем посчитанное значение
    // в качестве значения для value прогресс-бара:
    progress.value = percent
}

const optimizedHandler = throttle(recalculateProgress, 50);

window.addEventListener('scroll', optimizedHandler)
window.addEventListener('resize', optimizedHandler)

// Функция throttle будет принимать 2 аргумента:
// - callee, функция, которую надо вызывать;
// - timeout, интервал в мс, с которым следует пропускать вызовы.
function throttle(callee, timeout) {
    // Таймер будет определять,
    // надо ли нам пропускать текущий вызов.
    let timer = null

    // Как результат возвращаем другую функцию.
    return function perform(...args) {
        // Если таймер есть, то функция уже была вызвана,
        // и значит новый вызов следует пропустить.
        if (timer) return

        // Если таймера нет, значит мы можем вызвать функцию:
        timer = setTimeout(() => {
            // Аргументы передаём неизменными в функцию-аргумент:
            callee(...args)

            // По окончании очищаем таймер:
            clearTimeout(timer)
            timer = null
        }, timeout)
    }

}