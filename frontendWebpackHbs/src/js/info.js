export default () => {

    let toggleButtons = document.getElementsByClassName('info-togglebtn');

    for (let i = 0; i < toggleButtons.length; i++) {
        toggleButtons[i].addEventListener('click', function () {
            console.log("clicked");
            var wrapper = this.parentNode.querySelector('.info-wrapper');
            wrapper.classList.toggle('open');
        });
    }

}






