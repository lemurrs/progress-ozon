
const inputHide = document.querySelector('#InputHide')
const inputValue=document.querySelector('#InputValue')
const inputAnimate = document.querySelector('#InputAnimate')

inputHide.addEventListener('click', makeBlockHidden)
inputAnimate.addEventListener('click',makeBlockAnimated)
inputValue.addEventListener('input',LoadingCircleUpdate)

// Скрывает/показывает блок
function makeBlockHidden(){
    const loadingContainer = document.querySelector('.loadingContainer')
    loadingContainer.classList.toggle('hidden')
}
// Включает/выключает анимацию круга
function makeBlockAnimated() {
    const Circle = document.querySelector('#Circle')
    //При удалении класса, отвечающего за анимацию, она доигрывается до конца.
    if (Circle.classList.contains('Animated')) {
        const onAnimationIteration = () => {
            Circle.classList.remove('Animated');
            Circle.removeEventListener('animationiteration', onAnimationIteration);
        };

        Circle.addEventListener('animationiteration', onAnimationIteration);
    } else {
        Circle.classList.add('Animated');
    }
}


// Обновляет отображение круга в зависимости от введенного значения
function LoadingCircleUpdate(){
    ValidateInput()
    const Circle = document.querySelector('#Circle')
    Circle.style.background=`conic-gradient(#005cff ${inputValue.value*3.6}deg , #dae6ec 0deg)`
}
// Проверяет и корректирует введенное значение
function ValidateInput(){
    if(inputValue.value>100) inputValue.value=100;
    if(inputValue.value<=0) inputValue.value=0
    inputValue.value = inputValue.value.replace(/\D/g, '')
}