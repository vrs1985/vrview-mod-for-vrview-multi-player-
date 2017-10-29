;
'use strict';

(() => {
    var init = this;
    this.playersArray;
    this.playersArray = document.querySelectorAll('.vrBox');
    for (var i = 0; i < this.playersArray.length; i++) {
        new App(this.playersArray[i]);
    }
})();

function App(data) {
    var App = this;
    this.data = data;
    this.model = new AppModel(this.data);
    this.view = new AppView(this.model);
    this.controller = new AppController(this.model, this.view);
};

// start AppModel
function AppModel(data) {
    let AppModel = this;
    this.data = data;
    this.url = this.data.children[0].getAttribute('data-src');
    this.id = this.data.children[0].getAttribute('id');
}
// end AppModel

//  start AppView
function AppView(model) {
    let AppView = this;
    this.model = model;
    // this.vrView;

    this.vrView = new VRView.Player('#' + this.model.id, {
        width: 560,
        height: 480,
        video: 'https://cors-anywhere.herokuapp.com/'.concat(this.model.url),
        is_stereo: false,
        loop: false,
        //hide_fullscreen_button: true,
        //volume: 0.4,
        //muted: true,
        //is_debug: true,
        //default_heading: 90,
        //is_yaw_only: true,
        //is_vr_off: true,
    });

}
// end AppView

// start AppController
function AppController(model, view) {
    let AppController = this;
    this.model = model;
    this.view = view;
    this.playButton = this.model.data.children[1].children[0];
    this.muteButton = this.model.data.children[1].children[1];

    this.playButton.addEventListener('click', onTogglePlay);
    this.muteButton.addEventListener('click', onToggleMute);

    this.view.vrView.on('ready', onVRViewReady);

    function onVRViewReady() {
        // console.log('vrView.isPaused', AppController.view.vrView.isPaused);
        // Set the initial state of the buttons.
        if (AppController.view.vrView.isPaused) {
            AppController.playButton.classList.add('paused');
        } else {
            AppController.playButton.classList.remove('paused');
        }
        AppController.view.vrView.pause();
    }

    // this.view.vrView.on('play', function() {
    //     console.log('media play', this.model.id);
    //     console.log(vrView.getDuration());
    // });
    // this.view.vrView.on('pause', function() {
    //     console.log('media paused');
    // });

    function onTogglePlay() {
        if (AppController.view.vrView.isPaused) {
            AppController.view.vrView.play();
            AppController.playButton.classList.remove('paused');
        } else {
            AppController.view.vrView.pause();
            AppController.playButton.classList.add('paused');
        }
    }

    function onToggleMute() {
        var isMuted = muteButton.classList.contains('muted');
        AppController.view.vrView.mute(!isMuted);
        muteButton.classList.toggle('muted');
    }

}
// end AppController