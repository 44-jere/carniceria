function detectSwipe(callback) {
    let touchstartX = 0;
    let touchendX = 0;

    document.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const threshold = 50; // Minimum distance in pixels to consider it a swipe
        const diffX = touchendX - touchstartX;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                callback('right');
            } else {
                callback('left');
            }
        }
    }
}

// Usage example:
detectSwipe(function(direction) {
    const items = document.querySelectorAll('.item');
    if (direction === 'left') {
        slider.append(items[0])
    } else if (direction === 'right') {
        slider.prepend(items[items.length-1]);
    }
});
