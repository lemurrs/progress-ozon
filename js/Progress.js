// Создаем объект, представляющий интерфейс для управления элементами на странице
const PageController = {

    // Скрывает/показывает блок
    toggleBlock: function (containerQuerySelector) {
        const loadingContainer = document.querySelector(containerQuerySelector);
        loadingContainer.classList.toggle('hidden');
    },

    // Включает/выключает анимацию круга
    toggleAnimation: function (animatedElement, toggleAnimationElement) {
        const Circle = document.querySelector(animatedElement)
        const inputAnimate = document.querySelector(toggleAnimationElement)
        if (Circle.classList.contains('Animated')) {
            this.disableAnimation(Circle, inputAnimate);
        } else {
            this.enableAnimation(Circle);
        }
    },

    // Обновляет отображение круга в зависимости от введенного значения
    prevInputValue: null,
    updateCircle: function (progressElement, inputValueElement) {

        const Circle = document.querySelector(progressElement);
        const inputValue = document.querySelector(inputValueElement);
        this.validateInput(inputValue);

        //Анимирование заполнения
        if (this.prevInputValue !== inputValue.value) {
            this.prevInputValue = inputValue.value

            const startAngle = 0;
            const endAngle = inputValue.value * 3.6; // Максимальный угол градиента

            const animationDuration = 1000; // Продолжительность анимации в миллисекундах
            const frameRate = 60; // Количество кадров в секунду

            const totalFrames = (animationDuration / 1000) * frameRate;
            const angleIncrement = (endAngle - startAngle) / totalFrames;

            let currentAngle = startAngle;
            let frameCount = 0;

            function updateGradient() {
                Circle.style.background = `conic-gradient(#005cff ${currentAngle}deg, #dae6ec 0deg)`;

                currentAngle += angleIncrement;
                frameCount++;

                if (frameCount < totalFrames) {
                    requestAnimationFrame(updateGradient);
                } else {
                    Circle.style.background = `conic-gradient(#005cff ${endAngle}deg, #dae6ec 0deg)`;
                }
            }

            updateGradient()

        }

    },

    // Проверяет и корректирует введенное значение
    validateInput: function (input) {
        if (input.value > 100) input.value = 100;
        if (input.value <= 0) input.value = 0;
        if (input.value.length > 3) input.slice(0, 3);
        input.value = input.value.replace(/^0+|[^0-9]/g, '');
    },

    // Вспомогательная функция для обработки завершения анимации
    onAnimationIteration: function (Circle) {
        Circle.classList.remove('Animated');
        document.querySelector('#InputAnimate').removeAttribute('disabled');
    },

    // Включает кнопку анимации и добавляет обработчик события
    enableAnimation: function (Circle) {
        Circle.classList.add('Animated');
    },

    // Отключает кнопку анимации и добавляет обработчик события
    disableAnimation: function (Circle, inputAnimate) {
        inputAnimate.setAttribute('disabled', 'disabled');
        Circle.addEventListener('animationiteration', () => this.onAnimationIteration(Circle), {once: true});
    }
};

// Назначаем обработчики событий
document.querySelector('#InputHide').addEventListener('click', () => PageController.toggleBlock('.loadingContainer'));
document.querySelector('#InputAnimate').addEventListener('click', () => PageController.toggleAnimation('#Circle', '#InputAnimate'));
document.querySelector('#InputValue').addEventListener('input', () => PageController.updateCircle('#Circle', '#InputValue'));