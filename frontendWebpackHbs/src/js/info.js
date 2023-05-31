export default () => {

    let toggleButtons = document.getElementsByClassName('info-togglebtn');

    for (let i = 0; i < toggleButtons.length; i++) {
        toggleButtons[i].addEventListener('click', function () {
            var wrapper = this.parentNode.querySelector('.info-wrapper');
            wrapper.classList.toggle('open');
            var infoContainer = document.getElementById('info-master-container');
            infoContainer.classList.toggle('overlay');
        });
    }

}






